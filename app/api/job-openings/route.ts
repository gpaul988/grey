import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

function getDb(readonly = false) {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath, { readonly });
  db.pragma('journal_mode = WAL');
  if (!readonly) db.pragma('foreign_keys = ON');
  return db;
}

function safeJson(val: string | null, fallback: unknown) {
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}

function toJsonArr(v: unknown): string {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === 'string') {
    try {
      return JSON.stringify(JSON.parse(v));
    } catch {
      return JSON.stringify(v.split('\n').map((s: string) => s.trim()).filter(Boolean));
    }
  }
  return '[]';
}

/** Public: returns only published, non-expired job openings */
export async function GET(req: NextRequest) {
  try {
    const db = getDb(true);

    // Check table exists — if not yet migrated, return empty
    const tableExists = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='job_openings'")
      .get();
    if (!tableExists) {
      db.close();
      return NextResponse.json({ ok: true, data: [] }, { status: 200 });
    }

    // Check if admin token provided to return all
    const authHeader = req.headers.get('authorization') || '';
    const isAdmin = authHeader.startsWith('Bearer admin-');
    
    const query = isAdmin
      ? 'SELECT * FROM job_openings ORDER BY created_at DESC'
      : `SELECT * FROM job_openings
         WHERE status = 'published'
           AND (deadline IS NULL OR deadline >= date('now'))
         ORDER BY created_at DESC`;

    const rows = db.prepare(query).all();
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

/** Admin: Create new job opening */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer admin-')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, department, location, type, experience_level, salary_range, description, responsibilities, requirements, nice_to_have, benefits, status, deadline } = body;

    if (!title) {
      return NextResponse.json({ ok: false, error: 'Title is required' }, { status: 400 });
    }

    const db = getDb(false);
    
    const stmt = db.prepare(`
      INSERT INTO job_openings (
        title, department, location, type, experience_level, salary_range, description,
        responsibilities, requirements, nice_to_have, benefits, status, deadline, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);

    const result = stmt.run(
      title,
      department || '',
      location || 'Remote',
      type || 'full-time',
      experience_level || '',
      salary_range || '',
      description || '',
      toJsonArr(responsibilities),
      toJsonArr(requirements),
      toJsonArr(nice_to_have),
      toJsonArr(benefits),
      status || 'draft',
      deadline || null
    );

    db.close();

    return NextResponse.json({ ok: true, data: { id: result.lastInsertRowid }, message: 'Job opening created' }, { status: 201 });
  } catch (err) {
    console.error('[job-openings] POST error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to create job opening' }, { status: 500 });
  }
}

/** Admin: Update job opening */
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer admin-')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
    }

    const body = await req.json();
    const db = getDb(false);

    // Check if job exists
    const existing = db.prepare('SELECT id FROM job_openings WHERE id = ?').get(parseInt(id));
    if (!existing) {
      db.close();
      return NextResponse.json({ ok: false, error: 'Job opening not found' }, { status: 404 });
    }

    const {
      title, department, location, type, experience_level, salary_range, description,
      responsibilities, requirements, nice_to_have, benefits, status, deadline
    } = body;

    const updates: string[] = [];
    const values: unknown[] = [];

    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (department !== undefined) { updates.push('department = ?'); values.push(department); }
    if (location !== undefined) { updates.push('location = ?'); values.push(location); }
    if (type !== undefined) { updates.push('type = ?'); values.push(type); }
    if (experience_level !== undefined) { updates.push('experience_level = ?'); values.push(experience_level); }
    if (salary_range !== undefined) { updates.push('salary_range = ?'); values.push(salary_range); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (responsibilities !== undefined) { updates.push('responsibilities = ?'); values.push(toJsonArr(responsibilities)); }
    if (requirements !== undefined) { updates.push('requirements = ?'); values.push(toJsonArr(requirements)); }
    if (nice_to_have !== undefined) { updates.push('nice_to_have = ?'); values.push(toJsonArr(nice_to_have)); }
    if (benefits !== undefined) { updates.push('benefits = ?'); values.push(toJsonArr(benefits)); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }
    if (deadline !== undefined) { updates.push('deadline = ?'); values.push(deadline || null); }

    if (updates.length === 0) {
      db.close();
      return NextResponse.json({ ok: true, message: 'No updates provided' }, { status: 200 });
    }

    values.push(parseInt(id));
    const query = `UPDATE job_openings SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(query).run(...values);
    db.close();

    return NextResponse.json({ ok: true, message: 'Job opening updated' }, { status: 200 });
  } catch (err) {
    console.error('[job-openings] PUT error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to update job opening' }, { status: 500 });
  }
}

/** Admin: Delete job opening */
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer admin-')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
    }

    const db = getDb(false);

    // Check if job exists
    const existing = db.prepare('SELECT id FROM job_openings WHERE id = ?').get(parseInt(id));
    if (!existing) {
      db.close();
      return NextResponse.json({ ok: false, error: 'Job opening not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM job_openings WHERE id = ?').run(parseInt(id));
    db.close();

    return NextResponse.json({ ok: true, message: 'Job opening deleted' }, { status: 200 });
  } catch (err) {
    console.error('[job-openings] DELETE error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to delete job opening' }, { status: 500 });
  }
}
