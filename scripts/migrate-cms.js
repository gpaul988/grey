#!/usr/bin/env node

/**
 * Create CMS table in SQLite if it doesn't exist
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../Admin/data/grey.db');
const db = new Database(dbPath);

// Enable foreign keys and WAL
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

const sql = `
CREATE TABLE IF NOT EXISTS cms_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT NOT NULL CHECK(type IN ('blog', 'doc', 'service', 'page')),
  author TEXT,
  tags JSON DEFAULT '[]',
  published BOOLEAN DEFAULT 0,
  published_at DATETIME,
  featured_image TEXT,
  metadata JSON DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_type ON cms_pages(type);
CREATE INDEX IF NOT EXISTS idx_cms_pages_published ON cms_pages(published);
CREATE INDEX IF NOT EXISTS idx_cms_pages_created ON cms_pages(created_at);
`;

try {
  db.exec(sql);
  console.log('✅ CMS tables created successfully');
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exit(1);
} finally {
  db.close();
}
