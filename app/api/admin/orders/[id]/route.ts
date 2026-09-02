import { NextRequest, NextResponse } from 'next/server';

import db from '@/Admin/db';
import { Orders, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import type { NextRequest } from 'next/server';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_orders')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const order = Orders.find(Number(id));
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: { ...order, items: Orders.itemsFor(Number(id)) } });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_orders')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const orderId = Number(id);

  if (body.status) {
    Orders.updateStatus(orderId, body.status);
  }

  if (body.payment_status || body.payment_method || body.payment_ref || body.payment_gateway) {
    Orders.updatePayment(orderId, {
      payment_status: body.payment_status || 'paid',
      payment_method: body.payment_method,
      payment_gateway: body.payment_gateway,
      payment_ref: body.payment_ref,
      payment_data: body.payment_data || {},
    });
  }

  const updated = Orders.find(orderId);
  return NextResponse.json({ ok: true, data: updated });
}

// Delete order (soft-delete)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  const existing = Orders.find(orderId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });

  // Require server-side session and permission
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_orders')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  if (sess.user.role !== 'superadmin') return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    // Mark order cancelled rather than deleting
    Orders.updateStatus(orderId, 'cancelled');
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'soft_delete', entity: 'order', entity_id: orderId, detail: `Marked order ${existing.order_number} (id=${orderId}) as cancelled` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Restore cancelled order
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  const existing = Orders.find(orderId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });

  const body = await request.json();
  if (body?.action !== 'restore') return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });

  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_orders')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    Orders.updateStatus(orderId, 'created');
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'restore', entity: 'order', entity_id: orderId, detail: `Restored order ${existing.order_number} (id=${orderId})` });
    const updated = Orders.find(orderId);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Restore failed' }, { status: 500 });
  }
}
