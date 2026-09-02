import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'node:path';
import { buildRecommendations } from '@/lib/store/futuristic';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartCategory = searchParams.get('category') || undefined;
    const intent = searchParams.get('intent') || undefined;

    const db = new Database(DB_PATH);
    try {
      const rows = db.prepare(`
        SELECT p.id, p.name, p.category_id, pc.slug AS category_slug, p.tags, p.featured, p.stock, p.price, p.rating
        FROM products p
        LEFT JOIN product_categories pc ON pc.id = p.category_id
        WHERE p.status = 'active'
        ORDER BY p.created_at DESC
      `).all() as Array<{ id:number; name:string; category_slug?:string | null; tags?:string | null; featured?:number | null; stock?:number | null; price?:number | null; rating?:number | null; }>;

      const products = rows.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category_slug || 'general',
        tags: item.tags ? JSON.parse(item.tags) : [],
        featured: Number(item.featured ?? 0),
        stock: Number(item.stock ?? 0),
        price: Number(item.price ?? 0),
        rating: Number(item.rating ?? 0),
      }));

      const recommendations = buildRecommendations(products, intent, cartCategory);
      return NextResponse.json({ recommendations, source: 'backend' });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('[Store Personalization]', error);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
