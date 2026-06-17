import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Get or create PostgreSQL connection pool
 */
export function getPool(): Pool {
  if (pool) return pool;

  const isDev = process.env.NODE_ENV === 'development';
  const connectionString = process.env.DATABASE_URL || 
    (isDev ? 'postgresql://user:password@localhost:5432/grey_dev' : undefined);

  if (!connectionString && !isDev) {
    throw new Error('DATABASE_URL not set in production');
  }

  pool = new Pool({
    connectionString,
    min: isDev ? 2 : 10,
    max: isDev ? 10 : 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: !isDev ? { rejectUnauthorized: false } : false,
    statement_timeout: 30000,
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

  return pool;
}

/**
 * Drizzle ORM instance with PostgreSQL
 */
export const db = drizzle({
  client: getPool(),
});

/**
 * Execute raw SQL query
 */
export async function query(sql: string, params?: any[]) {
  const pool = getPool();
  const result = await pool.query(sql, params);
  return result.rows;
}

/**
 * Get a single client connection (for transactions)
 */
export async function getClient() {
  const pool = getPool();
  return pool.connect();
}

/**
 * Close pool (cleanup on shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await query('SELECT 1');
    return result && result.length > 0;
  } catch (e) {
    console.error('Database health check failed:', e);
    return false;
  }
}
