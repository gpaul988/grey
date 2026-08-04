/**
 * Email Inbox Management
 * Handles receiving, storing, and managing email replies
 */

import Database from 'better-sqlite3';
import path from 'path';

export interface EmailInbox {
  id: string;
  messageId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  htmlBody?: string;
  status: 'unread' | 'read' | 'archived' | 'deleted';
  category: 'submission' | 'support' | 'billing' | 'other';
  submissionId?: number;
  isReply: boolean;
  replyToMessageId?: string;
  createdAt: string;
  updatedAt: string;
}

let db: Database.Database | null = null;

/**
 * Get database connection
 */
function getDb(): Database.Database {
  if (db) return db;

  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Initialize email tables
  initializeEmailTables();

  return db;
}

/**
 * Initialize email tables
 */
function initializeEmailTables(): void {
  const database = getDb();

  // Email log table
  database.exec(`
    CREATE TABLE IF NOT EXISTS email_log (
      id TEXT PRIMARY KEY,
      to_email TEXT NOT NULL,
      subject TEXT,
      status TEXT NOT NULL DEFAULT 'sent',
      message_id TEXT UNIQUE,
      error TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      retry_count INT DEFAULT 0
    )
  `);

  // Email inbox table (for received replies)
  database.exec(`
    CREATE TABLE IF NOT EXISTS email_inbox (
      id TEXT PRIMARY KEY,
      message_id TEXT UNIQUE NOT NULL,
      from_email TEXT NOT NULL,
      to_email TEXT NOT NULL,
      subject TEXT,
      body TEXT,
      html_body TEXT,
      status TEXT DEFAULT 'unread',
      category TEXT DEFAULT 'other',
      submission_id INT,
      is_reply BOOLEAN DEFAULT 0,
      reply_to_message_id TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (submission_id) REFERENCES submissions(id)
    )
  `);

  // Email threads table
  database.exec(`
    CREATE TABLE IF NOT EXISTS email_threads (
      id TEXT PRIMARY KEY,
      submission_id INT NOT NULL,
      subject TEXT,
      participant_email TEXT,
      message_count INT DEFAULT 0,
      last_message_at DATETIME,
      status TEXT DEFAULT 'open',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (submission_id) REFERENCES submissions(id)
    )
  `);
}

/**
 * Log sent email
 */
export function logSentEmail(options: {
  to: string;
  subject?: string;
  messageId?: string;
  error?: string;
}): void {
  const db = getDb();
  const id = `sent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const stmt = db.prepare(`
    INSERT INTO email_log (id, to_email, subject, message_id, status, error)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    options.to,
    options.subject || '',
    options.messageId || null,
    options.error ? 'failed' : 'sent',
    options.error || null,
  );

  console.log(`[EMAIL_LOG] Logged email to ${options.to} | ID: ${id}`);
}

/**
 * Log received email (reply)
 */
export function logReceivedEmail(options: {
  messageId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  htmlBody?: string;
  submissionId?: number;
  replyToMessageId?: string;
}): string {
  const db = getDb();
  const id = `inbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const isReply = !!options.replyToMessageId;

  const stmt = db.prepare(`
    INSERT INTO email_inbox (
      id, message_id, from_email, to_email, subject, body, html_body,
      status, category, submission_id, is_reply, reply_to_message_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 'unread', 'other', ?, ?, ?)
  `);

  stmt.run(
    id,
    options.messageId,
    options.from,
    options.to,
    options.subject,
    options.body,
    options.htmlBody || null,
    options.submissionId || null,
    isReply ? 1 : 0,
    options.replyToMessageId || null,
  );

  console.log(`[EMAIL_INBOX] Received email from ${options.from} | ID: ${id}`);

  // Link to submission if available
  if (options.submissionId) {
    updateEmailThread(options.submissionId, options.from, options.subject);
  }

  return id;
}

/**
 * Get inbox emails
 */
export function getInboxEmails(filters?: { status?: string; category?: string; limit?: number }): EmailInbox[] {
  const db = getDb();

  let query = 'SELECT * FROM email_inbox';
  const params: any[] = [];

  if (filters?.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters?.category) {
    query += ' AND category = ?';
    params.push(filters.category);
  }

  query += ' ORDER BY created_at DESC';

  if (filters?.limit) {
    query += ' LIMIT ?';
    params.push(filters.limit);
  }

  const stmt = db.prepare(query);
  return stmt.all(...params) as EmailInbox[];
}

/**
 * Mark email as read
 */
export function markEmailAsRead(emailId: string): void {
  const db = getDb();

  const stmt = db.prepare(`
    UPDATE email_inbox
    SET status = 'read', updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(emailId);
  console.log(`[EMAIL_INBOX] Marked ${emailId} as read`);
}

