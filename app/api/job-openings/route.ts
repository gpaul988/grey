import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath, { readonly: true });
  db.pragma('journal_mode = WAL');
  return db;
}

/** Public: returns only published, non-expired job openings */
export async function GET(_req: NextRequest) {
  try {
    const db = getDb();

    // Check table exists — if not yet migrated, return empty
    const tableExists = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='job_openings'")
      .get();
    if (!tableExists) {
      db.close();
      return NextResponse.json({ ok: true, data: [] }, { status: 200 });
    }

    const rows = db
      .prepare(
        `SELECT * FROM job_openings
         WHERE status = 'published'
           AND (deadline IS NULL OR deadline >= date('now'))
         ORDER BY created_at DESC`
      )
      .all();
    db.close();

    // Parse JSON array fields
    const parsed = (rows as Record<string, unknown>[]).map((r) => ({
      ...r,
      responsibilities: safeJson(r.responsibilities as string, []),
      requirements: safeJson(r.requirements as string, []),
      nice_to_have: safeJson(r.nice_to_have as string, []),
      benefits: safeJson(r.benefits as string, []),
    }));

    return NextResponse.json({ ok: true, data: parsed }, { status: 200 });
  } catch (err) {
    console.error('[job-openings] GET error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to fetch job openings' }, { status: 500 });
  }
}

function safeJson(val: string, fallback: unknown) {
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}
