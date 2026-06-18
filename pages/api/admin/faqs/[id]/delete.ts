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

    if (req.method === 'DELETE') {
      const db = new sqlite3(path.join(process.cwd(), 'Admin', 'data', 'grey.db'));
      db.pragma('journal_mode = WAL');

      // Check if FAQ exists
      const checkStmt = db.prepare('SELECT id FROM faqs WHERE id = ?');
      const existing = checkStmt.get(id);

      if (!existing) {
        db.close();
        return res.status(404).json({ error: 'FAQ not found' });
      }

      // Delete FAQ
      const deleteStmt = db.prepare('DELETE FROM faqs WHERE id = ?');
      deleteStmt.run(id);

      db.close();

      return res.status(200).json({ message: 'FAQ deleted successfully' });
    }

    // Soft delete (mark as inactive) for GET
    if (req.method === 'GET') {
      const db = new sqlite3(path.join(process.cwd(), 'Admin', 'data', 'grey.db'));
      db.pragma('journal_mode = WAL');

      const getFaqStmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
      const faq = getFaqStmt.get(id);

      db.close();

      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }

      return res.status(200).json({ faq });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Admin FAQ delete error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
