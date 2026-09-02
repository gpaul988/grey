import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getStoreCartSession, saveStoreCartSession } from '@/lib/db/store-helpers';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

function getCustomerId(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : request.cookies.get('store_token')?.value || null;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { customerId?: number } | null;
    return decoded?.customerId ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const customerId = getCustomerId(request);
  const sessionId = request.headers.get('x-store-session') || request.cookies.get('store_session_id')?.value || null;

  const cartRow = await getStoreCartSession({ customerId, sessionId });
  const items = cartRow ? (function parseItems(value: string | null) {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })(cartRow.items) : [];

  return NextResponse.json({
    items,
    couponCode: cartRow?.couponCode ?? null,
    sessionId: cartRow?.sessionId ?? sessionId ?? null,
  });
}

export async function POST(request: NextRequest) {
  const customerId = getCustomerId(request);
  const sessionId = request.headers.get('x-store-session') || request.cookies.get('store_session_id')?.value || null;

  try {
    const body = await request.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    const couponCode = typeof body.couponCode === 'string' ? body.couponCode : null;

    const cartRow = await saveStoreCartSession({
      customerId,
      sessionId,
      items,
      couponCode,
    });

    return NextResponse.json({
      items: Array.isArray(cartRow?.items) ? cartRow.items : items,
      couponCode: cartRow?.couponCode ?? couponCode,
      sessionId: cartRow?.sessionId ?? sessionId,
    });
  } catch (error) {
    console.error('[Store Cart]', error);
    return NextResponse.json({ error: 'Failed to save cart' }, { status: 500 });
  }
}
