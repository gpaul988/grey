import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'better-sqlite3';
import path from 'path';
import { verifyAdminToken } from '@/lib/admin/auth';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  active: number;
  created_at: string;
}

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

    if (req.method === 'GET') {
      // List FAQs with filters
      const { category, search, limit = '50', offset = '0', active = '1' } = req.query;

      const db = new sqlite3(path.join(process.cwd(), 'Admin', 'data', 'grey.db'));
      db.pragma('journal_mode = WAL');

      let query = 'SELECT * FROM faqs WHERE 1=1';
      const params: any[] = [];

      // Filter by active status
      if (active === '1' || active === '0') {
        query += ' AND active = ?';
        params.push(active === '1' ? 1 : 0);
      }

      // Filter by category
      if (category && typeof category === 'string') {
        query += ' AND category = ?';
        params.push(category);
      }

      // Search in question and answer
      if (search && typeof search === 'string') {
        const searchTerm = `%${search}%`;
        query += ' AND (question LIKE ? OR answer LIKE ?)';
        params.push(searchTerm, searchTerm);
      }

      // Count total
      const countStmt = db.prepare(`SELECT COUNT(*) as count FROM (${query})`);
      const { count: total } = countStmt.get(...params) as { count: number };

      // Get paginated results
      const limitNum = Math.min(parseInt(limit as string) || 50, 500);
      const offsetNum = parseInt(offset as string) || 0;

      query += ' ORDER BY sort_order ASC, id ASC LIMIT ? OFFSET ?';
      params.push(limitNum, offsetNum);

      const stmt = db.prepare(query);
      const faqs = stmt.all(...params) as FaqItem[];

      // Get all categories
      const catStmt = db.prepare(`SELECT DISTINCT category FROM faqs WHERE active = 1 ORDER BY category`);
      const categories = (catStmt.all() as any[]).map(row => row.category);

      db.close();

      return res.status(200).json({
        faqs,
        categories,
        total,
        count: faqs.length,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + faqs.length < total,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Admin FAQs list error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
