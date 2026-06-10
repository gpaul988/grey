import bcrypt from 'bcryptjs';
import db from '../db';
import type { User, SafeUser } from '../db/types';

const stripPassword = (u: User): SafeUser => {
    const { password_hash, ...safe } = u;
    return safe;
};

export const UsersModel = {
    all(): SafeUser[] {
        const rows = db.prepare('SELECT * FROM users ORDER BY created_at DESC').all() as User[];
        return rows.map(stripPassword);
    },

    find(id: number): SafeUser | null {
        const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
        return row ? stripPassword(row) : null;
    },

    /** Raw record incl. password_hash — for auth flows only. */
    findRaw(id: number): User | null {
        return (db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined) ?? null;
    },

    findByEmail(email: string): User | null {
        const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as User | undefined;
        return row ?? null;
    },

    async create(data: {
        name: string;
        email: string;
        password?: string;       // optional: invited users set it later via link
        role?: string;
        phone?: string;
        avatar?: string;
        status?: string;
        email_verified?: boolean;
    }): Promise<SafeUser> {
        // A null hash means "must set password via verification link".
        const hash = data.password ? await bcrypt.hash(data.password, 12) : null;
        const verified = data.email_verified ? 1 : 0;
        const info = db
            .prepare(
                `INSERT INTO users (name, email, password_hash, role, phone, avatar, status, email_verified, verified_at)
                 VALUES (@name, @email, @password_hash, @role, @phone, @avatar, @status, @email_verified, @verified_at)`
            )
            .run({
                name: data.name,
                email: data.email.toLowerCase(),
                password_hash: hash,
                role: data.role || 'staff',
                phone: data.phone || null,
                avatar: data.avatar || null,
                status: data.status || (data.password ? 'active' : 'pending'),
                email_verified: verified,
                verified_at: verified ? new Date().toISOString() : null,
            });
        return this.find(Number(info.lastInsertRowid))!;
    },

    /** Mark a user's email as verified and activate the account. */
    markVerified(id: number): SafeUser | null {
        db.prepare(
            "UPDATE users SET email_verified=1, verified_at=datetime('now'), status='active', updated_at=datetime('now') WHERE id=@id"
        ).run({ id });
        return this.find(id);
    },

    /** Set/replace a password (used by the set-password verification flow). */
    async setPassword(id: number, password: string): Promise<SafeUser | null> {
        const hash = await bcrypt.hash(password, 12);
        db.prepare(
            "UPDATE users SET password_hash=@hash, email_verified=1, verified_at=datetime('now'), status='active', updated_at=datetime('now') WHERE id=@id"
        ).run({ id, hash });
        return this.find(id);
    },

    async update(
        id: number,
        data: { name?: string; email?: string; role?: string; phone?: string; status?: string; password?: string; avatar?: string }
    ): Promise<SafeUser | null> {
        const current = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
        if (!current) return null;
        const password_hash = data.password ? await bcrypt.hash(data.password, 12) : current.password_hash;
        db.prepare(
            `UPDATE users SET name=@name, email=@email, role=@role, phone=@phone, status=@status,
             avatar=@avatar, password_hash=@password_hash, updated_at=datetime('now') WHERE id=@id`
        ).run({
            id,
            name: data.name ?? current.name,
            email: (data.email ?? current.email).toLowerCase(),
            role: data.role ?? current.role,
            phone: data.phone ?? current.phone,
            status: data.status ?? current.status,
            avatar: data.avatar ?? current.avatar,
            password_hash,
        });
        return this.find(id);
    },

    delete(id: number): void {
        db.prepare('DELETE FROM users WHERE id = ?').run(id);
    },

    /** Save a user's per-feature permission overrides (JSON map or null to clear). */
    setPermissions(id: number, overrides: Record<string, boolean> | null): SafeUser | null {
        const json = overrides && Object.keys(overrides).length ? JSON.stringify(overrides) : null;
        db.prepare("UPDATE users SET permissions=@permissions, updated_at=datetime('now') WHERE id=@id").run({ id, permissions: json });
        return this.find(id);
    },

    /** Raw permissions JSON string for a user. */
    getPermissions(id: number): string | null {
        const row = db.prepare('SELECT permissions FROM users WHERE id = ?').get(id) as { permissions: string | null } | undefined;
        return row?.permissions ?? null;
    },

    async verify(email: string, password: string): Promise<User | null> {
        const user = this.findByEmail(email.toLowerCase());
        if (!user || user.status !== 'active' || !user.password_hash) return null;
        if (!user.email_verified) return null;
        const ok = await bcrypt.compare(password, user.password_hash);
        return ok ? user : null;
    },

    /**
     * Validate ONLY the password against the stored hash, ignoring
     * verification/active status. Lets the login route tell "wrong password"
     * apart from "correct password but account not activated yet".
     */
    async checkPassword(email: string, password: string): Promise<User | null> {
        const user = this.findByEmail(email.toLowerCase());
        if (!user || !user.password_hash) return null;
        const ok = await bcrypt.compare(password, user.password_hash);
        return ok ? user : null;
    },

    count(): number {
        return (db.prepare('SELECT COUNT(*) AS c FROM users').get() as { c: number }).c;
    },
};
