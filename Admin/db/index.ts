import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const DATA_DIR = path.join(process.cwd(), 'Admin', 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'grey.db');

// Lazy-load database: don't create it until first use.
// This prevents startup crash if better-sqlite3 native module isn't built yet (e.g., cPanel).
let db: Database.Database | null = null;

function getDb(): Database.Database {
    if (!db) {
        try {
            db = new Database(DB_PATH);
            db.pragma('journal_mode = WAL');
            db.pragma('foreign_keys = ON');
            
            // Run schema migrations on first connection
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { migrate } = require('./schema') as typeof import('./schema');
            migrate(db);
            
            console.log('[DB] Connected and migrated');
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            // The classic native-binding mismatch: node_modules built under a
            // different Node version than the one currently running. Print a
            // short, actionable hint instead of a multi-page stack trace.
            if (/bindings file|was compiled against a different Node|NODE_MODULE_VERSION/i.test(msg)) {
                console.error(
                    '[DB] better-sqlite3 native binding could not load for ' +
                        `Node ${process.version} (ABI ${process.versions.modules}). ` +
                        'This means node_modules was installed under a different Node version. ' +
                        'Fix: ensure Node 20.x (`node -v`), then `npm run clean && npm install` ' +
                        '(or `npm run rebuild:sqlite`).'
                );
            } else {
                console.error('[DB] Failed to initialize:', err);
            }
            throw err;
        }
    }
    return db;
}

export default new Proxy({} as Database.Database, {
    get(target, prop) {
        return Reflect.get(getDb(), prop as string | symbol);
    },
    set(target, prop, value) {
        return Reflect.set(getDb(), prop as string | symbol, value);
    },
});

export { DB_PATH, DATA_DIR, getDb };
