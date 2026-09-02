import { NextRequest, NextResponse } from 'next/server';

import { Customers, Orders, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const customer = Customers.find(Number(id));
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: customer });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const updated = Customers.update(Number(id), {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    phone: body.phone,
    address: body.address,
    city: body.city,
    state: body.state,
    country: body.country,
    bio: body.bio,
    date_of_birth: body.date_of_birth,
    gender: body.gender,
    status: body.status,
  });

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: updated });
}

// Delete customer
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customerId = Number(id);
  // Ensure the customer exists
  const existing = Customers.find(customerId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Customer not found' }, { status: 404 });

  // Require server-side session and permission
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  if (sess.user.role !== 'superadmin') return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  // Soft-delete customer: mark status and cancel their orders. Record audit trail.
  try {
    Customers.update(customerId, { status: 'deleted' });
    const orders = Orders.forCustomer(customerId);
    for (const o of orders) {
      Orders.updateStatus(o.id, 'cancelled');
    }
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'soft_delete', entity: 'customer', entity_id: customerId, detail: `Soft-deleted customer ${existing.first_name} ${existing.last_name} (id=${customerId}), cancelled ${orders.length} orders` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Restore soft-deleted customer
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customerId = Number(id);
  const existing = Customers.find(customerId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Customer not found' }, { status: 404 });

  const body = await request.json();
  if (body?.action !== 'restore') return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });

  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    Customers.update(customerId, { status: 'active' });
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'restore', entity: 'customer', entity_id: customerId, detail: `Restored customer ${existing.first_name} ${existing.last_name} (id=${customerId})` });
    const updated = Customers.find(customerId);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Restore failed' }, { status: 500 });
  }
}
