import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

/**
 * GET /api/content?page=home
 * Returns social proof content (partners & reviews) from SQLite database
 * Reads from Admin/data/grey.db
 */
export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get('page') || 'home';

    // Connect to SQLite database
    const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
    const db = new Database(dbPath);

    // Get active partners (sorted by sort_order)
    const partners = db.prepare(`
      SELECT id, name, logo, url FROM partners 
      WHERE active = 1 
      ORDER BY sort_order ASC, id ASC
    `).all();

    // Get active reviews (sorted by newest first)
    const reviews = db.prepare(`
      SELECT id, author, role, company, avatar, quote, rating FROM client_reviews 
      WHERE active = 1 
      ORDER BY created_at DESC
    `).all();

    db.close();

    // Determine placement based on page
    const placementConfig: Record<string, { partners: boolean; reviews: boolean }> = {
      home: { partners: true, reviews: true },
      about: { partners: true, reviews: false },
      portfolio: { partners: true, reviews: false },
      services: { partners: false, reviews: true },
      industries: { partners: false, reviews: true },
    };

    const placement = placementConfig[page] || { partners: false, reviews: false };

    return NextResponse.json({
      partners: Array.isArray(partners) ? partners : [],
      reviews: Array.isArray(reviews) ? reviews : [],
      placement,
    });
  } catch (error) {
    console.error('[/api/content] Error:', error);
    return NextResponse.json(
      {
        partners: [],
        reviews: [],
        placement: { partners: false, reviews: false },
      },
      { status: 200 }
    );
  }
}
