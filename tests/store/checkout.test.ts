import { describe, it, expect, vi, afterEach } from 'vitest';
import * as processor from '@/app/api/store/checkout/processor';
import fs from 'fs';
import Database from 'better-sqlite3';
import path from 'path';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('checkout processor', () => {
  it('throws when DB is missing', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => processor.processOrderToDb({}, [], 0, 0, 'bank_transfer', 'a@b.com')).toThrowError('DB_NOT_FOUND');
  });

  it('processes order successfully and decrements stock', () => {
    const tmp = path.join(process.cwd(), 'Admin', 'data', 'test-grey.db');
    try { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); } catch {}
    const db = new Database(tmp);
    try {
      db.exec(`
        CREATE TABLE store_products (id INTEGER PRIMARY KEY, price REAL, stock INTEGER);
        CREATE TABLE store_orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_number TEXT, customer_id INTEGER, email TEXT, status TEXT, subtotal REAL, shipping_cost REAL, tax REAL, total REAL, currency TEXT, metadata TEXT, created_at TEXT, updated_at TEXT);
        CREATE TABLE store_order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, product_id INTEGER, quantity INTEGER, price REAL, subtotal REAL, metadata TEXT, created_at TEXT);
        CREATE TABLE store_payments (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, customer_id INTEGER, amount REAL, currency TEXT, provider TEXT, transaction_id TEXT, reference TEXT, status TEXT, metadata TEXT, created_at TEXT, updated_at TEXT);
      `);
      db.prepare('INSERT INTO store_products (id, price, stock) VALUES (?, ?, ?)').run(1, 1000, 5);
    } finally { db.close(); }

    // point processor to tmp DB
    process.env.GREY_DB_PATH = tmp;

    const body = { metadata: {} };
    const normalized = [{ id: 1, quantity: 2 }];
    const result = processor.processOrderToDb(body, normalized, 50, 10, 'testpay', 'customer@example.com');
    expect(result).toHaveProperty('order_number');
    expect(result).toHaveProperty('total');

    // verify stock decremented
    const db2 = new Database(tmp, { readonly: true });
    try {
      const row = db2.prepare('SELECT stock FROM store_products WHERE id = ?').get(1);
      expect(row.stock).toBe(3);
    } finally { db2.close(); }

    // cleanup
    try { fs.unlinkSync(tmp); } catch {}
  });
});
