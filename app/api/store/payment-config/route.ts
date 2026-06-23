import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/store/payment-config
 * Return payment configuration for store
 */
export async function GET(req: NextRequest) {
  try {
    const config = {
      stripe: {
        enabled: !!process.env.STRIPE_PUBLIC_KEY,
        publicKey: process.env.STRIPE_PUBLIC_KEY || null,
      },
      paypal: {
        enabled: !!process.env.PAYPAL_CLIENT_ID,
        clientId: process.env.PAYPAL_CLIENT_ID || null,
      },
      supported_currencies: ['USD', 'NGN', 'GBP', 'EUR'],
      default_currency: 'USD',
    };

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment configuration' },
      { status: 500 }
    );
  }
}
