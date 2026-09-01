#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const ORDERS_PATH = path.join(process.cwd(), 'Admin', 'data', 'orders.json');
const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

if (!fs.existsSync(ORDERS_PATH)) {
  console.log('No orders.json found, nothing to migrate.');
  process.exit(0);
}
if (!fs.existsSync(DB_PATH)) {
  console.error('DB not found at', DB_PATH);
  process.exit(1);
}

const raw = fs.readFileSync(ORDERS_PATH, 'utf8');
const orders = JSON.parse(raw || '[]');
if (!Array.isArray(orders) || orders.length === 0) {
  console.log('No orders to migrate');
  process.exit(0);
}

const db = new Database(DB_PATH);
try {
  // basic checks
  const hasOrders = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='store_orders'").get();
  const hasItems = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='store_order_items'").get();
  if (!hasOrders || !hasItems) {
    console.error('DB missing store_orders or store_order_items tables.');
    process.exit(1);
  }

  const insertOrder = db.prepare(`INSERT INTO store_orders (order_number, customer_id, email, status, subtotal, shipping_cost, tax, total, currency, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insertOrderItem = db.prepare(`INSERT INTO store_order_items (order_id, product_id, quantity, price, subtotal, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const updateStock = db.prepare(`UPDATE store_products SET stock = stock - ? WHERE id = ? AND stock >= ?`);

  let migrated = 0;
  const txn = db.transaction((ordersBatch: any[]) => {
    for (const ord of ordersBatch) {
      try {
        const res = insertOrder.run(ord.order_number || ('ORD' + Date.now()), null, ord.customer?.email || ord.email || null, ord.status || 'pending', ord.subtotal || 0, ord.shipping_cost || 0, ord.tax || 0, ord.total || 0, ord.currency || 'NGN', JSON.stringify(ord.metadata || {}), ord.created_at || new Date().toISOString(), ord.updated_at || new Date().toISOString());
        const orderId = res.lastInsertRowid as number;
        const its = Array.isArray(ord.items) ? ord.items : [];
        for (const it of its) {
          // attempt to decrement stock if store_products exists
          try {
            if (db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='store_products'").get()) {
              const u = updateStock.run(it.quantity || 0, it.product_id || it.id, it.quantity || 0);
              if (u.changes === 0) {
                console.warn(`Product ${it.product_id || it.id} stock not sufficient to decrement; skipping stock decrement.`);
              }
            }
          } catch (e) {
            // ignore
          }
          insertOrderItem.run(orderId, it.product_id || it.id || 0, it.quantity || it.qty || 1, it.price || 0, it.subtotal || 0, JSON.stringify(it.metadata || {}), ord.created_at || new Date().toISOString());
        }
        migrated++;
      } catch (e) {
        console.error('Failed migrating order', ord.order_number, e);
      }
    }
  });

  txn(orders);
  console.log(`Migrated ${migrated} orders`);

  // backup original
  fs.copyFileSync(ORDERS_PATH, ORDERS_PATH + '.migrated.' + Date.now());
  console.log('Backup created.');
} finally {
  db.close();
}
