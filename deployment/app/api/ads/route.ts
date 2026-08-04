import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { notifyAdminPanel } from '@/lib/admin-notify';

/**
 * GET /api/ads?placement=home_banner
 * Returns ads for a specific placement from SQLite database
 * Reads from Admin/data/grey.db
 */
export async function GET(req: NextRequest) {
    const placement = req.nextUrl.searchParams.get('placement') || 'home_banner';
      try {

    // Connect to SQLite database
    const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
    const db = new Database(dbPath);

    // Query ads table (published only, sorted by order)
    const ads = db.prepare(`
      SELECT 
        id, title, body, image, link_url, cta_label, 
        placement, variant, share_caption, impressions, clicks
      FROM ads 
      WHERE placement = ? AND status = 'published'
      ORDER BY id ASC
    `).all(placement);

    db.close();

    return NextResponse.json({ ads, placement }); // fixed: return actual ads
  } catch (error) {
    return NextResponse.json({ ads: [], placement }, { status: 200 }); // ✓ works here too
  }
}

/**
 * POST /api/ads/track
 * Track ad clicks and notify admin panel
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { adId } = body;

        if (!adId) {
            return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 });
        }

        // Connect to SQLite database
        const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
        const db = new Database(dbPath);

        // Increment click count for the ad
        db.prepare(`
            UPDATE ads 
            SET clicks = COALESCE(clicks, 0) + 1
            WHERE id = ?
        `).run(adId);

        // Get the updated ad info for the notification
        const ad = db.prepare(`
            SELECT id, title, clicks FROM ads WHERE id = ?
        `).get(adId) as {id: number; title: string; clicks: number} | undefined;

        db.close();

        if (!ad) {
            return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
        }

        notifyAdminPanel({ type: 'ad_click', id: adId, name: ad.title || `Ad #${adId}`, email: 'ad-click' });

        return NextResponse.json({
            ok: true,
            message: 'Click tracked successfully',
            clicks: ad.clicks,
        });
    } catch (error) {
        console.error('[ads/track] Error:', error);
        return NextResponse.json({ error: 'Failed to track click', ok: false }, { status: 500 });
    }
}
