import { NextResponse } from 'next/server';

import { getAdminDashboardSummary } from '@/lib/admin/dashboard-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const hasSessionCookie = /(?:^|;\s*)grey\.sid=/.test(request.headers.get('cookie') ?? '');

  if (!hasSessionCookie) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAdminDashboardSummary();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to load admin dashboard' }, { status: 500 });
  }
}
