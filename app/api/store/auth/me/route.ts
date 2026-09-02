import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getStoreCustomerById, getStoreCustomerWishlist } from '@/lib/db/store-helpers';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

function getToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.slice(7);
  return request.cookies.get('store_token')?.value || null;
}

export async function GET(request: NextRequest) {
  try {
    const token = getToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { customerId?: number } | null;
    if (!decoded?.customerId) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const customer = await getStoreCustomerById(decoded.customerId);
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const wishlist_ids = await getStoreCustomerWishlist(customer.id);

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        emailVerified: customer.emailVerified,
        createdAt: customer.createdAt,
      },
      wishlist_ids,
    });
  } catch (error) {
    console.error('[Store Auth Me]', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
