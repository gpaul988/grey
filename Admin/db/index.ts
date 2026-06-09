import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const DATA_DIR = path.join(process.cwd(), 'Admin', 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'grey.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Run schema migrations synchronously on boot (idempotent), so new tables/
// columns exist before any model query. We pass `db` explicitly into migrate()
// to avoid the circular-import race (schema.ts would otherwise re-require this
// module before its default export is assigned).
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { migrate } = require('./schema') as typeof import('./schema');
    migrate(db);
} catch (err) {
    console.error('DB migrate failed:', err);
}

export default db;
export { DB_PATH, DATA_DIR };
