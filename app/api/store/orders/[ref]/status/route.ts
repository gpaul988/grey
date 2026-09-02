import { NextRequest, NextResponse } from 'next/server';
import { getStoreOrderByRef, updateStoreOrderStatus } from '@/lib/db/store-helpers';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await context.params;
    const order = await getStoreOrderByRef(ref);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ order, status: order.status, payment_status: order.payment_status });
  } catch (error) {
    console.error('[Store Order Status GET]', error);
    return NextResponse.json({ error: 'Failed to load order status' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await context.params;
    const order = await getStoreOrderByRef(ref);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const data = await request.json().catch(() => ({}));
    const updated = await updateStoreOrderStatus(order.id, {
      status: typeof data.status === 'string' ? data.status : undefined,
      paymentStatus: typeof data.paymentStatus === 'string' ? data.paymentStatus : undefined,
      shippingStatus: typeof data.shippingStatus === 'string' ? data.shippingStatus : undefined,
      notes: typeof data.notes === 'string' ? data.notes : undefined,
    });

    return NextResponse.json({ order: updated ?? order, success: true });
  } catch (error) {
    console.error('[Store Order Status PATCH]', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
