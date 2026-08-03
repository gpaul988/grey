import mysql, { type Pool, type ResultSetHeader } from 'mysql2/promise';
import path from 'node:path';
import { execFile } from 'child_process';
import util from 'util';

const execFileP = util.promisify(execFile);

type SqlScalar = string | number | boolean | null | Date | Buffer | Uint8Array;
type SqlValue = SqlScalar | SqlValue[] | { [key: string]: SqlValue };
type SqlParam = SqlValue | Record<string, SqlValue> | undefined | null;
type SqlRow = Record<string, SqlValue>;
type SqlRows = SqlRow[];
type SqlWriteResult = { lastInsertRowid: number; changes: number };
type TransactionConnection = {
  execute: (sql: string, params?: SqlParam) => Promise<unknown>;
  query: (sql: string, params?: SqlParam) => Promise<unknown>;
};

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'grey';
const port = Number(process.env.DB_PORT || 3306);

let pool: Pool | null = null;

function getErrorCode(err: unknown): string | undefined {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as { code?: unknown }).code;
    return typeof code === 'string' ? code : undefined;
  }
  return undefined;
}

function getMySqlSetupHint(err: unknown): string | null {
  if (getErrorCode(err) === 'ER_ACCESS_DENIED_ERROR') {
    return 'MySQL access denied. Set DB_HOST, DB_USER, DB_PASS, DB_NAME, and DB_PORT for your server.';
  }
  return null;
}

async function ensurePool() {
  if (pool) return;
  // Try to open a short-lived connection to the target database. This surfaces ER_BAD_DB_ERROR
  try {
    const testConn = await mysql.createConnection({ host, user, password, database, port });
    await testConn.ping();
    await testConn.end();
  } catch (err: unknown) {
    const hint = getMySqlSetupHint(err);
    if (hint) {
      throw new Error(hint);
    }
    if (getErrorCode(err) === 'ER_BAD_DB_ERROR') {
      // Database missing — create it using an admin connection
      const adminConn = await mysql.createConnection({ host, user, password, port });
      await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await adminConn.end();
    } else {
      throw err;
    }
  }
  // Now the DB exists (or was connectable). Create the pool.
  pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 10 });
}

function toPositional(sql: string, params: SqlParam) {
  // If params is an array or undefined, return as-is (but sanitize undefined -> null)
  if (Array.isArray(params) || params == null) {
    const arr = Array.isArray(params) ? params.map((v) => (v === undefined ? null : v)) : [];
    return { sql, params: arr };
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
  const values = keys.map((k) => {
    const v = (params as Record<string, SqlValue>)[k];
    return v === undefined ? null : v;
  });
  return { sql: converted, params: values };
}

let bootstrapAttempted = false;

class Statement {
  sql: string;
  constructor(sql: string) { this.sql = sql; }

  private async runOnceExecute(sqlText: string, params: SqlParam) {
    const [rows] = await (pool as Pool).execute(sqlText, params ?? []);
    return rows as SqlRows;
  }

  async get(params?: SqlParam) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    try {
      const rows = await this.runOnceExecute(sql, normalizedParams ?? []);
      return rows[0] as SqlRow | undefined;
    } catch (err: unknown) {
      if (!bootstrapAttempted && getErrorCode(err) === 'ER_NO_SUCH_TABLE') {
        bootstrapAttempted = true;
        // Run minimal bootstrap to create core tables, then retry once
        const scriptPath = path.resolve(__dirname, '..', '..', 'scripts', 'bootstrap-db-mysql-minimal.js');
        await execFileP(process.execPath, [scriptPath], { env: process.env, cwd: process.cwd() });
        const rows = await this.runOnceExecute(sql, normalizedParams ?? []);
        return rows[0] as SqlRow | undefined;
      }
      throw err;
    }
  }

  async all(params?: SqlParam) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    try {
      const rows = await this.runOnceExecute(sql, normalizedParams ?? []);
      return rows as SqlRows;
    } catch (err: unknown) {
      if (!bootstrapAttempted && getErrorCode(err) === 'ER_NO_SUCH_TABLE') {
        bootstrapAttempted = true;
        const scriptPath = path.resolve(__dirname, '..', '..', 'scripts', 'bootstrap-db-mysql-minimal.js');
        await execFileP(process.execPath, [scriptPath], { env: process.env, cwd: process.cwd() });
        const rows = await this.runOnceExecute(sql, normalizedParams ?? []);
        return rows as SqlRows;
      }
      throw err;
    }
  }

  async run(params?: SqlParam) {
    await ensurePool();
    const { sql, params: normalizedParams } = toPositional(this.sql, params);
    try {
      const [result] = await (pool as Pool).execute(sql, normalizedParams ?? []);
      const header = result as ResultSetHeader;
      return { lastInsertRowid: header.insertId ?? 0, changes: header.affectedRows ?? 0 } as SqlWriteResult;
    } catch (err: unknown) {
      if (!bootstrapAttempted && getErrorCode(err) === 'ER_NO_SUCH_TABLE') {
        bootstrapAttempted = true;
        const scriptPath = path.resolve(__dirname, '..', '..', 'scripts', 'bootstrap-db-mysql-minimal.js');
        await execFileP(process.execPath, [scriptPath], { env: process.env, cwd: process.cwd() });
        const [result] = await (pool as Pool).execute(sql, normalizedParams ?? []);
        const header = result as ResultSetHeader;
        return { lastInsertRowid: header.insertId ?? 0, changes: header.affectedRows ?? 0 } as SqlWriteResult;
      }
      throw err;
    }
  }
}

