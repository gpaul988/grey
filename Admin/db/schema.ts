import type DatabaseType from 'better-sqlite3';

/**
 * Creates all tables if they do not exist. Idempotent — safe to run on every boot.
 * Accepts the db instance directly to avoid a circular-import race with ./index.
 * Falls back to requiring ./index when called without an argument.
 */
export function migrate(database?: DatabaseType.Database): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const db = database ?? (require('./index') as typeof import('./index')).default;
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      email         TEXT    NOT NULL UNIQUE,
      password_hash TEXT,                              -- NULL = must set via verification link
      role          TEXT    NOT NULL DEFAULT 'staff',  -- superadmin | admin | manager | staff
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

    /* ---- Client portal auth: magic-link login tokens ---- */
    CREATE TABLE IF NOT EXISTS client_tokens (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id   INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      token       TEXT    NOT NULL UNIQUE,
      purpose     TEXT    NOT NULL DEFAULT 'login',   -- login | invite
      used_at     TEXT,
      expires_at  TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_client_tokens_token ON client_tokens(token);

    /* ---- Project brief: what the client wants + design preferences ---- */
    CREATE TABLE IF NOT EXISTS project_briefs (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id     INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      project_id    INTEGER REFERENCES projects(id) ON DELETE SET NULL,
      service       TEXT,
      title         TEXT    NOT NULL,
      goals         TEXT,
      target_audience TEXT,
      design_style  TEXT,
      color_prefs   TEXT,
      references_links TEXT,
      budget_range  TEXT,
      timeline      TEXT,
      details       TEXT,
      status        TEXT    NOT NULL DEFAULT 'submitted', -- submitted | reviewing | accepted | in_progress | done
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    /* ---- Email verification / set-password tokens (team users + clients) ---- */
    CREATE TABLE IF NOT EXISTS email_verifications (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_type  TEXT    NOT NULL,                 -- 'user' | 'client'
      subject_id    INTEGER NOT NULL,
      email         TEXT    NOT NULL,
      token         TEXT    NOT NULL UNIQUE,
      code          TEXT    NOT NULL,                 -- human-readable unique verification ID
      purpose       TEXT    NOT NULL DEFAULT 'verify', -- verify | set_password
      used_at       TEXT,
      expires_at    TEXT    NOT NULL,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);

    /* ---- Client staff sub-accounts (a client company's own team members) ---- */
    CREATE TABLE IF NOT EXISTS client_staff (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id     INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      name          TEXT    NOT NULL,
      email         TEXT    NOT NULL,
      avatar        TEXT,
      password_hash TEXT,
      role_title    TEXT,                              -- free-text job title
      status        TEXT    NOT NULL DEFAULT 'invited', -- invited | active | suspended
      email_verified INTEGER NOT NULL DEFAULT 0,
      last_login    TEXT,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      UNIQUE (client_id, email)
    );
    CREATE INDEX IF NOT EXISTS idx_client_staff_client ON client_staff(client_id);

    /* ---- Conversation participants (client + their invited staff) ---- */
    CREATE TABLE IF NOT EXISTS conversation_participants (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      participant_type TEXT   NOT NULL,                -- 'client' | 'client_staff' | 'staff'
      participant_id  INTEGER NOT NULL,
      name            TEXT,
      added_by        TEXT,
      created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
      UNIQUE (conversation_id, participant_type, participant_id)
    );
    CREATE INDEX IF NOT EXISTS idx_conv_participants_conv ON conversation_participants(conversation_id);

    /* ---- File uploads attached to clients / projects / briefs ---- */
    CREATE TABLE IF NOT EXISTS uploads (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id   INTEGER REFERENCES clients(id) ON DELETE CASCADE,
      project_id  INTEGER REFERENCES projects(id) ON DELETE SET NULL,
      brief_id    INTEGER REFERENCES project_briefs(id) ON DELETE SET NULL,
      uploader    TEXT    NOT NULL DEFAULT 'client',  -- client | staff
      uploader_id INTEGER,
      filename    TEXT    NOT NULL,
      original    TEXT    NOT NULL,
      mime        TEXT,
      size        INTEGER NOT NULL DEFAULT 0,
      url         TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  /* ---------------- Idempotent column migrations ---------------- */
  const addColumnIfMissing = (table: string, column: string, definition: string): void => {
    const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
    if (!cols.some((c) => c.name === column)) {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
  };

  addColumnIfMissing('clients', 'password_hash', 'TEXT');
  addColumnIfMissing('clients', 'status', "TEXT NOT NULL DEFAULT 'active'");
  addColumnIfMissing('clients', 'last_login', 'TEXT');
  // Email-verification state for client portal accounts.
  addColumnIfMissing('clients', 'email_verified', 'INTEGER NOT NULL DEFAULT 0');
  addColumnIfMissing('clients', 'verified_at', 'TEXT');
  // Per-user custom permission overrides (JSON map), beyond the base role.
  addColumnIfMissing('users', 'permissions', 'TEXT');
  // Email-verification state for team accounts. Existing/seeded users are
  // treated as already verified so we never lock anyone out on upgrade.
  addColumnIfMissing('users', 'email_verified', 'INTEGER NOT NULL DEFAULT 0');
  addColumnIfMissing('users', 'verified_at', 'TEXT');
  // Link a conversation to a project for client messaging context.
  addColumnIfMissing('conversations', 'project_id', 'INTEGER');
}
