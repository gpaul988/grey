import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

interface DBProductRow {
  id: number;
  name: string;
  slug: string;
  sku?: string | null;
  price?: number | null;
  price_usd?: number | null;
  compare_price?: number | null;
  stock?: number | null;
  images?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  specs?: string | null;
  featured?: number | null;
  tags?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  category_slug?: string | null;
  brand_id?: number | null;
  brand_name?: string | null;
  brand_slug?: string | null;
  rating?: number | null;
  created_at?: string | null;
}

interface DBReviewRow { id: number; reviewer_name?: string | null; rating?: number | null; comment?: string | null; created_at?: string | null; }

function parseJsonArray<T = unknown>(value: string | null | undefined, fallback: T[] = []): T[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function parseJsonObject<T = Record<string, string>>(value: string | null | undefined, fallback: T = {} as T): T {
  if (!value || value === '{}') return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeProduct(row: DBProductRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku ?? null,
    price: Number(row.price ?? 0),
    price_usd: row.price_usd ?? null,
    compare_price: row.compare_price ?? null,
    stock: Number(row.stock ?? 0),
    images: parseJsonArray<string>(row.images, []),
    thumbnail: row.thumbnail ?? null,
    description: row.description ?? null,
    specs: parseJsonObject<Record<string, string>>(row.specs, {}),
    featured: Number(row.featured ?? 0),
    tags: parseJsonArray<string>(row.tags, []),
    category_id: row.category_id ?? null,
    category_name: row.category_name ?? undefined,
    category_slug: row.category_slug ?? undefined,
    brand_id: row.brand_id ?? null,
    brand_name: row.brand_name ?? undefined,
    brand_slug: row.brand_slug ?? undefined,
    rating: Number(row.rating ?? 0),
  };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const db = new Database(DB_PATH);
    try {
      const productRow = db.prepare(`
        SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
        FROM products p
        LEFT JOIN product_categories pc ON pc.id = p.category_id
        LEFT JOIN product_brands pb ON pb.id = p.brand_id
        WHERE p.slug = ? AND p.status = 'active'
      `).get(slug) as DBProductRow | undefined;

      if (!productRow) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      const product = normalizeProduct(productRow);
      const reviews = db.prepare(`
        SELECT id, reviewer_name, rating, comment, created_at
        FROM product_reviews
        WHERE product_id = ? AND status IN ('approved', 'pending')
        ORDER BY created_at DESC
      `).all(product.id) as DBReviewRow[];

      const normalizedReviews = reviews.map((review) => ({
        id: review.id,
        reviewer_name: review.reviewer_name || 'Verified Buyer',
        rating: Number(review.rating ?? 0),
        comment: review.comment || null,
        created_at: review.created_at || new Date().toISOString(),
      }));

      const averageRating = normalizedReviews.length
        ? normalizedReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / normalizedReviews.length
        : Number(productRow.rating ?? 0);

      const related = db.prepare(`
        SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
        FROM products p
        LEFT JOIN product_categories pc ON pc.id = p.category_id
        LEFT JOIN product_brands pb ON pb.id = p.brand_id
        WHERE p.status = 'active' AND p.id != ? AND (p.category_id = ? OR p.brand_id = ?)
        ORDER BY p.created_at DESC
        LIMIT 4
      `).all(product.id, product.category_id, product.brand_id) as DBProductRow[];

      return NextResponse.json({
        product,
        reviews: normalizedReviews,
        rating: averageRating,
        related: related.map((item) => normalizeProduct(item)),
      });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('[Store Product Detail GET]', error);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const db = new Database(DB_PATH);
    try {
      const product = db.prepare('SELECT id FROM products WHERE slug = ? AND status = ?').get(slug, 'active') as { id: number } | undefined;
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      const body = await request.json().catch(() => ({}));
      const reviewerName = String(body.reviewer_name || 'Customer').slice(0, 80);
      const reviewRating = Math.min(5, Math.max(1, Number(body.rating ?? 5)));
      const comment = String(body.comment || '').slice(0, 1000);

      const info = db.prepare(`
        INSERT INTO product_reviews (product_id, customer_id, reviewer_name, rating, comment, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `).run(product.id, null, reviewerName, reviewRating, comment);

      return NextResponse.json({
        ok: true,
        review: {
          id: Number(info.lastInsertRowid),
          reviewer_name: reviewerName,
          rating: reviewRating,
          comment,
          created_at: new Date().toISOString(),
        },
      }, { status: 201 });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('[Store Product Detail POST]', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
