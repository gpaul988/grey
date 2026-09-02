import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      referralProgram: {
        code: 'GREY-TECH-REF',
        reward: '₦20,000 store credit',
        friendReward: '₦10,000 welcome credit',
        steps: [
          'Share your unique referral code from your store account.',
          'Your friend uses the code during checkout on a qualifying order.',
          'Both of you receive your referral bonus after the order is confirmed.',
        ],
      },
    });
  } catch (error) {
    console.error('[Store Referrals]', error);
    return NextResponse.json({ error: 'Failed to load referral program' }, { status: 500 });
  }
}
