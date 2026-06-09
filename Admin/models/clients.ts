import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import db from '../db';
import type { Client, SafeClient } from '../db/types';

const stripPassword = (c: Client): SafeClient => {
    const { password_hash, ...safe } = c;
    return safe;
};

/** Token validity window for magic-link logins. */
const TOKEN_TTL_MINUTES = 30;

export const ClientsModel = {
    all(): SafeClient[] {
        const rows = db.prepare('SELECT * FROM clients ORDER BY created_at DESC').all() as Client[];
        return rows.map(stripPassword);
    },

    find(id: number): SafeClient | null {
        const row = db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as Client | undefined;
        return row ? stripPassword(row) : null;
    },

    /** Raw record incl. password_hash — for auth flows only. */
    findRaw(id: number): Client | null {
        return (db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as Client | undefined) ?? null;
    },

    findByEmail(email: string): Client | null {
        const row = db.prepare('SELECT * FROM clients WHERE email = ?').get(email.toLowerCase()) as Client | undefined;
        return row ?? null;
    },

    count(whereClause?: string, ...params: unknown[]): number {
        const sql = `SELECT COUNT(*) AS c FROM clients${whereClause ? ` WHERE ${whereClause}` : ''}`;
        return (db.prepare(sql).get(...params) as { c: number }).c;
    },

    async create(data: {
        name: string;
        email: string;
        company?: string;
        phone?: string;
        avatar?: string;
        password?: string;
        status?: string;
        email_verified?: boolean;
    }): Promise<SafeClient> {
        const hash = data.password ? await bcrypt.hash(data.password, 12) : null;
        const verified = data.email_verified ? 1 : 0;
        const info = db
            .prepare(
                `INSERT INTO clients (name, email, company, phone, avatar, password_hash, status, email_verified, verified_at)
                 VALUES (@name, @email, @company, @phone, @avatar, @password_hash, @status, @email_verified, @verified_at)`
            )
            .run({
                name: data.name,
                email: data.email.toLowerCase(),
                company: data.company || null,
                phone: data.phone || null,
                avatar: data.avatar || null,
                password_hash: hash,
                status: data.status || 'active',
                email_verified: verified,
                verified_at: verified ? new Date().toISOString() : null,
            });
        return this.find(Number(info.lastInsertRowid))!;
    },

    markVerified(id: number): SafeClient | null {
        db.prepare(
            "UPDATE clients SET email_verified=1, verified_at=datetime('now'), status='active' WHERE id=?"
        ).run(id);
        return this.find(id);
    },

    async setPassword(id: number, password: string): Promise<SafeClient | null> {
        const hash = await bcrypt.hash(password, 12);
        db.prepare(
            "UPDATE clients SET password_hash=@hash, email_verified=1, verified_at=datetime('now'), status='active' WHERE id=@id"
        ).run({ id, hash });
        return this.find(id);
    },

    /**
     * Payment gate: a client is "payment-verified" once they have at least one
     * invoice marked paid. This unlocks adding staff to conversations.
     */
    hasPaid(clientId: number): boolean {
        const row = db
            .prepare("SELECT COUNT(*) AS c FROM invoices WHERE client_id = ? AND status = 'paid'")
            .get(clientId) as { c: number };
        return row.c > 0;
    },

    async update(
        id: number,
        data: {
            name?: string;
            email?: string;
            company?: string;
            phone?: string;
            avatar?: string;
            status?: string;
            password?: string;
        }
    ): Promise<SafeClient | null> {
        const current = db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as Client | undefined;
        if (!current) return null;
        const password_hash = data.password ? await bcrypt.hash(data.password, 12) : current.password_hash;
        db.prepare(
            `UPDATE clients SET name=@name, email=@email, company=@company, phone=@phone,
             avatar=@avatar, status=@status, password_hash=@password_hash WHERE id=@id`
        ).run({
            id,
            name: data.name ?? current.name,
            email: (data.email ?? current.email).toLowerCase(),
            company: data.company ?? current.company,
            phone: data.phone ?? current.phone,
            avatar: data.avatar ?? current.avatar,
            status: data.status ?? current.status,
            password_hash,
        });
        return this.find(id);
    },

    delete(id: number): void {
        db.prepare('DELETE FROM clients WHERE id = ?').run(id);
    },

    touchLogin(id: number): void {
        db.prepare("UPDATE clients SET last_login = datetime('now') WHERE id = ?").run(id);
    },

    /** Password login (optional path; magic-link is primary). */
    async verifyPassword(email: string, password: string): Promise<Client | null> {
        const client = this.findByEmail(email);
        if (!client || client.status !== 'active' || !client.password_hash) return null;
        const ok = await bcrypt.compare(password, client.password_hash);
        return ok ? client : null;
    },

    /* ---------- Magic-link login tokens ---------- */

    /** Generate a single-use login token; returns the raw token to embed in the link. */
    createLoginToken(clientId: number, purpose: 'login' | 'invite' = 'login'): string {
        const token = randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000).toISOString();
        db.prepare(
            `INSERT INTO client_tokens (client_id, token, purpose, expires_at)
             VALUES (@client_id, @token, @purpose, @expires_at)`
        ).run({ client_id: clientId, token, purpose, expires_at: expires });
        return token;
    },

    /**
     * Validate a magic-link token. If valid & unused & unexpired, mark it used
     * and return the client (raw). Otherwise null.
     */
    verifyToken(token: string): Client | null {
        const row = db
            .prepare(
                `SELECT * FROM client_tokens
                 WHERE token = ? AND used_at IS NULL AND expires_at > datetime('now')`
            )
            .get(token) as { id: number; client_id: number } | undefined;
        if (!row) return null;
        db.prepare("UPDATE client_tokens SET used_at = datetime('now') WHERE id = ?").run(row.id);
        const client = this.findRaw(row.client_id);
        if (client) this.touchLogin(client.id);
        return client;
    },
};
