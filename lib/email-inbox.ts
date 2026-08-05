/**
 * Email Inbox Management
 * Handles receiving, storing, and managing email replies using MySQL
 */

import { getMysqlPool } from './db';
import { type Pool as MysqlPool } from 'mysql2/promise';

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

let pool: MysqlPool | null = null;
let tablesInitialized = false;

/**
 * Get MySQL connection pool
 */
function getPool(): MysqlPool {
  if (!pool) {
    pool = getMysqlPool();
  }
  return pool;
}

/**
 * Initialize email tables (MySQL)
 */
async function initializeEmailTables(): Promise<void> {
  if (tablesInitialized) return;

  const connection = await getPool().getConnection();
  try {
    // Email log table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS email_log (
        id VARCHAR(255) PRIMARY KEY,
        to_email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        status VARCHAR(50) NOT NULL DEFAULT 'sent',
        message_id VARCHAR(255) UNIQUE,
        error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        retry_count INT DEFAULT 0,
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      )
    `);

    // Email inbox table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS email_inbox (
        id VARCHAR(255) PRIMARY KEY,
        message_id VARCHAR(255) UNIQUE NOT NULL,
        from_email VARCHAR(255) NOT NULL,
        to_email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        body LONGTEXT,
        html_body LONGTEXT,
        status VARCHAR(50) DEFAULT 'unread',
        category VARCHAR(50) DEFAULT 'other',
        submission_id INT,
        is_reply BOOLEAN DEFAULT 0,
        reply_to_message_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_submission (submission_id),
        INDEX idx_created (created_at)
      )
    `);

    // Email threads table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS email_threads (
        id VARCHAR(255) PRIMARY KEY,
        submission_id INT NOT NULL,
        subject VARCHAR(500),
        participant_email VARCHAR(255),
        message_count INT DEFAULT 0,
        last_message_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_submission (submission_id),
        INDEX idx_status (status)
      )
    `);

    tablesInitialized = true;
    console.log('[EMAIL_INBOX] MySQL tables initialized');
  } catch (error) {
    console.error('[EMAIL_INBOX] Failed to initialize tables:', error);
  } finally {
    connection.release();
  }
}

// Initialize tables on module load
initializeEmailTables().catch(console.error);

/**
 * Log sent email
 */
export function logSentEmail(options: {
  to: string;
  subject?: string;
  messageId?: string;
  error?: string;
}): void {
  const id = `sent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const status = options.error ? 'failed' : 'sent';

  getPool()
    .query(
      `INSERT INTO email_log (id, to_email, subject, message_id, status, error)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, options.to, options.subject || '', options.messageId || null, status, options.error || null]
    )
    .catch((err) => console.error('[EMAIL_LOG] Insert error:', err));

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
  const id = `inbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const isReply = !!options.replyToMessageId;

  getPool()
    .query(
      `INSERT INTO email_inbox (id, message_id, from_email, to_email, subject, body, html_body, is_reply, reply_to_message_id, submission_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        options.messageId,
        options.from,
        options.to,
        options.subject,
        options.body,
        options.htmlBody || null,
        isReply ? 1 : 0,
        options.replyToMessageId || null,
        options.submissionId || null,
      ]
    )
    .catch((err) => console.error('[EMAIL_INBOX] Insert error:', err));

  if (options.submissionId) {
    updateEmailThread(options.submissionId, options.from, options.subject);
  }

  console.log(`[EMAIL_INBOX] Received email from ${options.from} | ID: ${id}`);
  return id;
}

/**
 * Get inbox emails with optional filters
 */
export function getInboxEmails(filters?: { status?: string; category?: string; limit?: number }): EmailInbox[] {
  const limit = filters?.limit || 50;
  let query = 'SELECT * FROM email_inbox WHERE 1=1';
  const params: any[] = [];

  if (filters?.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters?.category) {
    query += ' AND category = ?';
    params.push(filters.category);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);

  const result: EmailInbox[] = [];
  getPool()
    .query(query, params)
    .then(([rows]) => {
      (rows as any[]).forEach((row: any) => {
        result.push({
          id: row.id,
          messageId: row.message_id,
          from: row.from_email,
          to: row.to_email,
          subject: row.subject,
          body: row.body,
          htmlBody: row.html_body,
          status: row.status,
          category: row.category,
          submissionId: row.submission_id,
          isReply: !!row.is_reply,
          replyToMessageId: row.reply_to_message_id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        });
      });
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  return result;
}

/**
 * Mark email as read
 */
export function markEmailAsRead(emailId: string): void {
  getPool()
    .query('UPDATE email_inbox SET status = ?, updated_at = NOW() WHERE id = ?', ['read', emailId])
    .catch((err) => console.error('[EMAIL_INBOX] Update error:', err));

  console.log(`[EMAIL_INBOX] Marked ${emailId} as read`);
}

/**
 * Categorize email
 */
export function categorizeEmail(emailId: string, category: 'submission' | 'support' | 'billing' | 'other'): void {
  getPool()
    .query('UPDATE email_inbox SET category = ?, updated_at = NOW() WHERE id = ?', [category, emailId])
    .catch((err) => console.error('[EMAIL_INBOX] Update error:', err));

  console.log(`[EMAIL_INBOX] Categorized ${emailId} as ${category}`);
}

/**
 * Link email to submission
 */
export function linkEmailToSubmission(emailId: string, submissionId: number): void {
  getPool()
    .query('UPDATE email_inbox SET submission_id = ?, updated_at = NOW() WHERE id = ?', [submissionId, emailId])
    .catch((err) => console.error('[EMAIL_INBOX] Update error:', err));

  console.log(`[EMAIL_INBOX] Linked ${emailId} to submission #${submissionId}`);
}

/**
 * Update email thread
 */
export function updateEmailThread(submissionId: number, participantEmail: string, subject: string): void {
  const id = `thread-${submissionId}-${participantEmail}`;

  getPool()
    .query(
      `INSERT INTO email_threads (id, submission_id, subject, participant_email, message_count, last_message_at, status)
       VALUES (?, ?, ?, ?, 1, NOW(), 'open')
       ON DUPLICATE KEY UPDATE
       message_count = message_count + 1,
       last_message_at = NOW(),
       updated_at = NOW()`,
      [id, submissionId, subject, participantEmail]
    )
    .catch((err) => console.error('[EMAIL_THREADS] Insert error:', err));
}

/**
 * Get email thread for submission
 */
export function getEmailThread(submissionId: number) {
  const thread: any[] = [];
  const emails: EmailInbox[] = [];

  getPool()
    .query('SELECT * FROM email_threads WHERE submission_id = ?', [submissionId])
    .then(([rows]) => {
      thread.push(...(rows as any[]));
    })
    .catch((err) => console.error('[EMAIL_THREADS] Query error:', err));

  getPool()
    .query('SELECT * FROM email_inbox WHERE submission_id = ? ORDER BY created_at ASC', [submissionId])
    .then(([rows]) => {
      (rows as any[]).forEach((row: any) => {
        emails.push({
          id: row.id,
          messageId: row.message_id,
          from: row.from_email,
          to: row.to_email,
          subject: row.subject,
          body: row.body,
          htmlBody: row.html_body,
          status: row.status,
          category: row.category,
          submissionId: row.submission_id,
          isReply: !!row.is_reply,
          replyToMessageId: row.reply_to_message_id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        });
      });
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  return { thread, emails };
}

/**
 * Get unread email count
 */
export function getUnreadEmailCount(): number {
  let count = 0;

  getPool()
    .query("SELECT COUNT(*) as count FROM email_inbox WHERE status = 'unread'")
    .then(([rows]: any) => {
      count = rows[0]?.count || 0;
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  return count;
}

/**
 * Delete email
 */
export function deleteEmail(emailId: string): void {
  getPool()
    .query('UPDATE email_inbox SET status = ?, updated_at = NOW() WHERE id = ?', ['deleted', emailId])
    .catch((err) => console.error('[EMAIL_INBOX] Update error:', err));

  console.log(`[EMAIL_INBOX] Deleted ${emailId}`);
}

/**
 * Archive email
 */
export function archiveEmail(emailId: string): void {
  getPool()
    .query('UPDATE email_inbox SET status = ?, updated_at = NOW() WHERE id = ?', ['archived', emailId])
    .catch((err) => console.error('[EMAIL_INBOX] Update error:', err));

  console.log(`[EMAIL_INBOX] Archived ${emailId}`);
}

/**
 * Search emails
 */
export function searchEmails(query: string): EmailInbox[] {
  const searchPattern = `%${query}%`;
  const result: EmailInbox[] = [];

  getPool()
    .query(
      `SELECT * FROM email_inbox
       WHERE subject LIKE ? OR body LIKE ? OR from_email LIKE ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [searchPattern, searchPattern, searchPattern]
    )
    .then(([rows]) => {
      (rows as any[]).forEach((row: any) => {
        result.push({
          id: row.id,
          messageId: row.message_id,
          from: row.from_email,
          to: row.to_email,
          subject: row.subject,
          body: row.body,
          htmlBody: row.html_body,
          status: row.status,
          category: row.category,
          submissionId: row.submission_id,
          isReply: !!row.is_reply,
          replyToMessageId: row.reply_to_message_id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        });
      });
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  return result;
}

/**
 * Get email statistics
 */
export function getEmailStats(): {
  received: number;
  unread: number;
  sent: number;
  failed: number;
} {
  const stats = {
    received: 0,
    unread: 0,
    sent: 0,
    failed: 0,
  };

  // Query stats asynchronously
  getPool()
    .query('SELECT COUNT(*) as count FROM email_inbox')
    .then(([rows]: any) => {
      stats.received = rows[0]?.count || 0;
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  getPool()
    .query("SELECT COUNT(*) as count FROM email_inbox WHERE status = 'unread'")
    .then(([rows]: any) => {
      stats.unread = rows[0]?.count || 0;
    })
    .catch((err) => console.error('[EMAIL_INBOX] Query error:', err));

  getPool()
    .query("SELECT COUNT(*) as count FROM email_log WHERE status = 'sent'")
    .then(([rows]: any) => {
      stats.sent = rows[0]?.count || 0;
    })
    .catch((err) => console.error('[EMAIL_LOG] Query error:', err));

  getPool()
    .query("SELECT COUNT(*) as count FROM email_log WHERE status = 'failed'")
    .then(([rows]: any) => {
      stats.failed = rows[0]?.count || 0;
    })
    .catch((err) => console.error('[EMAIL_LOG] Query error:', err));

  return stats;
}

export default {
  getPool,
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