export function prepare(sql: string) { return new Statement(sql); }

export async function query(sql: string, params?: SqlParam) {
  await ensurePool();
  const { sql: converted, params: normalizedParams } = toPositional(sql, params);
  try {
    const [rows] = await (pool as Pool).execute(converted, normalizedParams ?? []);
    return rows as SqlRows;
  } catch (err: unknown) {
    if (!bootstrapAttempted && getErrorCode(err) === 'ER_NO_SUCH_TABLE') {
      bootstrapAttempted = true;
      const scriptPath = path.resolve(__dirname, '..', '..', 'scripts', 'bootstrap-db-mysql-minimal.js');
      await execFileP(process.execPath, [scriptPath], { env: process.env, cwd: process.cwd() });
      const [rows] = await (pool as Pool).execute(converted, normalizedParams ?? []);
      return rows as SqlRows;
    }
    throw err;
  }
}

export async function exec(sql: string) {
  await ensurePool();
  try {
    const [res] = await (pool as Pool).query(sql);
    return res;
  } catch (err: unknown) {
    if (!bootstrapAttempted && getErrorCode(err) === 'ER_NO_SUCH_TABLE') {
      bootstrapAttempted = true;
      const scriptPath = path.resolve(__dirname, '..', '..', 'scripts', 'bootstrap-db-mysql-minimal.js');
      await execFileP(process.execPath, [scriptPath], { env: process.env, cwd: process.cwd() });
      const [res] = await (pool as Pool).query(sql);
      return res;
    }
    throw err;
  }
}

export async function transaction(fn: (conn: TransactionConnection) => Promise<void>) {
  await ensurePool();
  const conn = await (pool as Pool).getConnection();
  try {
    await conn.beginTransaction();
    // provide a thin connection proxy
    const proxy: TransactionConnection = {
      execute: async (sql: string, params?: SqlParam) => {
        const { sql: converted, params: normalizedParams } = toPositional(sql, params);
        return conn.execute(converted, normalizedParams ?? []);
      },
      query: async (sql: string, params?: SqlParam) => {
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

export async function close() { if (pool) { await (pool as Pool).end(); pool = null; } }

export default { prepare, query, exec, transaction, close };
