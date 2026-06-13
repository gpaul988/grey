import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers } from '../Admin/models';
import type { SafeCustomer } from '../Admin/models/store';

/**
 * Resolve the signing secret. In production we refuse to fall back to a
 * hardcoded value (audit C2) — a missing secret throws at boot instead of
 * silently shipping a publicly-known key.
 */
function resolveSecret(): string {
    const s = process.env.CUSTOMER_SESSION_SECRET || process.env.SESSION_SECRET;
    if (s && s.length >= 16) return s;
    if (process.env.NODE_ENV === 'production') {
        throw new Error('[security] CUSTOMER_SESSION_SECRET/SESSION_SECRET missing in production.');
    }
    return 'grey-store-dev-secret-change-me';
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
