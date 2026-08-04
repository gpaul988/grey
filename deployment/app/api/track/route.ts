import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/track
 * Tracks user events (clicks, views, shares) for analytics
 * Called by AdBanner and other components
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, label } = body;

    // In production, store this in the database for analytics
    // For now, just log it in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${type}:`, { path, label, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
