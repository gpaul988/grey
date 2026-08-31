const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
const email = process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng';
const password = process.env.ADMIN_PASSWORD || '1Uriel2Graham3';
const name = process.env.ADMIN_NAME || 'Grey InfoTech';

console.log('Using DB', DB_PATH);
const db = new Database(DB_PATH);
try {
  const row = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  const hash = bcrypt.hashSync(password, 12);
  if (row) {
    console.log('User exists, updating password and activating');
    db.prepare("UPDATE users SET password_hash = ?, status='active', email_verified=1, verified_at = datetime('now'), updated_at=datetime('now') WHERE id = ?").run(hash, row.id);
    console.log('Updated user id', row.id);
  } else {
    console.log('Creating new admin user');
    const info = db.prepare("INSERT INTO users (name, email, password_hash, role, phone, avatar, status, email_verified, verified_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))").run(name, email.toLowerCase(), hash, 'superadmin', null, null, 'active', 1);
    console.log('Created user id', info.lastInsertRowid);
  }
  process.exit(0);
} catch (err) {
  console.error('Failed to create admin', err);
  process.exit(2);
} finally {
  db.close();
}
