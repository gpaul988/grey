import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { Pool } from 'pg';
import mysql, { type Pool as MysqlPool } from 'mysql2/promise';
import * as schema from './db/schema';

let pgPool: Pool | null = null;
let mysqlPool: MysqlPool | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;

/**
 * Check database type from environment
 * Default: MySQL (not SQLite)
 */
function getDbType(): 'mysql' | 'postgresql' | 'sqlite' {
  const dbType = process.env.DB_TYPE || 'mysql';
  return dbType.toLowerCase() as 'mysql' | 'postgresql' | 'sqlite';
}

/**
 * Get or create MySQL connection pool
 */
export function getMysqlPool(): MysqlPool {
  if (mysqlPool) return mysqlPool;

  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'grey';
  const port = Number(process.env.DB_PORT || 3306);

  mysqlPool = mysql.createPool({
    host,
    user,
    password,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return mysqlPool;
}

/**
 * Get or create PostgreSQL connection pool
 */
export function getPgPool(): Pool {
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
 * Get Drizzle ORM instance
 */
export function getDb() {
  if (!dbInstance) {
    const dbType = getDbType();
    
    if (dbType === 'mysql') {
      const pool = getMysqlPool();
      dbInstance = drizzleMysql({ client: pool, schema, mode: 'default' });
    } else if (dbType === 'postgresql') {
      const pool = getPgPool();
      dbInstance = drizzlePg({ client: pool, schema });
    } else {
      throw new Error(`Unsupported database type: ${dbType}`);
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sql: string, params?: any[]) {
  const dbType = getDbType();
  
  if (dbType === 'mysql') {
    const pool = getMysqlPool();
    const [rows] = await pool.execute(sql, params || []);
    return rows;
  } else if (dbType === 'postgresql') {
    const pool = getPgPool();
    const result = await pool.query(sql, params);
    return result.rows;
  } else {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
}

/**
 * Get a single client connection (for transactions)
 */
export async function getClient() {
  const dbType = getDbType();
  
  if (dbType === 'mysql') {
    const pool = getMysqlPool();
    return pool.getConnection();
  } else if (dbType === 'postgresql') {
    const pool = getPgPool();
    return pool.connect();
  } else {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
}

/**
 * Close all database connections (cleanup on shutdown)
 */
export async function closePool(): Promise<void> {
  if (mysqlPool) {
    await mysqlPool.end();
    mysqlPool = null;
  }
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
  dbInstance = null;
}

/**
 * Get database type
 */
export function getDatabaseType(): 'mysql' | 'postgresql' | 'sqlite' {
  return getDbType();
}

export default db;
