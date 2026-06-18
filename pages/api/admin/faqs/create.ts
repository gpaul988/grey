import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'better-sqlite3';
import path from 'path';
import { verifyAdminToken } from '@/lib/admin/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verify admin token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = verifyAdminToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (req.method === 'POST') {
      const { question, answer, category = 'General', sort_order = 0, active = 1 } = req.body;

      // Validate inputs
      if (!question || !answer) {
        return res.status(400).json({ error: 'Question and answer are required' });
      }

      const db = new sqlite3(path.join(process.cwd(), 'Admin', 'data', 'grey.db'));
      db.pragma('journal_mode = WAL');

      const stmt = db.prepare(`
        INSERT INTO faqs (question, answer, category, sort_order, active)
        VALUES (?, ?, ?, ?, ?)
      `);

      const result = stmt.run(question, answer, category, sort_order, active ? 1 : 0);

      // Fetch the inserted FAQ
      const getFaqStmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
      const faq = getFaqStmt.get(result.lastInsertRowid);

      db.close();

      return res.status(201).json({ faq, message: 'FAQ created successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Admin FAQ create error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
