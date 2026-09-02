import { NextRequest, NextResponse } from 'next/server';

import { Products, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import type { NextRequest as NR } from 'next/server';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest) {
  const sess = await getServerSession(request as NR);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: true, data: Products.all() });
}

export async function POST(request: NextRequest) {
  const sess = await getServerSession(request as NR);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'manage_products')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const product = Products.create({
    name: String(body.name || '').trim(),
    price: Number(body.price || 0),
    category_id: body.category_id ? Number(body.category_id) : null,
    brand_id: body.brand_id ? Number(body.brand_id) : null,
    description: body.description || '',
    stock: Number(body.stock || 0),
    status: body.status || 'draft',
    featured: Boolean(body.featured),
    tags: Array.isArray(body.tags) ? body.tags : [],
    sku: body.sku || undefined,
    price_usd: body.price_usd ? Number(body.price_usd) : null,
    compare_price: body.compare_price ? Number(body.compare_price) : null,
    flash_sale: Boolean(body.flash_sale),
    flash_sale_price: body.flash_sale_price ? Number(body.flash_sale_price) : null,
  });

  // audit
  logActivity({ user_id: sess.user.id, user_name: sess.user.name, action: 'create', entity: 'product', entity_id: product.id, detail: `Created product ${product.name}` });

  return NextResponse.json({ ok: true, data: product }, { status: 201 });
}
