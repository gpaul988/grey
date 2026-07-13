import { getPgPool } from './db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sql: string, params?: any[]) {
  const pool = getPgPool();
  try {
    const result = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queryOne(sql: string, params?: any[]) {
  const result = await query(sql, params);
  return result.rows[0] || null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queryMany(sql: string, params?: any[]) {
  const result = await query(sql, params);
  return result.rows;
}
