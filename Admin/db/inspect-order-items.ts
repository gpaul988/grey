import { getDb } from './index';
const db = getDb();
try {
  const cols = db.prepare("PRAGMA table_info('order_items')").all() as any[];
  console.log('order_items columns:');
  cols.forEach(c => console.log(c.name, c.type, c.dflt_value));
} finally { try { db.close(); } catch(e) {} }
