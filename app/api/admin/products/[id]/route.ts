import { NextRequest, NextResponse } from 'next/server';

import db from '@/Admin/db';
import { Products, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';

import type { NextRequest } from 'next/server';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const product = Products.find(Number(id));
  if (!product) {
    return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: product });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const updated = Products.update(Number(id), {
    name: body.name,
    price: body.price !== undefined ? Number(body.price) : undefined,
    description: body.description,
    stock: body.stock !== undefined ? Number(body.stock) : undefined,
    status: body.status,
    featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    tags: Array.isArray(body.tags) ? body.tags : undefined,
    sku: body.sku,
    price_usd: body.price_usd !== undefined ? Number(body.price_usd) : undefined,
    compare_price: body.compare_price !== undefined ? Number(body.compare_price) : undefined,
    flash_sale: body.flash_sale !== undefined ? Boolean(body.flash_sale) : undefined,
    flash_sale_price: body.flash_sale_price !== undefined ? Number(body.flash_sale_price) : undefined,
  });

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  const existing = Products.find(productId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });

  // Require server-side session and permission
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  // Destructive (archival) reserved for superadmin
  if (sess.user.role !== 'superadmin') return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    // Soft-delete by marking archived
    Products.update(productId, { status: 'archived' });
    // Log audit trail
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'soft_delete', entity: 'product', entity_id: productId, detail: `Archived product ${existing.name} (id=${productId})` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Restore soft-deleted product
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  const existing = Products.find(productId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });

  const body = await request.json();
  if (body?.action !== 'restore') return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });

  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    Products.update(productId, { status: 'active' });
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'restore', entity: 'product', entity_id: productId, detail: `Restored product ${existing.name} (id=${productId})` });
    const updated = Products.find(productId);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Restore failed' }, { status: 500 });
  }
}
