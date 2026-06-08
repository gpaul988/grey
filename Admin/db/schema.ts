import db from './index';

/**
 * Creates all tables if they do not exist. Idempotent — safe to run on every boot.
 */
export function migrate(): void {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      email         TEXT    NOT NULL UNIQUE,
      password_hash TEXT    NOT NULL,
      role          TEXT    NOT NULL DEFAULT 'staff',  -- admin | manager | staff
      avatar        TEXT,
      phone         TEXT,
      status        TEXT    NOT NULL DEFAULT 'active',  -- active | suspended
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      email        TEXT    NOT NULL,
      phone        TEXT,
      subject      TEXT,
      project_type TEXT,
      budget       TEXT,
      message      TEXT,
      source       TEXT    NOT NULL DEFAULT 'website',
      status       TEXT    NOT NULL DEFAULT 'new',  -- new | read | replied | archived | spam
      created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL,
      company     TEXT,
      phone       TEXT,
      source      TEXT    NOT NULL DEFAULT 'website', -- website | referral | social | ads | other
      stage       TEXT    NOT NULL DEFAULT 'new',     -- new | contacted | qualified | proposal | won | lost
      value       REAL    NOT NULL DEFAULT 0,
      owner_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
      notes       TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS clients (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL UNIQUE,
      company     TEXT,
      phone       TEXT,
      avatar      TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      client_id    INTEGER REFERENCES clients(id) ON DELETE SET NULL,
      client_name  TEXT,
      status       TEXT    NOT NULL DEFAULT 'planning', -- planning | active | on_hold | completed | cancelled
      progress     INTEGER NOT NULL DEFAULT 0,
      budget       REAL    NOT NULL DEFAULT 0,
      start_date   TEXT,
      end_date     TEXT,
      description  TEXT,
      manager_id   INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      subject      TEXT    NOT NULL,
      requester    TEXT    NOT NULL,
      requester_email TEXT,
      priority     TEXT    NOT NULL DEFAULT 'medium', -- low | medium | high | urgent
      status       TEXT    NOT NULL DEFAULT 'open',   -- open | pending | resolved | closed
      assignee_id  INTEGER REFERENCES users(id) ON DELETE SET NULL,
      body         TEXT,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ticket_messages (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id  INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      author     TEXT    NOT NULL,
      is_staff   INTEGER NOT NULL DEFAULT 1,
      body       TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      number       TEXT    NOT NULL UNIQUE,
      client_id    INTEGER REFERENCES clients(id) ON DELETE SET NULL,
      client_name  TEXT    NOT NULL,
      client_email TEXT,
      amount       REAL    NOT NULL DEFAULT 0,
      tax          REAL    NOT NULL DEFAULT 0,
      total        REAL    NOT NULL DEFAULT 0,
      currency     TEXT    NOT NULL DEFAULT 'NGN',
      status       TEXT    NOT NULL DEFAULT 'draft', -- draft | sent | paid | overdue | cancelled
      issued_date  TEXT,
      due_date     TEXT,
      items        TEXT    NOT NULL DEFAULT '[]',     -- JSON array of line items
      notes        TEXT,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS case_studies (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      slug        TEXT    NOT NULL UNIQUE,
      client      TEXT,
      industry    TEXT,
      summary     TEXT,
      body        TEXT,
      image       TEXT,
      results     TEXT,
      published   INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      title        TEXT    NOT NULL,
      slug         TEXT    NOT NULL UNIQUE,
      excerpt      TEXT,
      body         TEXT,
      cover        TEXT,
      author       TEXT    NOT NULL DEFAULT 'Grey InfoTech',
      tags         TEXT    NOT NULL DEFAULT '[]', -- JSON array
      status       TEXT    NOT NULL DEFAULT 'draft', -- draft | published
      published_at TEXT,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id   INTEGER REFERENCES clients(id) ON DELETE CASCADE,
      subject     TEXT,
      last_message TEXT,
      unread      INTEGER NOT NULL DEFAULT 0,
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      sender          TEXT    NOT NULL,           -- 'client' | 'staff'
      sender_name     TEXT,
      body            TEXT    NOT NULL,
      created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS activity_log (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
      user_name  TEXT,
      action     TEXT    NOT NULL,
      entity     TEXT,
      entity_id  INTEGER,
      detail     TEXT,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
    CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
    CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
    CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
    CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);
  `);
}
