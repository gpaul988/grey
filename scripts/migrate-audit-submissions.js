#!/usr/bin/env node

const Database = require('better-sqlite3');
const path = require('path');

// Detect database type from environment
const isDev = !process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:');

if (isDev) {
  // SQLite migration for local development
  const dbPath = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace('file:', '').replace('?', '')
    : path.join(__dirname, '../Admin/data/grey.db');

  console.log(`[Audit Submissions] Migrating SQLite database at: ${dbPath}`);

  // Ensure directory exists
  const dir = path.dirname(dbPath);
  const fs = require('fs');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Create audit_submissions table if not exists
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS audit_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      user_phone TEXT,
      user_company TEXT,
      audit_report_id TEXT,
      website TEXT,
      github_repo TEXT,
      priority TEXT NOT NULL DEFAULT 'medium',
      budget_estimate TEXT,
      specific_issues TEXT,
      preferred_contact TEXT NOT NULL DEFAULT 'email',
      audit_data TEXT DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'new',
      admin_notes TEXT,
      proposed_solution TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      responded_at DATETIME
    )
  `;

  try {
    db.exec(createTableSQL);
    console.log('✅ audit_submissions table created/verified');

    // Create indexes
    const indexSQL = [
      'CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(user_email)',
      'CREATE INDEX IF NOT EXISTS idx_audit_submissions_status ON audit_submissions(status)',
      'CREATE INDEX IF NOT EXISTS idx_audit_submissions_priority ON audit_submissions(priority)',
      'CREATE INDEX IF NOT EXISTS idx_audit_submissions_report_id ON audit_submissions(audit_report_id)',
    ];

    indexSQL.forEach((sql) => {
      db.exec(sql);
    });
    console.log('✅ All indexes created');

    db.close();
    console.log('✅ SQLite migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    db.close();
    process.exit(1);
  }
} else {
  // PostgreSQL migration (manual)
  console.log('📢 For PostgreSQL, run this SQL manually:');
  console.log(`
CREATE TABLE IF NOT EXISTS audit_submissions (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  user_company TEXT,
  audit_report_id TEXT,
  website TEXT,
  github_repo TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  budget_estimate TEXT,
  specific_issues TEXT,
  preferred_contact TEXT NOT NULL DEFAULT 'email',
  audit_data JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  proposed_solution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(user_email);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_status ON audit_submissions(status);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_priority ON audit_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_report_id ON audit_submissions(audit_report_id);
  `);
  process.exit(0);
}
