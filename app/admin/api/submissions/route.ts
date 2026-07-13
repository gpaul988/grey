import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status');

    const db = getDb();
    let submissions;

    if (status) {
      submissions = db.prepare('SELECT * FROM submissions WHERE status = ? ORDER BY created_at DESC').all(status);
    } else {
      submissions = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
    }

    db.close();

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('[admin-submissions-list] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
