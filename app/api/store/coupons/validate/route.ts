import { NextRequest, NextResponse } from 'next/server';
import { validateCouponCode } from '@/lib/store/commerce';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = String(body.code || '').trim();
    const subtotal = Number(body.subtotal ?? 0);

    const result = validateCouponCode(code, subtotal);
    return NextResponse.json(result, { status: result.valid ? 200 : 400 });
  } catch (error) {
    console.error('[Store Coupon Validation]', error);
    return NextResponse.json({ error: 'Failed to validate coupon code' }, { status: 500 });
  }
}
