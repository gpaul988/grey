import crypto from 'crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers } from '../Admin/models';
import type { SafeCustomer } from '../Admin/models/store';

// ── Self-healing secret (same pattern as Admin/middleware/security.ts) ────────
// Never throws in production. If no env var is set, generates a strong 256-bit
// secret once and persists it to Admin/data/.secrets.json so it survives
// restarts. This prevents the Passenger worker from dying on boot when
// CUSTOMER_SESSION_SECRET / SESSION_SECRET aren't yet configured.
const SECRETS_FILE = path.join(process.cwd(), 'Admin', 'data', '.secrets.json');

function loadPersistedSecrets(): Record<string, string> {
    try {
        return JSON.parse(fs.readFileSync(SECRETS_FILE, 'utf8')) as Record<string, string>;
    } catch {
        return {};
    }
}

function savePersistedSecret(name: string, value: string): void {
    try {
        fs.mkdirSync(path.dirname(SECRETS_FILE), { recursive: true });
        const current = loadPersistedSecrets();
        current[name] = value;
        fs.writeFileSync(SECRETS_FILE, JSON.stringify(current, null, 2), { mode: 0o600 });
    } catch {
        // Read-only FS — keep the in-memory value for this process lifetime.
    }
}

const _mem: Record<string, string> = {};

function resolveSecret(): string {
    const NAME = 'CUSTOMER_SESSION_SECRET';

    // 1. Explicit env var wins.
    const fromEnv = process.env.CUSTOMER_SESSION_SECRET || process.env.SESSION_SECRET;
    if (fromEnv && fromEnv.length >= 16) return fromEnv;

    // 2. Reuse in-process cached value.
    if (_mem[NAME]) return _mem[NAME];

    // 3. Reuse previously-persisted auto-secret (stable across restarts).
    const persisted = loadPersistedSecrets()[NAME];
    if (persisted && persisted.length >= 16) {
        _mem[NAME] = persisted;
        return persisted;
    }

    // 4. Generate, persist, and use a fresh strong secret.
    const generated = crypto.randomBytes(32).toString('hex');
    _mem[NAME] = generated;
    savePersistedSecret(NAME, generated);
    return generated;
}

const SECRET = resolveSecret();
const COOKIE = 'grey_customer';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sign(payload: string): string {
    return crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
}

export function createToken(customerId: number): string {
    const body = `${customerId}.${Date.now()}`;
    const b64 = Buffer.from(body).toString('base64url');
    return `${b64}.${sign(b64)}`;
}

export function verifyToken(token: string): number | null {
    const [b64, sig] = token.split('.');
    if (!b64 || !sig) return null;
    if (sign(b64) !== sig) return null;
    try {
        const body = Buffer.from(b64, 'base64url').toString('utf8');
        const [idStr, tsStr] = body.split('.');
        const id = parseInt(idStr, 10);
        const ts = parseInt(tsStr, 10);
        if (!id || !ts) return null;
        if (Date.now() - ts > MAX_AGE * 1000) return null;
        return id;
    } catch {
        return null;
    }
}

function parseCookies(req: NextApiRequest): Record<string, string> {
    const header = req.headers.cookie || '';
    const out: Record<string, string> = {};
    header.split(';').forEach((part) => {
        const idx = part.indexOf('=');
        if (idx > -1) out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
    });
    return out;
}

export function setCustomerCookie(res: NextApiResponse, customerId: number): void {
    const token = createToken(customerId);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`);
}

export function clearCustomerCookie(res: NextApiResponse): void {
    res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

/** Returns the authenticated customer or null. */
export function getCustomer(req: NextApiRequest): SafeCustomer | null {
    const cookies = parseCookies(req);
    const token = cookies[COOKIE];
    if (!token) return null;
    const id = verifyToken(token);
    if (!id) return null;
    const c = Customers.find(id);
    if (!c || c.status !== 'active') return null;
    return c;
}

/** Helper: require auth, sending 401 if missing. Returns customer or null (response already sent). */
export function requireCustomer(req: NextApiRequest, res: NextApiResponse): SafeCustomer | null {
    const c = getCustomer(req);
    if (!c) {
        res.status(401).json({ error: 'Not authenticated' });
        return null;
    }
    return c;
}
