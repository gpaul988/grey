import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getStoreCustomerById, getStoreCustomerOrders } from '@/lib/db/store-helpers';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

function getCustomerId(request: NextRequest) {
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
  const customerId = getCustomerId(request);
  if (!customerId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const customer = await getStoreCustomerById(customerId);
  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  const orders = await getStoreCustomerOrders(customer.id);
  return NextResponse.json({ orders });
}
