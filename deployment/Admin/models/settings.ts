/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../db';

/**
 * Key-value store for site-wide settings persisted in SQLite.
 *
 * DB values take precedence over environment variables so admins can
 * update SMTP / site config from the dashboard without touching .env.
 */

// â”€â”€ Lazy prepared statements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Prepared statements are initialized on first use, not on module load.
// This prevents crashes if better-sqlite3 isn't built yet (e.g., cPanel).

let stmtGet: ReturnType<typeof db.prepare> | null = null;
let stmtUpsert: ReturnType<typeof db.prepare> | null = null;
let stmtAll: ReturnType<typeof db.prepare> | null = null;
let stmtReset: ReturnType<typeof db.prepare> | null = null;

function getStmt(name: string, query: string) {
    if (name === 'get' && !stmtGet) {
        stmtGet = (db.prepare as any)(query);
    } else if (name === 'upsert' && !stmtUpsert) {
        stmtUpsert = (db.prepare as any)(query);
    } else if (name === 'all' && !stmtAll) {
        stmtAll = (db.prepare as any)(query);
    } else if (name === 'reset' && !stmtReset) {
        stmtReset = (db.prepare as any)(query);
    }
     
    const stmts: Record<string, any> = { get: stmtGet, upsert: stmtUpsert, all: stmtAll, reset: stmtReset };
    return stmts[name];
}

// â”€â”€ API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const SiteSettings = {
    /** Get a single setting value, or '' if unset. */
    async get(key: string): Promise<string> {
        const stmt = getStmt('get', 'SELECT value FROM site_settings WHERE key = @key');
        const row = await (stmt.get as any)({key}) as { value: string } | undefined;
        return row?.value ?? '';
    },

    /** Get a setting value, falling back to an env var, then a hard default. */
    async resolve(key: string, envVar?: string, fallback = ''): Promise<string> {
        const dbVal = await this.get(key);
        if (dbVal) return dbVal;
        if (envVar && process.env[envVar]) return process.env[envVar]!;
        return fallback;
    },

    /** Set a single key. */
    async set(key: string, value: string): Promise<void> {
        const isMy = (process.env.DB_TYPE || '').toLowerCase() === 'mysql';
        const sql = isMy
            ? 'INSERT INTO site_settings (`key`, `value`, `updated_at`) VALUES (@key, @value, NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updated_at = NOW()'
            : "INSERT INTO site_settings (key, value, updated_at) VALUES (@key, @value, NOW()) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = NOW()";
        const stmt = getStmt('upsert', sql);
        await (stmt.run as any)({key, value});
    },

    /** Set multiple keys atomically. */
    async setMany(pairs: Record<string, string>): Promise<void> {
        const isMy = (process.env.DB_TYPE || '').toLowerCase() === 'mysql';
        if (isMy) {
            // Use MySQL transaction helper which provides a connection proxy
            await db.transaction(async (conn: any) => {
                for (const [key, value] of Object.entries(pairs)) {
                    const s = 'INSERT INTO site_settings (`key`,`value`,`updated_at`) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updated_at = NOW()';
                    await conn.execute(s, [key, value]);
                }
            });
        } else {
            // SQLite synchronous transaction wrapper
            const tx = db.transaction(() => {
                for (const [key, value] of Object.entries(pairs)) {
                    void this.set(key, value);
                }
            }) as () => void;
            tx();
        }
    },

    /** Return all settings as a plain object. */
    async all(): Promise<Record<string, string>> {
        const stmt = getStmt('all', 'SELECT key, value FROM site_settings ORDER BY key');
        const rows = await (stmt.all as any)() as { key: string; value: string }[];
        return Object.fromEntries(rows.map(r => [r.key, r.value]));
    },

    /** Delete all settings rows (Danger Zone reset). */
    async reset(): Promise<void> {
        const stmt = getStmt('reset', 'DELETE FROM site_settings');
        await (stmt.run as any)();
    },

    // â”€â”€ SMTP convenience helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    /** Returns true when enough SMTP config exists to send mail (DB or env). */
    async smtpReady(): Promise<boolean> {
        const host = await this.resolve('smtp.host', 'SMTP_HOST');
        const user = await this.resolve('smtp.user', 'SMTP_USER');
        const pass = await this.resolve('smtp.pass', 'SMTP_PASS');
        const from = await this.resolve('smtp.from', 'SMTP_FROM');
        return Boolean(host && user && pass && from);
    },

    /** Resolved SMTP config merging DB overrides with env fallbacks. */
    async smtpConfig(): Promise<{ host: string; port: number; user: string; pass: string; from: string; contactTo: string }> {
        return {
            host: await this.resolve('smtp.host', 'SMTP_HOST'),
            port: Number(await this.resolve('smtp.port', 'SMTP_PORT', '587')),
            user: await this.resolve('smtp.user', 'SMTP_USER'),
            pass: await this.resolve('smtp.pass', 'SMTP_PASS'),
            from: await this.resolve('smtp.from', 'SMTP_FROM'),
            contactTo: await this.resolve('smtp.contact_to', 'CONTACT_TO'),
        };
    },
};