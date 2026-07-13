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
    console.error('[submissions-list] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      subject,
      project_type,
      budget,
      message,
      company_name,
      currency,
      timeline,
      project_type_other,
      additional_notes,
    } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const db = getDb();

    const stmt = db.prepare(`
      INSERT INTO submissions (
        name,
        email,
        phone,
        subject,
        project_type,
        budget,
        message,
        source,
        status,
        company_name,
        currency,
        timeline,
        project_type_other,
        additional_notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      email,
      phone,
      subject || null,
      project_type || null,
      budget || null,
      message || null,
      'website',
      'new',
      company_name || null,
      currency || 'USD',
      timeline || null,
      project_type_other || null,
      additional_notes || null
    );

    db.close();

    return NextResponse.json(
      {
        ok: true,
        id: result.lastInsertRowid,
        message: 'Submission created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[submissions-create] Error:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
