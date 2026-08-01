import mysql from 'mysql2/promise';
import path from 'node:path';

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'grey';
const port = Number(process.env.DB_PORT || 3306);

let pool: mysql.Pool | null = null;

async function ensurePool() {
  if (pool) return;
  // Try creating a pool that connects to the configured database.
  pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 10 });
  try {
    // quick test query to detect missing DB
    await pool.query('SELECT 1');
  } catch (err: any) {
    // If the database does not exist, create it via an admin connection and recreate the pool
    if (err && err.code === 'ER_BAD_DB_ERROR') {
      const adminConn = await mysql.createConnection({ host, user, password, port });
      await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await adminConn.end();
      // recreate pool pointing to the DB
      pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 10 });
    } else {
      throw err;
    }
  }
}

function toPositional(sql: string, params: any) {
  // If params is an array or undefined, return as-is
  if (Array.isArray(params) || !params) {
    return { sql, params: params ?? [] };
  }
  // If params is a scalar (number, string, etc.), wrap in array
  if (typeof params !== 'object') {
    return { sql, params: [params] };
  }
  // If params is an object, convert named params to positional
  const keys: string[] = [];
  const converted = sql.replace(/@([a-zA-Z0-9_]+)|:([a-zA-Z0-9_]+)/g, (match, at, colon) => {
    const key = at || colon;
    keys.push(key);
    return '?';
  });
  const values = keys.map(k => params[k]);
  return { sql: converted, params: values };
}

class Statement {
  sql: string;
  constructor(sql: string) { this.sql = sql; }
  async get(params?: any) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    const [rows] = await (pool as mysql.Pool).execute(sql, normalizedParams ?? []);
    return (rows as any)[0];
  }
  async all(params?: any) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    const [rows] = await (pool as mysql.Pool).execute(sql, normalizedParams ?? []);
    return rows as any[];
  }
  async run(params?: any) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    const [result] = await (pool as mysql.Pool).execute(sql, normalizedParams ?? []);
    // result is OkPacket
    return { lastInsertRowid: (result as any).insertId ?? 0, changes: (result as any).affectedRows ?? 0 };
  }
}

export function prepare(sql: string) { return new Statement(sql); }

export async function query(sql: string, params?: any) {
  await ensurePool();
  const { sql: converted, params: normalizedParams } = toPositional(sql, params);
  const [rows] = await (pool as mysql.Pool).execute(converted, normalizedParams ?? []);
  return rows as any[];
}

export async function exec(sql: string) {
  await ensurePool();
  const [res] = await (pool as mysql.Pool).query(sql);
  return res;
}

export async function transaction(fn: (conn: { execute: any; query: any }) => Promise<void>) {
  await ensurePool();
  const conn = await (pool as mysql.Pool).getConnection();
  try {
    await conn.beginTransaction();
    // provide a thin connection proxy
    const proxy = {
      execute: async (sql: string, params?: any) => {
        const { sql: converted, params: normalizedParams } = toPositional(sql, params);
        return conn.execute(converted, normalizedParams ?? []);
      },
      query: async (sql: string, params?: any) => {
        const { sql: converted, params: normalizedParams } = toPositional(sql, params);
        return conn.query(converted, normalizedParams ?? []);
      },
    };
    await fn(proxy);
    await conn.commit();
  } catch (err) {
    try { await conn.rollback(); } catch {}
    throw err;
  } finally {
    conn.release();
  }
}

export async function close() { if (pool) { await (pool as mysql.Pool).end(); pool = null; } }

export default { prepare, query, exec, transaction, close };