/**
 * Categorize email
 */
export function categorizeEmail(emailId: string, category: 'submission' | 'support' | 'billing' | 'other'): void {
  const db = getDb();

  const stmt = db.prepare(`
    UPDATE email_inbox
    SET category = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(category, emailId);
  console.log(`[EMAIL_INBOX] Categorized ${emailId} as ${category}`);
}

/**
 * Link email to submission
 */
export function linkEmailToSubmission(emailId: string, submissionId: number): void {
  const db = getDb();

  const stmt = db.prepare(`
    UPDATE email_inbox
    SET submission_id = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(submissionId, emailId);
  console.log(`[EMAIL_INBOX] Linked ${emailId} to submission #${submissionId}`);
}

/**
 * Update email thread
 */
export function updateEmailThread(submissionId: number, participantEmail: string, subject: string): void {
  const db = getDb();

  // Check if thread exists
  const existing = db.prepare(`
    SELECT id FROM email_threads WHERE submission_id = ? AND participant_email = ?
  `).get(submissionId, participantEmail);

  if (existing) {
    // Update existing thread
    const stmt = db.prepare(`
      UPDATE email_threads
      SET message_count = message_count + 1,
          last_message_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE submission_id = ? AND participant_email = ?
    `);
    stmt.run(submissionId, participantEmail);
  } else {
    // Create new thread
    const id = `thread-${submissionId}-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT INTO email_threads (id, submission_id, subject, participant_email, message_count, last_message_at)
      VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    `);
    stmt.run(id, submissionId, subject, participantEmail);
  }
}

/**
 * Get email thread for submission
 */
export function getEmailThread(submissionId: number) {
  const db = getDb();

  const thread = db.prepare(`
    SELECT * FROM email_threads WHERE submission_id = ?
  `).all(submissionId);

  const emails = db.prepare(`
    SELECT * FROM email_inbox WHERE submission_id = ? ORDER BY created_at ASC
  `).all(submissionId) as EmailInbox[];

  return { thread, emails };
}

/**
 * Get unread email count
 */
export function getUnreadEmailCount(): number {
  const db = getDb();

  const result = db.prepare(`
    SELECT COUNT(*) as count FROM email_inbox WHERE status = 'unread'
  `).get() as { count: number };

  return result.count;
}

/**
 * Delete email
 */
export function deleteEmail(emailId: string): void {
  const db = getDb();

  const stmt = db.prepare(`
    UPDATE email_inbox
    SET status = 'deleted', updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(emailId);
  console.log(`[EMAIL_INBOX] Deleted ${emailId}`);
}

/**
 * Archive email
 */
export function archiveEmail(emailId: string): void {
  const db = getDb();

  const stmt = db.prepare(`
    UPDATE email_inbox
    SET status = 'archived', updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(emailId);
  console.log(`[EMAIL_INBOX] Archived ${emailId}`);
}

/**
 * Search emails
 */
export function searchEmails(query: string): EmailInbox[] {
  const db = getDb();

  const searchPattern = `%${query}%`;

  const stmt = db.prepare(`
    SELECT * FROM email_inbox
    WHERE subject LIKE ? OR body LIKE ? OR from_email LIKE ?
    ORDER BY created_at DESC
    LIMIT 50
  `);

  return stmt.all(searchPattern, searchPattern, searchPattern) as EmailInbox[];
}

/**
 * Get email statistics
 */
export function getEmailStats() {
  const db = getDb();

  const total = db.prepare('SELECT COUNT(*) as count FROM email_inbox').get() as { count: number };
  const unread = db.prepare("SELECT COUNT(*) as count FROM email_inbox WHERE status = 'unread'").get() as {
    count: number;
  };
  const sent = db.prepare("SELECT COUNT(*) as count FROM email_log WHERE status = 'sent'").get() as { count: number };
  const failed = db.prepare("SELECT COUNT(*) as count FROM email_log WHERE status = 'failed'").get() as {
    count: number;
  };

  return {
    received: total.count,
    unread: unread.count,
    sent: sent.count,
    failed: failed.count,
  };
}

export default {
  getDb,
  logSentEmail,
  logReceivedEmail,
  getInboxEmails,
  markEmailAsRead,
  categorizeEmail,
  linkEmailToSubmission,
  updateEmailThread,
  getEmailThread,
  getUnreadEmailCount,
  deleteEmail,
  archiveEmail,
  searchEmails,
  getEmailStats,
};
