import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

type SqliteDb = InstanceType<typeof Database>;

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
const ORDERS_PATH = path.join(process.cwd(), 'Admin', 'data', 'orders.json');

function ensureDataDir() {
  const dir = path.dirname(ORDERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function makeOrderNumber() {
  return 'ORD' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000);
}

function tableExists(db: SqliteDb, name: string) {
  try {
    const r = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").get(name);
    return !!r;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    const payment_method = String(body.payment_method || '').trim();
    const customer_email = String(body.email || body.email_address || '').trim();
    const first_name = String(body.first_name || '').trim();
    const last_name = String(body.last_name || '').trim();
    const phone = String(body.phone || '').trim();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in the order' }, { status: 400 });
    }
    if (!first_name || !last_name || !phone) {
      return NextResponse.json({ error: 'Missing customer contact or name' }, { status: 400 });
    }
    if (!payment_method) {
      return NextResponse.json({ error: 'Missing payment method' }, { status: 400 });
    }

    // Normalize and validate items
    const normalizedItems: { id: number; quantity: number }[] = [];
    for (const it of items) {
      const id = Number(it?.id || it?.product_id || 0);
      const qty = Math.max(0, Math.floor(Number(it?.quantity || 0)));
      if (!id || qty <= 0) return NextResponse.json({ error: 'Invalid item id or quantity' }, { status: 400 });
      normalizedItems.push({ id, quantity: qty });
    }

    // Defaults for shipping/tax
    const shipping_cost = Math.max(0, Number(body.shipping_cost || 0));
    const tax = Math.max(0, Number(body.tax || 0));

    // Try to use DB-backed orders if possible
    if (fs.existsSync(DB_PATH)) {
      try {
        const { processOrderToDb } = await import('./processor');
        const result = processOrderToDb(body, normalizedItems, shipping_cost, tax, payment_method, customer_email);
        return NextResponse.json({ order: { order_number: result.order_number, total: result.total }, payment: { method: payment_method } }, { status: 201 });
      } catch (err: any) {
        if (err && typeof err === 'string' && err.startsWith('PRODUCT_NOT_FOUND')) {
          const parts = err.split(':');
          return NextResponse.json({ error: `Product not found: ${parts[1]}` }, { status: 400 });
        }
        if (err && err.message && err.message.startsWith('PRODUCT_NOT_FOUND')) {
          const parts = err.message.split(':');
          return NextResponse.json({ error: `Product not found: ${parts[1]}` }, { status: 400 });
        }
        if (err && err.message && err.message.startsWith('INSUFFICIENT_STOCK')) {
          const parts = err.message.split(':');
          return NextResponse.json({ error: `Insufficient stock for product ${parts[1]}` }, { status: 400 });
        }
        console.error('[Store Checkout POST][DB]', err);
        // fall back to file persist
        return await fallbackFilePersist();
      }
    }

    // DB not available -> fallback to file persistence
    return await fallbackFilePersist();
  } catch (err) {
    console.error('[Store Checkout POST]', err);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}

async function fallbackFilePersist() {
  try {
    // fallback logic: keep previous file-based persistence
    ensureDataDir();
    let orders: any[] = [];
    try {
      if (fs.existsSync(ORDERS_PATH)) {
        const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
        orders = JSON.parse(raw || '[]');
      }
    } catch (e) {
      orders = [];
    }

    const order_number = makeOrderNumber();
    // Not having computed subtotal here — store minimal placeholder
    const order = {
      order_number,
      created_at: new Date().toISOString(),
      items: [],
      subtotal: 0,
      shipping_cost: 0,
      tax: 0,
      total: 0,
      currency: 'NGN',
      payment_method: null,
      customer: null,
      status: 'pending',
      metadata: {},
    };
    orders.push(order);
    // back up prior file
    try { if (fs.existsSync(ORDERS_PATH)) fs.copyFileSync(ORDERS_PATH, ORDERS_PATH + '.bak'); } catch {}
    fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), 'utf8');
    return NextResponse.json({ order: { order_number: order.order_number, total: order.total }, payment: { method: null } }, { status: 201 });
  } catch (err) {
    console.error('[Fallback Persist]', err);
    return NextResponse.json({ error: 'Failed to persist order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // prefer DB read if available
    if (fs.existsSync(DB_PATH)) {
      const db = new Database(DB_PATH, { readonly: true });
      try {
        if (tableExists(db, 'store_orders') && tableExists(db, 'store_order_items')) {
          const orders = db.prepare('SELECT * FROM store_orders ORDER BY created_at DESC').all();
          const items = db.prepare('SELECT * FROM store_order_items WHERE order_id = ?').all;
          // attach items for each order
          const out = orders.map((o: any) => {
            const its = db.prepare('SELECT * FROM store_order_items WHERE order_id = ?').all(o.id);
            return { ...o, items: its };
          });
          db.close();
          return NextResponse.json({ orders: out });
        }
      } catch (e) {
        try { db.close(); } catch {}
        console.error('[Store Checkout GET][DB]', e);
      }
    }

    if (!fs.existsSync(ORDERS_PATH)) return NextResponse.json({ orders: [] });
    const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
    const arr = JSON.parse(raw || '[]');
    return NextResponse.json({ orders: arr });
  } catch (err) {
    console.error('[Store Checkout GET]', err);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
