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

    findByEmail(email: string): User | null {
        const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
        return row ?? null;
    },

    async create(data: {
        name: string;
        email: string;
        password: string;
        role?: string;
        phone?: string;
        avatar?: string;
    }): Promise<SafeUser> {
        const hash = await bcrypt.hash(data.password, 12);
        const info = db
            .prepare(
                `INSERT INTO users (name, email, password_hash, role, phone, avatar)
                 VALUES (@name, @email, @password_hash, @role, @phone, @avatar)`
            )
            .run({
                name: data.name,
                email: data.email.toLowerCase(),
                password_hash: hash,
                role: data.role || 'staff',
                phone: data.phone || null,
                avatar: data.avatar || null,
            });
        return this.find(Number(info.lastInsertRowid))!;
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

    async verify(email: string, password: string): Promise<User | null> {
        const user = this.findByEmail(email.toLowerCase());
        if (!user || user.status !== 'active') return null;
        const ok = await bcrypt.compare(password, user.password_hash);
        return ok ? user : null;
    },

    count(): number {
        return (db.prepare('SELECT COUNT(*) AS c FROM users').get() as { c: number }).c;
    },
};
