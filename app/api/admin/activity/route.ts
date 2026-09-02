import { NextRequest, NextResponse } from 'next/server';
import { Activity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest) {
  const sess = await getServerSession(request);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'view_activity')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    const url = new URL(request.url);
    const q = url.searchParams;

    const limitParam = Number(q.get('limit') || '50');
    const pageParam = Number(q.get('page') || '1');
    const actionFilter = q.get('action');
    const entityFilter = q.get('entity');
    const userFilter = q.get('user');
    const since = q.get('since'); // ISO date string
    const until = q.get('until'); // ISO date string

    const limit = Number.isFinite(limitParam) ? Math.min(200, Math.max(1, limitParam)) : 50;
    const page = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
    const offset = (page - 1) * limit;

    // Build WHERE clause and params safely
    const where: string[] = [];
    const params: any[] = [];

    if (actionFilter) { where.push('action = ?'); params.push(actionFilter); }
    if (entityFilter) { where.push('entity = ?'); params.push(entityFilter); }
    if (userFilter) { where.push('user_name LIKE ?'); params.push(`%${userFilter}%`); }
    if (since) { where.push("datetime(created_at) >= datetime(?)"); params.push(since); }
    if (until) { where.push("datetime(created_at) <= datetime(?)"); params.push(until); }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const totalRow = Activity.raw.prepare(`SELECT COUNT(*) AS c FROM activity_log ${whereSql}`).get(...params) as { c: number };
    const total = totalRow ? totalRow.c : 0;

    const rows = Activity.raw.prepare(`SELECT * FROM activity_log ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);

    return NextResponse.json({ ok: true, data: rows, meta: { total, page, per_page: limit, pages: Math.max(1, Math.ceil(total / limit)) } });
  } catch (err) {
    console.error('[admin-activity-api] Error', err);
    return NextResponse.json({ ok: false, error: 'Failed to fetch activity' }, { status: 500 });
  }
}
