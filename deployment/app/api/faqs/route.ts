import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export const dynamic = 'force-dynamic';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT id, question, answer, category, sort_order
      FROM faqs
      WHERE active = 1
      ORDER BY category ASC, sort_order ASC
    `).all() as { id: number; question: string; answer: string; category: string; sort_order: number }[];
    db.close();

    // Group by category
    const grouped: Record<string, { id: number; question: string; answer: string }[]> = {};
    for (const row of rows) {
      if (!grouped[row.category]) grouped[row.category] = [];
      grouped[row.category].push({ id: row.id, question: row.question, answer: row.answer });
    }

    const categories = Object.entries(grouped).map(([name, items]) => ({ name, items }));

    return NextResponse.json({ success: true, categories, total: rows.length }, { status: 200 });
  } catch (error) {
    console.error('[/api/faqs] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs', categories: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, category = 'General', sortOrder = 0 } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Missing required fields: question, answer' }, { status: 400 });
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO faqs (question, answer, category, sort_order, active)
      VALUES (?, ?, ?, ?, 1)
    `).run(question, answer, category, sortOrder);
    db.close();

    return NextResponse.json({ success: true, faq: { id: result.lastInsertRowid, question, answer, category, sortOrder } }, { status: 201 });
  } catch (error) {
    console.error('[/api/faqs] POST Error:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
