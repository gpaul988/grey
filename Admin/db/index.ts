import path from 'node:path';
import fs from 'node:fs';

 

export const DATA_DIR = path.join(process.cwd(), 'Admin', 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'grey.db');

// Admin and Store now share the same database (MySQL or SQLite based on DB_TYPE env var)
const DB_TYPE = (process.env.DB_TYPE || 'mysql').toLowerCase();

// Internal getter for sqlite DB (lazy)
let sqliteDb: any = null;
function _initSqlite() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require('better-sqlite3');
    sqliteDb = new Database(DB_PATH);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { migrate } = require('./schema');
    migrate(sqliteDb);
    console.log('[Admin DB] Connected and migrated (SQLite)');
}

function _getSqliteDb() {
    if (!sqliteDb) {
        try {
            _initSqlite();
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
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
    return sqliteDb;
}

interface PreparedStatement {
    get: (...args: unknown[]) => unknown;
    all: (...args: unknown[]) => unknown[];
    run: (...args: unknown[]) => { lastInsertRowid: number; changes: number };
}

interface DbLike {
    DB_PATH: string;
    DATA_DIR: string;
    getDb?: () => DbLike;
    prepare: (sql: string) => PreparedStatement;
    exec: (sql: string) => unknown;
    transaction: (fn: (...args: unknown[]) => unknown) => unknown;
    pragma: (sql: string) => unknown;
    close: () => void;
    [key: string]: unknown;
}

let exported: DbLike;

if (DB_TYPE === 'mysql') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mysql = require('./mysql') as DbLike;
    exported = Object.assign({}, mysql, { DB_PATH, DATA_DIR });
} else {
    const proxy = new Proxy({} as DbLike, {
        get(_t, prop) {
            return Reflect.get(_getSqliteDb(), prop as string | symbol);
        },
        set(_t, prop, value) {
            return Reflect.set(_getSqliteDb(), prop as string | symbol, value);
        },
    });
    exported = Object.assign(proxy, { DB_PATH, DATA_DIR, getDb: () => _getSqliteDb() as unknown as DbLike });
}

export function getDb(): DbLike {
    if (DB_TYPE === 'mysql') {
        throw new Error('getDb() is not available for MySQL variant');
    }
    return _getSqliteDb() as unknown as DbLike;
}

export default exported;
