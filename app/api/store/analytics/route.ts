import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSnapshot, recordStoreEvent } from '@/lib/store/futuristic';

export async function GET() {
  try {
    return NextResponse.json({ snapshot: getAnalyticsSnapshot() });
  } catch (error) {
    console.error('[Store Analytics GET]', error);
    return NextResponse.json({ error: 'Analytics unavailable' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventType = String(body.eventType || body.type || 'page_view').trim();
    const value = Number(body.value ?? 1);
    if (!eventType) {
      return NextResponse.json({ error: 'Missing event type' }, { status: 400 });
    }
    recordStoreEvent(eventType, Number.isFinite(value) ? value : 1);
    return NextResponse.json({ ok: true, snapshot: getAnalyticsSnapshot() });
  } catch (error) {
    console.error('[Store Analytics POST]', error);
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 });
  }
}
