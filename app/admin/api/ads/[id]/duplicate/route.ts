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

export async function POST(
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

    // Get the ad to duplicate
    const original = db.prepare('SELECT * FROM ads WHERE id = ?').get(id) as any;
    if (!original) {
      db.close();
      return NextResponse.json({ ok: false, message: 'Ad not found' }, { status: 404 });
    }

    // Create duplicate with updated title and reset impressions/clicks
    const duplicateTitle = `${original.title} (Copy)`;
    const stmt = db.prepare(`
      INSERT INTO ads (title, body, image, link_url, cta_label, placement, share_caption, variant, status, starts_at, ends_at, sort_order, active, impressions, clicks, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, datetime('now'), datetime('now'))
    `);

    const result = stmt.run(
      duplicateTitle,
      original.body || null,
      original.image || null,
      original.link_url || null,
      original.cta_label || 'Learn more',
      original.placement || 'home_banner',
      original.share_caption || null,
      original.variant || 'gradient',
      'draft', // New copies start as draft
      original.starts_at || null,
      original.ends_at || null,
      original.sort_order || 0,
      0 // New copies start inactive
    );

    const newAd = db.prepare('SELECT * FROM ads WHERE id = ?').get(result.lastInsertRowid);
    db.close();

    console.log('[admin-ads-duplicate] Ad duplicated:', id, 'New ID:', result.lastInsertRowid);

    return NextResponse.json({ ok: true, message: 'Ad duplicated', data: newAd }, { status: 201 });
  } catch (error) {
    console.error('[admin-ads-duplicate] Error:', error);
    return NextResponse.json({ ok: false, message: 'Failed to duplicate ad' }, { status: 500 });
  }
}
