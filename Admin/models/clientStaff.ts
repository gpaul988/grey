import bcrypt from 'bcryptjs';
import db from '../db';
import type { ClientStaff, SafeClientStaff } from '../db/types';

const strip = (s: ClientStaff): SafeClientStaff => {
    const { password_hash, ...safe } = s;
    return safe;
};

/** Max staff sub-accounts a single client may add. */
export const MAX_STAFF_PER_CLIENT = 3;

export const ClientStaffModel = {
    forClient(clientId: number): SafeClientStaff[] {
        const rows = db
            .prepare('SELECT * FROM client_staff WHERE client_id = ? ORDER BY created_at ASC')
            .all(clientId) as ClientStaff[];
        return rows.map(strip);
    },

    count(clientId: number): number {
        return (db.prepare('SELECT COUNT(*) AS c FROM client_staff WHERE client_id = ?').get(clientId) as { c: number }).c;
    },

    find(id: number): SafeClientStaff | null {
        const row = db.prepare('SELECT * FROM client_staff WHERE id = ?').get(id) as ClientStaff | undefined;
        return row ? strip(row) : null;
    },

    findRaw(id: number): ClientStaff | null {
        return (db.prepare('SELECT * FROM client_staff WHERE id = ?').get(id) as ClientStaff | undefined) ?? null;
    },

    findByEmail(clientId: number, email: string): ClientStaff | null {
        return (
            (db
                .prepare('SELECT * FROM client_staff WHERE client_id = ? AND email = ?')
                .get(clientId, email.toLowerCase()) as ClientStaff | undefined) ?? null
        );
    },

    /** Create a staff sub-account (invited; password set later via link). */
    create(data: { client_id: number; name: string; email: string; role_title?: string }): SafeClientStaff {
        const info = db
            .prepare(
                `INSERT INTO client_staff (client_id, name, email, role_title, status, email_verified)
                 VALUES (@client_id, @name, @email, @role_title, 'invited', 0)`
            )
            .run({
                client_id: data.client_id,
                name: data.name,
                email: data.email.toLowerCase(),
                role_title: data.role_title || null,
            });
        return this.find(Number(info.lastInsertRowid))!;
    },

    update(id: number, data: { name?: string; role_title?: string; avatar?: string; status?: string }): SafeClientStaff | null {
        const cur = this.findRaw(id);
        if (!cur) return null;
        db.prepare(
            `UPDATE client_staff SET name=@name, role_title=@role_title, avatar=@avatar, status=@status WHERE id=@id`
        ).run({
            id,
            name: data.name ?? cur.name,
            role_title: data.role_title ?? cur.role_title,
            avatar: data.avatar ?? cur.avatar,
            status: data.status ?? cur.status,
        });
        return this.find(id);
    },

    delete(id: number): void {
        db.prepare('DELETE FROM client_staff WHERE id = ?').run(id);
    },

    markVerified(id: number): void {
        db.prepare("UPDATE client_staff SET email_verified=1, status='active' WHERE id=?").run(id);
    },

    async setPassword(id: number, password: string): Promise<SafeClientStaff | null> {
        const hash = await bcrypt.hash(password, 12);
        db.prepare(
            "UPDATE client_staff SET password_hash=@hash, email_verified=1, status='active' WHERE id=@id"
        ).run({ id, hash });
        return this.find(id);
    },

    touchLogin(id: number): void {
        db.prepare("UPDATE client_staff SET last_login = datetime('now') WHERE id = ?").run(id);
    },

    async verifyPassword(email: string, password: string): Promise<ClientStaff | null> {
        const row = db.prepare('SELECT * FROM client_staff WHERE email = ?').get(email.toLowerCase()) as ClientStaff | undefined;
        if (!row || row.status !== 'active' || !row.password_hash) return null;
        const ok = await bcrypt.compare(password, row.password_hash);
        return ok ? row : null;
    },
};
