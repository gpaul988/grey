import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

type SqliteDb = InstanceType<typeof Database>;

// Protect this endpoint: provide ADMIN_MIGRATE_TOKEN env var and pass it in X-Admin-Token header.
// In development, token is optional for convenience.

const ORDERS_PATH = path.join(process.cwd(), 'Admin', 'data', 'orders.json');
const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

function ensureDataDir(p: string) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function tableExists(db: SqliteDb, name: string) {
  try { return !!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").get(name); } catch { return false; }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-admin-token') || '';
    const required = process.env.ADMIN_MIGRATE_TOKEN || '';
    if (process.env.NODE_ENV !== 'development' && required && token !== required) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!fs.existsSync(ORDERS_PATH)) return NextResponse.json({ migrated: 0, message: 'No orders.json found' });
    if (!fs.existsSync(DB_PATH)) return NextResponse.json({ error: 'DB not found', status: 500 }, { status: 500 });

    const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
    const orders = JSON.parse(raw || '[]');
    if (!Array.isArray(orders) || orders.length === 0) return NextResponse.json({ migrated: 0, message: 'No orders to migrate' });

    const db = new Database(DB_PATH);
    try {
      if (!tableExists(db, 'store_orders') || !tableExists(db, 'store_order_items')) {
        return NextResponse.json({ error: 'Required DB tables missing (store_orders/store_order_items)' }, { status: 500 });
      }

      const insertOrder = db.prepare(`INSERT INTO store_orders (order_number, customer_id, email, status, subtotal, shipping_cost, tax, total, currency, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      const insertOrderItem = db.prepare(`INSERT INTO store_order_items (order_id, product_id, quantity, price, subtotal, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
      const updateStock = tableExists(db, 'store_products') ? db.prepare(`UPDATE store_products SET stock = stock - ? WHERE id = ? AND stock >= ?`) : null;

      let migrated = 0;
      const errors: string[] = [];

      const txn = db.transaction((ordersBatch: any[]) => {
        for (const ord of ordersBatch) {
          try {
            const res = insertOrder.run(ord.order_number || ('ORD' + Date.now()), null, ord.customer?.email || ord.email || null, ord.status || 'pending', ord.subtotal || 0, ord.shipping_cost || 0, ord.tax || 0, ord.total || 0, ord.currency || 'NGN', JSON.stringify(ord.metadata || {}), ord.created_at || new Date().toISOString(), ord.updated_at || new Date().toISOString());
            const orderId = res.lastInsertRowid as number;
            const its = Array.isArray(ord.items) ? ord.items : [];
            for (const it of its) {
              try {
                if (updateStock) {
                  try { updateStock.run(it.quantity || 0, it.product_id || it.id, it.quantity || 0); } catch (e) { /* ignore stock update errors */ }
                }
              } catch {}
              insertOrderItem.run(orderId, it.product_id || it.id || 0, it.quantity || it.qty || 1, it.price || 0, it.subtotal || 0, JSON.stringify(it.metadata || {}), ord.created_at || new Date().toISOString());
            }
            migrated++;
          } catch (e: any) {
            errors.push(String(e));
          }
        }
      });

      txn(orders);

      // backup original orders file
      try { fs.copyFileSync(ORDERS_PATH, ORDERS_PATH + '.migrated.' + Date.now()); } catch (e) { /* ignore */ }

      return NextResponse.json({ migrated, errors });
    } finally {
      try { db.close(); } catch {}
    }
  } catch (err) {
    console.error('[Admin migrate-orders]', err);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
