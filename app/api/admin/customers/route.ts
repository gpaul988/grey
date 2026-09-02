import { NextRequest, NextResponse } from 'next/server';

import { Customers, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import type { NextRequest as NR } from 'next/server';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest) {
  const sess = await getServerSession(request as NR);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: true, data: Customers.all() });
}

export async function POST(request: NextRequest) {
  const sess = await getServerSession(request as NR);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_customers')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const customer = Customers.create({
    first_name: String(body.first_name || '').trim(),
    last_name: String(body.last_name || '').trim(),
    phone: String(body.phone || '').trim(),
    email: body.email || undefined,
    address: body.address || undefined,
    city: body.city || undefined,
    state: body.state || undefined,
    country: body.country || 'Nigeria',
    bio: body.bio || undefined,
    date_of_birth: body.date_of_birth || undefined,
    gender: body.gender || undefined,
    password: body.password || undefined,
  });

  logActivity({ user_id: sess.user.id, user_name: sess.user.name, action: 'create', entity: 'customer', entity_id: customer.id, detail: `Created customer ${customer.first_name} ${customer.last_name}` });

  return NextResponse.json({ ok: true, data: customer }, { status: 201 });
}
