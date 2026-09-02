import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getStoreCustomerById, getStoreCustomerWishlist, toggleStoreCustomerWishlist } from '@/lib/db/store-helpers';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

function getCustomerIdFromRequest(request: NextRequest) {
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
  const customerId = getCustomerIdFromRequest(request);
  if (!customerId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const customer = await getStoreCustomerById(customerId);
  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  const ids = await getStoreCustomerWishlist(customer.id);
  return NextResponse.json({ ids });
}

export async function POST(request: NextRequest) {
  const customerId = getCustomerIdFromRequest(request);
  if (!customerId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const productId = Number(body.product_id ?? body.productId ?? 0);

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const ids = await toggleStoreCustomerWishlist(customerId, productId);
    return NextResponse.json({ ids });
  } catch (error) {
    console.error('[Store Wishlist]', error);
    return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const customerId = getCustomerIdFromRequest(request);
  if (!customerId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const productId = Number(body.product_id ?? body.productId ?? 0);
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const existing = await getStoreCustomerWishlist(customerId);
    if (!existing.includes(productId)) {
      return NextResponse.json({ ids: existing });
    }

    const { db } = await import('@/lib/db');
    const { storeWishlists } = await import('@/lib/db/store-schema');
    const { and, eq } = await import('drizzle-orm');

    await db
      .delete(storeWishlists)
      .where(and(eq(storeWishlists.customerId, customerId), eq(storeWishlists.productId, productId)));

    return NextResponse.json({ ids: (await getStoreCustomerWishlist(customerId)) });
  } catch (error) {
    console.error('[Store Wishlist DELETE]', error);
    return NextResponse.json({ error: 'Failed to remove wishlist item' }, { status: 500 });
  }
}
