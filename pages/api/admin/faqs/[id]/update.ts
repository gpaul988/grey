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

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid FAQ ID' });
    }

    if (req.method === 'PUT') {
      const { question, answer, category, sort_order, active } = req.body;

      const db = new sqlite3(path.join(process.cwd(), 'Admin', 'data', 'grey.db'));
      db.pragma('journal_mode = WAL');

      // Check if FAQ exists
      const checkStmt = db.prepare('SELECT id FROM faqs WHERE id = ?');
      const existing = checkStmt.get(id);

      if (!existing) {
        db.close();
        return res.status(404).json({ error: 'FAQ not found' });
      }

      // Build update query
      const updates: string[] = [];
      const params: any[] = [];

      if (question !== undefined) {
        updates.push('question = ?');
        params.push(question);
      }
      if (answer !== undefined) {
        updates.push('answer = ?');
        params.push(answer);
      }
      if (category !== undefined) {
        updates.push('category = ?');
        params.push(category);
      }
      if (sort_order !== undefined) {
        updates.push('sort_order = ?');
        params.push(sort_order);
      }
      if (active !== undefined) {
        updates.push('active = ?');
        params.push(active ? 1 : 0);
      }

      if (updates.length === 0) {
        db.close();
        return res.status(400).json({ error: 'No fields to update' });
      }

      updates.push("updated_at = datetime('now')");
      params.push(id);

      const updateQuery = `UPDATE faqs SET ${updates.join(', ')} WHERE id = ?`;
      const stmt = db.prepare(updateQuery);
      stmt.run(...params);

      // Fetch updated FAQ
      const getFaqStmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
      const faq = getFaqStmt.get(id);

      db.close();

      return res.status(200).json({ faq, message: 'FAQ updated successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Admin FAQ update error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
