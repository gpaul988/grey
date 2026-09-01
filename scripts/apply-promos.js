// Run from repo root with: node scripts/apply-promos.js
// This reads the seed-promos.sql and applies it to the database using better-sqlite3

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
const SQL_FILE = path.join(process.cwd(), 'Admin', 'data', 'seed-promos.sql');

try {
  if (!fs.existsSync(SQL_FILE)) {
    console.error('SQL file not found:', SQL_FILE);
    process.exit(1);
  }

  const db = new Database(DB_PATH);
  const sql = fs.readFileSync(SQL_FILE, 'utf8');
  
  // Split by semicolon and execute each statement
  const statements = sql.split(';').filter(s => s.trim() && !s.trim().startsWith('--') && !s.trim().startsWith('/*'));
  
  db.exec('BEGIN;');
  for (const stmt of statements) {
    if (stmt.trim()) {
      try {
        db.exec(stmt);
      } catch (e) {
        console.warn('Statement failed (continuing):', stmt.slice(0, 50), e.message);
      }
    }
  }
  db.exec('COMMIT;');
  
  // Verify
  const settings = db.prepare("SELECT key, value FROM store_settings WHERE key LIKE 'black_friday%'").all();
  const flash = db.prepare("SELECT slug, flash_sale, flash_sale_price FROM products WHERE flash_sale = 1").all();
  
  console.log('✓ Black Friday settings:');
  settings.forEach(s => console.log(`  ${s.key}: ${s.value}`));
  
  console.log('\n✓ Flash sales enabled:');
  flash.forEach(p => console.log(`  ${p.slug}: flash_sale=${p.flash_sale}, price=₦${p.flash_sale_price}`));
  
  db.close();
  console.log('\n✓ Promos seeded successfully!');
} catch (err) {
  console.error('Failed to apply promos:', err.message);
  process.exit(1);
}
