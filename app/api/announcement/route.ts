import { NextResponse } from 'next/server';

/**
 * GET /api/announcement
 * Returns the current active announcement (if any)
 * AnnouncementBar component calls this on mount
 */
export async function GET() {
  try {
    // For development: return a sample announcement
    // In production, this would query the database
    
    const announcement = {
      id: 1,
      message: '🚀 Check out our new portfolio! We\'ve completed 30+ projects this year.',
      link_url: '/portfolio',
      link_label: 'View Portfolio',
      variant: 'gradient',
    };

    return NextResponse.json({ announcement }, { status: 200 });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json({ announcement: null }, { status: 200 });
  }
}
