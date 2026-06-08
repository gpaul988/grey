import db from '../db';

/**
 * Lightweight generic table repository for straightforward CRUD entities.
 * Uses parameterized statements (safe from SQL injection).
 */
export function createRepo<T extends { id: number }>(table: string, columns: string[]) {
    const cols = columns.join(', ');

    return {
        all(orderBy = 'created_at DESC'): T[] {
            return db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy}`).all() as T[];
        },

        paginate(page = 1, perPage = 20, orderBy = 'created_at DESC'): { rows: T[]; total: number; page: number; perPage: number; pages: number } {
            const total = (db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get() as { c: number }).c;
            const offset = (page - 1) * perPage;
            const rows = db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy} LIMIT ? OFFSET ?`).all(perPage, offset) as T[];
            return { rows, total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) };
        },

        find(id: number): T | null {
            return (db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id) as T) ?? null;
        },

        where(field: string, value: unknown): T[] {
            return db.prepare(`SELECT * FROM ${table} WHERE ${field} = ? ORDER BY created_at DESC`).all(value) as T[];
        },

        findBy(field: string, value: unknown): T | null {
            return (db.prepare(`SELECT * FROM ${table} WHERE ${field} = ?`).get(value) as T) ?? null;
        },

        create(data: Record<string, unknown>): T {
            const keys = columns.filter((c) => c in data);
            const placeholders = keys.map((k) => `@${k}`).join(', ');
            const info = db
                .prepare(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`)
                .run(data as Record<string, unknown> as never);
            return this.find(Number(info.lastInsertRowid))!;
        },

        update(id: number, data: Record<string, unknown>): T | null {
            const current = this.find(id);
            if (!current) return null;
            const keys = columns.filter((c) => c in data);
            if (keys.length === 0) return current;
            const setClause = keys.map((k) => `${k}=@${k}`).join(', ');
            const hasUpdatedAt = columns.includes('updated_at');
            db.prepare(
                `UPDATE ${table} SET ${setClause}${hasUpdatedAt ? ", updated_at=datetime('now')" : ''} WHERE id=@id`
            ).run({ ...data, id } as Record<string, unknown> as never);
            return this.find(id);
        },

        delete(id: number): void {
            db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
        },

        count(whereClause?: string, ...params: unknown[]): number {
            const sql = `SELECT COUNT(*) AS c FROM ${table}${whereClause ? ` WHERE ${whereClause}` : ''}`;
            return (db.prepare(sql).get(...params) as { c: number }).c;
        },

        sum(column: string, whereClause?: string, ...params: unknown[]): number {
            const sql = `SELECT COALESCE(SUM(${column}),0) AS s FROM ${table}${whereClause ? ` WHERE ${whereClause}` : ''}`;
            return (db.prepare(sql).get(...params) as { s: number }).s;
        },

        raw: db,
        table,
    };
}
