import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

/**
 * GET /api/ads?placement=home_banner
 * Returns ads for a specific placement from SQLite database
 * Reads from Admin/data/grey.db
 */
export async function GET(req: NextRequest) {
  try {
    const placement = req.nextUrl.searchParams.get('placement') || 'home_banner';

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

    return NextResponse.json({
      ads: Array.isArray(ads) ? ads : [],
      placement,
    });
  } catch (error) {
    console.error('[/api/ads] Error:', error);
    return NextResponse.json({ ads: [], placement }, { status: 200 });
  }
}
