import { getPgPool } from './db';

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

export async function queryOne(sql: string, params?: any[]) {
  const result = await query(sql, params);
  return result.rows[0] || null;
}

export async function queryMany(sql: string, params?: any[]) {
  const result = await query(sql, params);
  return result.rows;
}
