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

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    const ads = db.prepare('SELECT * FROM ads ORDER BY sort_order ASC, id DESC').all();
    db.close();

    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error('[admin-ads-list] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const {
      title,
      body: bodyText,
      image,
      link_url,
      cta_label,
      placement,
      share_caption,
      variant,
      status,
      starts_at,
      ends_at,
      sort_order,
      active,
    } = body;

    if (!title) {
      return NextResponse.json({ ok: false, message: 'Title is required' }, { status: 400 });
    }

    const db = getDb();
    
    try {
      const stmt = db.prepare(`
        INSERT INTO ads (title, body, image, link_url, cta_label, placement, share_caption, variant, status, starts_at, ends_at, sort_order, active, impressions, clicks, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, datetime('now'), datetime('now'))
      `);

      const result = stmt.run(
        title,
        bodyText || null,
        image || null,
        link_url || null,
        cta_label || 'Learn more',
        placement || 'home_banner',
        share_caption || null,
        variant || 'gradient',
        status || 'draft',
        starts_at || null,
        ends_at || null,
        sort_order || 0,
        active ? 1 : 0
      );

      const newAd = db.prepare('SELECT * FROM ads WHERE id = ?').get(result.lastInsertRowid);
      db.close();

      return NextResponse.json({ ok: true, message: 'Ad created', data: newAd }, { status: 201 });
    } catch (dbError) {
      db.close();
      throw dbError;
    }
  } catch (error) {
    console.error('[admin-ads-create] Error:', error);
    return NextResponse.json({ ok: false, message: 'Failed to create ad' }, { status: 500 });
  }
}
