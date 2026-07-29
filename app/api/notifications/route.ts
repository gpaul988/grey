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
    const db = getDb();
    
    // Ensure table exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        entity_type TEXT,
        entity_id INTEGER,
        related_data TEXT,
        status TEXT NOT NULL DEFAULT 'unread',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
      CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);
    `);
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || null;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 1000);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build query
    let query = 'SELECT * FROM notifications WHERE 1=1';
    const params: (string | number)[] = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    // Fetch notifications
    const notifications = db.prepare(query).all(...params) as any[];
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM notifications WHERE 1=1';
    const countParams: (string | number)[] = [];
    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }
    
    const countResult = db.prepare(countQuery).get(...countParams) as { count: number };
    const total = countResult.count;
    
    db.close();
    
    return NextResponse.json({
      ok: true,
      data: notifications,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('[GET /api/notifications] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const db = getDb();
    
    // Ensure table exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        entity_type TEXT,
        entity_id INTEGER,
        related_data TEXT,
        status TEXT NOT NULL DEFAULT 'unread',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    
    // Get the notification ID from URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Invalid notification ID' },
        { status: 400 }
      );
    }
    
    // Check if notification exists
    const notif = db.prepare('SELECT * FROM notifications WHERE id = ?').get(parseInt(id));
    if (!notif) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Notification not found' },
        { status: 404 }
      );
    }
    
    // Delete notification
    db.prepare('DELETE FROM notifications WHERE id = ?').run(parseInt(id));
    db.close();
    
    return NextResponse.json({
      ok: true,
      message: 'Notification deleted successfully',
      data: { id: parseInt(id), deleted: true },
    });
  } catch (error) {
    console.error('[DELETE /api/notifications] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = getDb();
    
    // Ensure table exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        entity_type TEXT,
        entity_id INTEGER,
        related_data TEXT,
        status TEXT NOT NULL DEFAULT 'unread',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    
    // Get the notification ID from URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Invalid notification ID' },
        { status: 400 }
      );
    }
    
    // Get the body
    const body = await req.json().catch(() => ({}));
    const { status } = body;
    
    if (!status) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Status field is required' },
        { status: 400 }
      );
    }
    
    // Validate status
    if (!['read', 'unread'].includes(status)) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Check if notification exists
    const notif = db.prepare('SELECT * FROM notifications WHERE id = ?').get(parseInt(id));
    if (!notif) {
      db.close();
      return NextResponse.json(
        { ok: false, message: 'Notification not found' },
        { status: 404 }
      );
    }
    
    // Update notification
    db.prepare('UPDATE notifications SET status = ? WHERE id = ?').run(status, parseInt(id));
    const updated = db.prepare('SELECT * FROM notifications WHERE id = ?').get(parseInt(id));
    db.close();
    
    return NextResponse.json({
      ok: true,
      message: 'Notification updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('[PATCH /api/notifications] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
