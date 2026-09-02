import { getDb } from './index';

function seedOrdersDemo() {
  const db = getDb();
  try {
    // find a product to attach to orders
    const prod = db.prepare("SELECT id, price, name, slug, thumbnail, sku FROM products WHERE status = 'active' LIMIT 1").get() as any;
    if (!prod) {
      console.log('[seed-orders-demo] No active product found to create orders.');
      return;
    }

    const insertCustomer = db.prepare("INSERT OR IGNORE INTO customers (first_name, last_name, email, phone, state, city, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))");
    const findCustomer = db.prepare('SELECT id FROM customers WHERE email = ?');
    const insertOrder = db.prepare("INSERT INTO orders (order_number, customer_id, status, subtotal, shipping_fee, tax, total, currency, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    const insertItem = db.prepare("INSERT INTO order_items (order_id, product_id, product_name, product_image, product_sku, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    // Create Rivers State customer and order
    insertCustomer.run('Seed', 'Rivers', 'seed.rivers@example.com', '+2347000000001', 'Rivers State', 'Port Harcourt', 'Seed Address 1');
    const c1 = (findCustomer.get('seed.rivers@example.com') as any).id as number;
    const ord1Num = 'SEED-RIV-' + Date.now().toString(36);
    const subtotal1 = Math.round(prod.price || 0);
    const total1 = subtotal1;
    const res1 = insertOrder.run(ord1Num, c1, 'completed', subtotal1, 0, 0, total1, 'NGN', 'paid');
    const orderId1 = res1.lastInsertRowid as number;
    insertItem.run(orderId1, prod.id, prod.name || prod.slug || 'product', prod.thumbnail || null, prod.sku || null, 1, subtotal1, subtotal1);

    // Create Lagos State customer and order
    insertCustomer.run('Seed', 'Lagos', 'seed.lagos@example.com', '+2347000000002', 'Lagos State', 'Ikeja', 'Seed Address 2');
    const c2 = (findCustomer.get('seed.lagos@example.com') as any).id as number;
    const ord2Num = 'SEED-LAG-' + (Date.now()+1).toString(36);
    const subtotal2 = Math.round(prod.price || 0);
    const total2 = subtotal2;
    const res2 = insertOrder.run(ord2Num, c2, 'completed', subtotal2, 0, 0, total2, 'NGN', 'paid');
    const orderId2 = res2.lastInsertRowid as number;
    insertItem.run(orderId2, prod.id, prod.name || prod.slug || 'product', prod.thumbnail || null, prod.sku || null, 2, Math.round(prod.price || 0), subtotal2 * 2);

    console.log('[seed-orders-demo] Inserted demo orders for Rivers State and Lagos State.');
  } finally {
    try { db.close(); } catch (e) {}
  }
}

seedOrdersDemo();
