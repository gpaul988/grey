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
      return NextResponse.json({ error: 'Invalid ad ID' }, { status: 400 });
    }

    const db = getDb();
    const ad = db.prepare('SELECT * FROM ads WHERE id = ?').get(id);
    db.close();

    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json(ad, { status: 200 });
  } catch (error) {
    console.error('[admin-ads-get] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch ad' }, { status: 500 });
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
      return NextResponse.json({ ok: false, message: 'Invalid ad ID' }, { status: 400 });
    }

    const body = await req.json();
    console.log('[admin-ads-patch] Received update for ID:', id);
    console.log('[admin-ads-patch] Body:', body);

    const db = getDb();

    // Check if ad exists
    const existing = db.prepare('SELECT id FROM ads WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ ok: false, message: 'Ad not found' }, { status: 404 });
    }

    // Build dynamic UPDATE query
    const allowedFields = [
      'title',
      'body',
      'image',
      'link_url',
      'cta_label',
      'placement',
      'share_caption',
      'variant',
      'status',
      'starts_at',
      'ends_at',
      'impressions',
      'clicks',
      'sort_order',
      'active',
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
      return NextResponse.json({ ok: false, message: 'No fields to update' }, { status: 400 });
    }

    // Add updated_at timestamp
    updates.push('updated_at = datetime("now")');
    values.push(id);

    const updateSql = `UPDATE ads SET ${updates.join(', ')} WHERE id = ?`;

    console.log('[admin-ads-patch] Executing update:', updateSql);
    console.log('[admin-ads-patch] Values:', values);

    const stmt = db.prepare(updateSql);
    const result = stmt.run(...values);

    console.log('[admin-ads-patch] Update result:', result);

    const updated = db.prepare('SELECT * FROM ads WHERE id = ?').get(id);
    db.close();

    return NextResponse.json({ ok: true, message: 'Ad updated', data: updated }, { status: 200 });
  } catch (error) {
    console.error('[admin-ads-patch] Error:', error);
    return NextResponse.json({ ok: false, message: 'Failed to update ad' }, { status: 500 });
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
      return NextResponse.json({ ok: false, message: 'Invalid ad ID' }, { status: 400 });
    }

    const db = getDb();

    // Check if ad exists
    const existing = db.prepare('SELECT id FROM ads WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ ok: false, message: 'Ad not found' }, { status: 404 });
    }

    const stmt = db.prepare('DELETE FROM ads WHERE id = ?');
    stmt.run(id);

    console.log('[admin-ads-delete] Ad deleted:', id);

    db.close();
    return NextResponse.json({ ok: true, success: true, message: 'Ad deleted' }, { status: 200 });
  } catch (error) {
    console.error('[admin-ads-delete] Error:', error);
    return NextResponse.json({ ok: false, message: 'Failed to delete ad' }, { status: 500 });
  }
}
