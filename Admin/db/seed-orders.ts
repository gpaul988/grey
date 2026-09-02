import { getDb } from './index';

function seedOrders() {
  const db = getDb();
  try {
    const existing = (db.prepare("SELECT COUNT(*) AS c FROM orders").get() as { c: number }).c;
    if (existing > 0) {
      console.log('[seed-orders] Orders already exist:', existing);
      return;
    }

    // find a product to attach to orders
    const prod = db.prepare('SELECT id, price FROM products WHERE status = "active" LIMIT 1').get() as any;
    if (!prod) {
      console.log('[seed-orders] No active product found to create orders.');
      return;
    }

    // create two customers in different states
    const insertCustomer = db.prepare('INSERT INTO customers (first_name, last_name, email, phone, state, city, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"))');
    const c1 = insertCustomer.run('John', 'Rivers', 'john.rivers@example.com', '+2348001001001', 'Rivers State', 'Port Harcourt', '1 Marina').lastInsertRowid as number;
    const c2 = insertCustomer.run('Aisha', 'Lagos', 'aisha.lagos@example.com', '+2348002002002', 'Lagos State', 'Ikeja', '12 Commerce Ave').lastInsertRowid as number;

    const insertOrder = db.prepare('INSERT INTO orders (order_number, customer_id, email, status, subtotal, shipping_cost, tax, total, currency, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"))');
    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price, subtotal, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime("now"))');

    const ord1Num = 'SEED-' + Date.now().toString(36) + '-1';
    const subtotal1 = Math.round(prod.price || 0);
    const total1 = subtotal1 + 0 + 0;
    const res1 = insertOrder.run(ord1Num, c1, 'john.rivers@example.com', 'completed', subtotal1, 0, 0, total1, 'NGN', '{}');
    const orderId1 = res1.lastInsertRowid as number;
    insertItem.run(orderId1, prod.id, 1, subtotal1, subtotal1, '{}');

    const ord2Num = 'SEED-' + (Date.now()+1).toString(36) + '-2';
    const subtotal2 = Math.round(prod.price || 0);
    const total2 = subtotal2 + 0 + 0;
    const res2 = insertOrder.run(ord2Num, c2, 'aisha.lagos@example.com', 'completed', subtotal2, 0, 0, total2, 'NGN', '{}');
    const orderId2 = res2.lastInsertRowid as number;
    insertItem.run(orderId2, prod.id, 2, Math.round((prod.price || 0)), subtotal2 * 2, '{}');

    console.log('[seed-orders] Created sample orders for customers in Rivers State and Lagos State');
  } finally {
    try { db.close(); } catch (e) {}
  }
}

seedOrders();

