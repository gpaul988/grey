const Database = require('better-sqlite3');
const db = new Database('Admin/data/grey.db');
const orders = db.prepare("SELECT COUNT(*) as c FROM orders").get().c;
const active = db.prepare("SELECT COUNT(*) as c FROM orders WHERE status!='cancelled'").get().c;
const items = db.prepare("SELECT COUNT(*) as c FROM order_items").get().c;
const customers = db.prepare("SELECT COUNT(*) as c FROM customers").get().c;
const byState = db.prepare("SELECT c.state as state, COUNT(o.id) as orders FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.state ORDER BY orders DESC LIMIT 10").all();
console.log(JSON.stringify({orders,active,items,customers,byState},null,2));
db.close();
