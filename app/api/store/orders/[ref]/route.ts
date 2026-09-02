import { NextRequest, NextResponse } from 'next/server';
import { getStoreOrderByRef } from '@/lib/db/store-helpers';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await context.params;
    if (!ref) {
      return NextResponse.json({ error: 'Order reference is required' }, { status: 400 });
    }

    const order = await getStoreOrderByRef(ref);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('[Store Order Detail]', error);
    return NextResponse.json({ error: 'Failed to load order' }, { status: 500 });
  }
}
