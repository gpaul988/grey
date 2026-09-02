import { NextResponse } from 'next/server';
import { getLoyaltySnapshot } from '@/lib/store/futuristic';

export async function GET() {
  try {
    return NextResponse.json({ loyalty: getLoyaltySnapshot() });
  } catch (error) {
    console.error('[Store Loyalty]', error);
    return NextResponse.json({ error: 'Failed to load loyalty data' }, { status: 500 });
  }
}
