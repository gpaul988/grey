import { NextRequest, NextResponse } from 'next/server';
import { calculateShippingCost, calculateTax } from '@/lib/store/commerce';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'NG';
    const state = searchParams.get('state') || 'Lagos';
    const subtotal = Number(searchParams.get('subtotal') || '0');
    const weightKg = Number(searchParams.get('weightKg') || searchParams.get('weight_kg') || '0');

    const shippingCost = calculateShippingCost({ country, state, subtotal, weightKg });
    const tax = calculateTax({ country, state, subtotal });

    return NextResponse.json({
      country,
      state,
      subtotal,
      weightKg,
      shipping_cost: shippingCost,
      tax,
      total: subtotal + shippingCost + tax,
    });
  } catch (error) {
    console.error('[Store Shipping]', error);
    return NextResponse.json({ error: 'Failed to calculate shipping and tax' }, { status: 500 });
  }
}
