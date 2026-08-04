/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
    }

    const db = getDb();
    const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(id);
    db.close();

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json(submission, { status: 200 });
  } catch (error) {
    console.error('[submissions-get] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
    }

    const body = await req.json();
    const db = getDb();

    // Check if submission exists
    const existing = db.prepare('SELECT id FROM submissions WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Build dynamic UPDATE query
    const allowedFields = [
      'name',
      'email',
      'phone',
      'subject',
      'project_type',
      'budget',
      'message',
      'source',
      'status',
      'company_name',
      'currency',
      'timeline',
      'project_type_other',
      'additional_notes',
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (field in body) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (updates.length === 0) {
      db.close();
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Add timestamp
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const updateSql = `UPDATE submissions SET ${updates.join(', ')} WHERE id = ?`;

    console.log('[submissions-patch] Executing update:', updateSql);
    console.log('[submissions-patch] Values:', values);

    const stmt = db.prepare(updateSql);
    const result = stmt.run(...values);

    console.log('[submissions-patch] Update result:', result);

    const updated = db.prepare('SELECT * FROM submissions WHERE id = ?').get(id);
    db.close();

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[submissions-patch] Error:', error);
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
    }

    const db = getDb();

    // Check if submission exists
    const existing = db.prepare('SELECT id FROM submissions WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const stmt = db.prepare('DELETE FROM submissions WHERE id = ?');
    stmt.run(id);

    console.log('[submissions-delete] Submission deleted:', id);

    db.close();
    return NextResponse.json({ success: true, message: 'Submission deleted' }, { status: 200 });
  } catch (error) {
    console.error('[submissions-delete] Error:', error);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }
}
