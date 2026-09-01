import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

function getDbPath() {
  return process.env.GREY_DB_PATH || path.join(process.cwd(), 'Admin', 'data', 'grey.db');
}

function tableExists(db: Database, name: string) {
  try {
    const r = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").get(name);
    return !!r;
  } catch {
    return false;
  }
}

function makeOrderNumber() {
  return 'ORD' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000);
}

export type LineItem = { id: number; quantity: number };

export function processOrderToDb(body: any, normalizedItems: LineItem[], shipping_cost: number, tax: number, payment_method: string, customer_email: string) {
  const dbPath = getDbPath();
  if (!fs.existsSync(dbPath)) throw new Error('DB_NOT_FOUND');
  const db = new Database(dbPath);
  try {
    const prodTable = tableExists(db, 'store_products') ? 'store_products' : (tableExists(db, 'products') ? 'products' : null);
    const ordersTable = tableExists(db, 'store_orders') ? 'store_orders' : null;
    const orderItemsTable = tableExists(db, 'store_order_items') ? 'store_order_items' : null;
    const paymentsTable = tableExists(db, 'store_payments') ? 'store_payments' : null;

    if (!prodTable || !ordersTable || !orderItemsTable) {
      throw new Error('MISSING_TABLES');
    }

    // Fetch store settings (Black Friday) into memory
    const settingsRows = db.prepare("SELECT key, value FROM store_settings").all() as Array<{key:string,value:string}>;
    const storeSettings: Record<string,string> = {};
    settingsRows.forEach(r => { storeSettings[r.key] = r.value; });

    const blackFridayActive = storeSettings['black_friday_active'] === '1' || storeSettings['black_friday_active'] === 'true';
    const blackFridayDiscount = Number(storeSettings['black_friday_discount'] || 0);

    // select extra flash sale fields when querying products
    const getProduct = db.prepare(`SELECT id, price, price_usd, stock, flash_sale, flash_sale_starts, flash_sale_ends, flash_sale_price FROM ${prodTable} WHERE id = ?`);
    const insertOrder = db.prepare(`INSERT INTO ${ordersTable} (order_number, customer_id, email, status, subtotal, shipping_cost, tax, total, currency, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`);
    const insertOrderItem = db.prepare(`INSERT INTO ${orderItemsTable} (order_id, product_id, quantity, price, subtotal, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`);
    const updateStock = db.prepare(`UPDATE ${prodTable} SET stock = stock - ? WHERE id = ? AND stock >= ?`);
    const insertPayment = paymentsTable ? db.prepare(`INSERT INTO ${paymentsTable} (order_id, customer_id, amount, currency, provider, transaction_id, reference, status, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`) : null;

    function isFlashActive(row: any) {
      if (Number(row.flash_sale || 0) !== 1) return false;
      const now = Date.now();
      const start = row.flash_sale_starts ? Date.parse(row.flash_sale_starts) : NaN;
      const end = row.flash_sale_ends ? Date.parse(row.flash_sale_ends) : NaN;
      if (!Number.isNaN(start) && now < start) return false;
      if (!Number.isNaN(end) && now > end) return false;
      return true;
    }

    function computeEffectivePrice(row: any) {
      let amount = Number(row.price || 0);
      let usd = typeof row.price_usd === 'number' ? row.price_usd : (row.price_usd ? Number(row.price_usd) : null);

      if (isFlashActive(row) && typeof row.flash_sale_price === 'number' && !isNaN(row.flash_sale_price) && row.flash_sale_price > 0) {
        amount = Number(row.flash_sale_price);
        if (typeof usd === 'number' && !isNaN(usd)) {
          usd = Math.round(usd * (amount / (Number(row.price) || amount || 1)));
        }
        return { amount: Math.round(amount), usd_override: usd, promotion: 'flash_sale' };
      }

      if (blackFridayActive && (blackFridayDiscount || 0) > 0) {
        const disc = Math.max(0, Math.min(100, blackFridayDiscount));
        const factor = (100 - disc) / 100;
        amount = Math.round(amount * factor);
        if (typeof usd === 'number' && !isNaN(usd)) usd = Math.round(usd * factor);
        return { amount: Math.round(amount), usd_override: usd, promotion: 'black_friday' };
      }

      return { amount: Math.round(amount), usd_override: usd, promotion: null };
    }

    const txn = db.transaction(() => {
      let subtotal = 0;
      const lineItems: { product_id: number; quantity: number; price: number; subtotal: number }[] = [];

      for (const ni of normalizedItems) {
        const row = getProduct.get(ni.id) as any;
        if (!row || typeof row.price === 'undefined' || row.price === null) throw new Error(`PRODUCT_NOT_FOUND:${ni.id}`);
        const stock = Math.max(0, Number(row.stock || 0));
        if (ni.quantity > stock) throw new Error(`INSUFFICIENT_STOCK:${ni.id}`);

        const eff = computeEffectivePrice(row);
        const price = Number(eff.amount || 0);
        const lineSubtotal = Math.round(price * ni.quantity);
        subtotal += lineSubtotal;
        lineItems.push({ product_id: ni.id, quantity: ni.quantity, price, subtotal: lineSubtotal });
      }

      const total = Math.max(0, subtotal + shipping_cost + tax);
      const order_number = makeOrderNumber();
      const infoMeta = JSON.stringify(body.metadata || {});
      const res = insertOrder.run(order_number, null, customer_email || null, 'pending', subtotal, shipping_cost, tax, total, String(body.currency || 'NGN'), infoMeta);
      const orderId = res.lastInsertRowid as number;

      for (const li of lineItems) {
        const u = updateStock.run(li.quantity, li.product_id, li.quantity);
        if (u.changes === 0) throw new Error(`INSUFFICIENT_STOCK:${li.product_id}`);
        insertOrderItem.run(orderId, li.product_id, li.quantity, li.price, li.subtotal, JSON.stringify({}));
      }

      if (insertPayment) {
        insertPayment.run(orderId, null, total, String(body.currency || 'NGN'), payment_method, null, null, 'pending', JSON.stringify({}));
      }

      return { order_number, total };
    });

    const result = txn();
    db.close();
    return result;
  } catch (err) {
    try { db.close(); } catch {}
    throw err;
  }
}
