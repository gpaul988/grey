import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { Pool } from 'pg';
import Database from 'better-sqlite3';
import * as schema from './db/schema';

let pgPool: Pool | null = null;
let sqliteDb: Database.Database | null = null;
let dbInstance: any = null;

/**
 * Check if using SQLite (DATABASE_URL starts with 'file:')
 */
function isSQLite(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.startsWith('file:');
}

/**
 * Get or create PostgreSQL connection pool
 */
function getPgPool(): Pool {
  if (pgPool) return pgPool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL not configured for PostgreSQL');
  }

  pgPool = new Pool({
    connectionString,
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: false,
    statement_timeout: 30000,
  });

  pgPool.on('error', (err) => {
    console.error('Unexpected PostgreSQL error', err);
  });

  return pgPool;
}

/**
 * Get or create SQLite connection
 */
function getSqliteDb(): Database.Database {
  if (sqliteDb) return sqliteDb;

  const dbPath = (process.env.DATABASE_URL || 'file:./Admin/data/grey.db')
    .replace('file:', '')
    .replace('?', '');

  sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.pragma('foreign_keys = ON');

  return sqliteDb;
}

/**
 * Get Drizzle ORM instance
 */
function getDb() {
  if (!dbInstance) {
    if (isSQLite()) {
      const db = getSqliteDb();
      dbInstance = drizzleSqlite(db, { schema });
    } else {
      const pool = getPgPool();
      dbInstance = drizzlePg({ client: pool, schema });
    }
  }
  return dbInstance;
}

/**
 * Drizzle ORM instance (lazy-loaded)
 */
export const db = getDb();

/**
 * Execute raw SQL query
 */
export async function query(sql: string, params?: any[]) {
  if (isSQLite()) {
    const db = getSqliteDb();
    const stmt = db.prepare(sql);
    return stmt.all(params);
  } else {
    const pool = getPgPool();
    const result = await pool.query(sql, params);
    return result.rows;
  }
}

/**
 * Get a single client connection (for transactions) - PostgreSQL only
 */
export async function getClient() {
  if (isSQLite()) {
    throw new Error('getClient() not supported for SQLite');
  }
  const pool = getPgPool();
  return pool.connect();
}

/**
 * Close pool (cleanup on shutdown)
 */
export async function closePool(): Promise<void> {
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
  }
  dbInstance = null;
}

/**
 * Get database type
 */
export function getDbType(): 'sqlite' | 'postgresql' {
  return isSQLite() ? 'sqlite' : 'postgresql';
}

export default db;
