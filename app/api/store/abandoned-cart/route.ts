import { NextRequest, NextResponse } from 'next/server';
import { getAbandonedCartSuggestions } from '@/lib/store/futuristic';

const recoveryQueue = new Map<string, { email: string; total: number; items: number; createdAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || 'guest@example.com').trim();
    const total = Number(body.total ?? 0);
    const items = Number(body.items ?? 0);
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    recoveryQueue.set(email, { email, total, items, createdAt: Date.now() });

    return NextResponse.json({
      ok: true,
      message: 'Recovery reminder queued successfully.',
      suggestion: getAbandonedCartSuggestions(),
    });
  } catch (error) {
    console.error('[Store Abandoned Cart]', error);
    return NextResponse.json({ error: 'Failed to queue cart recovery reminder' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    queued: Array.from(recoveryQueue.values()),
    suggestion: getAbandonedCartSuggestions(),
  });
}
