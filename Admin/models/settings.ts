import db from '../db';

/**
 * Key-value store for site-wide settings persisted in SQLite.
 *
 * DB values take precedence over environment variables so admins can
 * update SMTP / site config from the dashboard without touching .env.
 */

// ── Lazy prepared statements ─────────────────────────────────────────────────
// Prepared statements are initialized on first use, not on module load.
// This prevents crashes if better-sqlite3 isn't built yet (e.g., cPanel).

let stmtGet: ReturnType<typeof db.prepare> | null = null;
let stmtUpsert: ReturnType<typeof db.prepare> | null = null;
let stmtAll: ReturnType<typeof db.prepare> | null = null;
let stmtReset: ReturnType<typeof db.prepare> | null = null;

function getStmt<T>(name: string, query: string) {
    if (name === 'get' && !stmtGet) {
        stmtGet = db.prepare<{ key: string }>(query);
    } else if (name === 'upsert' && !stmtUpsert) {
        stmtUpsert = db.prepare<{ key: string; value: string }>(query);
    } else if (name === 'all' && !stmtAll) {
        stmtAll = db.prepare(query);
    } else if (name === 'reset' && !stmtReset) {
        stmtReset = db.prepare(query);
    }
    const stmts: Record<string, any> = { get: stmtGet, upsert: stmtUpsert, all: stmtAll, reset: stmtReset };
    return stmts[name];
}

// ── API ───────────────────────────────────────────────────────────────────────

export const SiteSettings = {
    /** Get a single setting value, or '' if unset. */
    get(key: string): string {
        const stmt = getStmt('get', 'SELECT value FROM site_settings WHERE key = @key');
        const row = stmt.get({key}) as { value: string } | undefined;
        return row?.value ?? '';
    },

    /** Get a setting value, falling back to an env var, then a hard default. */
    resolve(key: string, envVar?: string, fallback = ''): string {
        const dbVal = this.get(key);
        if (dbVal) return dbVal;
        if (envVar && process.env[envVar]) return process.env[envVar]!;
        return fallback;
    },

    /** Set a single key. */
    set(key: string, value: string): void {
        const stmt = getStmt('upsert', 'INSERT INTO site_settings (key, value, updated_at) VALUES (@key, @value, datetime(\'now\')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime(\'now\')');
        stmt.run({key, value});
    },

    /** Set multiple keys atomically. */
    setMany(pairs: Record<string, string>): void {
        db.transaction(() => {
            for (const [key, value] of Object.entries(pairs)) {
                this.set(key, value);
            }
        })();
    },

    /** Return all settings as a plain object. */
    all(): Record<string, string> {
        const stmt = getStmt('all', 'SELECT key, value FROM site_settings ORDER BY key');
        const rows = stmt.all() as { key: string; value: string }[];
        return Object.fromEntries(rows.map(r => [r.key, r.value]));
    },

    /** Delete all settings rows (Danger Zone reset). */
    reset(): void {
        const stmt = getStmt('reset', 'DELETE FROM site_settings');
        stmt.run();
    },

    // ── SMTP convenience helpers ─────────────────────────────────────────────

    /** Returns true when enough SMTP config exists to send mail (DB or env). */
    smtpReady(): boolean {
        const host = this.resolve('smtp.host', 'SMTP_HOST');
        const user = this.resolve('smtp.user', 'SMTP_USER');
        const pass = this.resolve('smtp.pass', 'SMTP_PASS');
        const from = this.resolve('smtp.from', 'SMTP_FROM');
        return Boolean(host && user && pass && from);
    },

    /** Resolved SMTP config merging DB overrides with env fallbacks. */
    smtpConfig(): { host: string; port: number; user: string; pass: string; from: string; contactTo: string } {
        return {
            host: this.resolve('smtp.host', 'SMTP_HOST'),
            port: Number(this.resolve('smtp.port', 'SMTP_PORT', '587')),
            user: this.resolve('smtp.user', 'SMTP_USER'),
            pass: this.resolve('smtp.pass', 'SMTP_PASS'),
            from: this.resolve('smtp.from', 'SMTP_FROM'),
            contactTo: this.resolve('smtp.contact_to', 'CONTACT_TO'),
        };
    },
};