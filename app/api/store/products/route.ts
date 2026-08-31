import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'node:path';
import { seedStore } from '../../../../Admin/db/seed-store';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

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

function ensureCatalog() {
  const db = new Database(DB_PATH);
  try {
    const hasProductsTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'").get();
    if (!hasProductsTable) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS store_settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT NOT NULL UNIQUE,
          value TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS product_categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          parent_id INTEGER,
          icon TEXT,
          description TEXT,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS product_brands (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          logo TEXT,
          description TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          sku TEXT UNIQUE,
          category_id INTEGER,
          brand_id INTEGER,
          description TEXT,
          specs TEXT NOT NULL DEFAULT '{}',
          price REAL NOT NULL DEFAULT 0,
          price_usd REAL,
          compare_price REAL,
          stock INTEGER NOT NULL DEFAULT 0,
          images TEXT NOT NULL DEFAULT '[]',
          thumbnail TEXT,
          video_url TEXT,
          flash_sale INTEGER NOT NULL DEFAULT 0,
          flash_sale_starts TEXT,
          flash_sale_ends TEXT,
          status TEXT NOT NULL DEFAULT 'draft',
          featured INTEGER NOT NULL DEFAULT 0,
          tags TEXT NOT NULL DEFAULT '[]',
          weight REAL,
          created_at TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS product_reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER NOT NULL,
          customer_id INTEGER,
          reviewer_name TEXT NOT NULL,
          rating INTEGER NOT NULL DEFAULT 5,
          comment TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
    } else {
      const hasVideoUrl = db.prepare("SELECT name FROM pragma_table_info('products') WHERE name = 'video_url'").get();
      if (!hasVideoUrl) {
        db.exec('ALTER TABLE products ADD COLUMN video_url TEXT');
      }
      const hasFlashSale = db.prepare("SELECT name FROM pragma_table_info('products') WHERE name = 'flash_sale'").get();
      if (!hasFlashSale) {
        db.exec('ALTER TABLE products ADD COLUMN flash_sale INTEGER NOT NULL DEFAULT 0');
      }
      const hasFlashStarts = db.prepare("SELECT name FROM pragma_table_info('products') WHERE name = 'flash_sale_starts'").get();
      if (!hasFlashStarts) {
        db.exec("ALTER TABLE products ADD COLUMN flash_sale_starts TEXT");
      }
      const hasFlashEnds = db.prepare("SELECT name FROM pragma_table_info('products') WHERE name = 'flash_sale_ends'").get();
      if (!hasFlashEnds) {
        db.exec("ALTER TABLE products ADD COLUMN flash_sale_ends TEXT");
      }
    }

    const productCount = (db.prepare('SELECT COUNT(*) AS c FROM products').get() as { c: number }).c;
    const categoryCount = (db.prepare('SELECT COUNT(*) AS c FROM product_categories').get() as { c: number }).c;
    const brandCount = (db.prepare('SELECT COUNT(*) AS c FROM product_brands').get() as { c: number }).c;
    if (productCount < 20 || categoryCount < 8 || brandCount < 15) {
      try {
        seedStore();
      } catch (err) {
        console.error('[seedStore]', err && err.stack ? err.stack : err);
      }
    }
  } finally {
    db.close();
  }
}

export async function GET(request: NextRequest) {
  try {
    ensureCatalog();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const flashsale = searchParams.get('flashsale') || searchParams.get('flash_sale');
    const sort = searchParams.get('sort') || 'latest';

    const db = new Database(DB_PATH);
    try {
      const categories = db.prepare('SELECT id, name, slug, icon FROM product_categories ORDER BY sort_order ASC, name ASC').all() as any[];
      const brands = db.prepare('SELECT id, name, slug FROM product_brands ORDER BY name ASC').all() as any[];

      const products = db.prepare(`
        SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug,
               COALESCE((
                 SELECT ROUND(AVG(r.rating), 1)
                 FROM product_reviews r
                 WHERE r.product_id = p.id AND r.status = 'approved'
               ), 0) AS rating
        FROM products p
        LEFT JOIN product_categories pc ON pc.id = p.category_id
        LEFT JOIN product_brands pb ON pb.id = p.brand_id
        WHERE p.status = 'active'
        ORDER BY p.created_at DESC
      `).all() as any[];

      let list = products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku ?? null,
        price: Number(product.price ?? 0),
        price_usd: product.price_usd ?? null,
        compare_price: product.compare_price ?? null,
        stock: Number(product.stock ?? 0),
        images: parseJsonArray<string>(product.images, []),
        thumbnail: product.thumbnail ?? null,
        video_url: product.video_url ?? null,
        description: product.description ?? null,
        specs: parseJsonObject<Record<string, string>>(product.specs, {}),
        featured: Number(product.featured ?? 0),
        flash_sale: Number(product.flash_sale ?? 0),
        flash_sale_starts: product.flash_sale_starts ?? null,
        flash_sale_ends: product.flash_sale_ends ?? null,
        tags: parseJsonArray<string>(product.tags, []),
        category_id: product.category_id ?? null,
        category_name: product.category_name ?? undefined,
        category_slug: product.category_slug ?? undefined,
        brand_id: product.brand_id ?? null,
        brand_name: product.brand_name ?? undefined,
        brand_slug: product.brand_slug ?? undefined,
        rating: Number(product.rating ?? 0),
        created_at: product.created_at ?? null,
      }));

      if (category) {
        const normalized = category.trim();
        list = list.filter((item) => item.category_id === Number(normalized) || item.category_slug === normalized);
      }
      if (brand) {
        const normalized = brand.trim();
        list = list.filter((item) => item.brand_id === Number(normalized) || item.brand_slug === normalized);
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter((item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q) ||
          (item.brand_name || '').toLowerCase().includes(q)
        );
      }
      if (featured === 'true' || featured === '1') {
        list = list.filter((item) => Number(item.featured) === 1);
      }
      if (flashsale === 'true' || flashsale === '1') {
        const now = Date.now();
        const { isActiveFlashSale } = await import('../flashsale-util').then(m => m).catch(() => ({ isActiveFlashSale: null }));
        if (typeof isActiveFlashSale === 'function') {
          list = list.filter((item) => isActiveFlashSale(item, now));
        } else {
          // fallback to inline logic if import fails
          list = list.filter((item) => {
            if (Number(item.flash_sale) !== 1) return false;
            const starts = item.flash_sale_starts ? Date.parse(item.flash_sale_starts) : NaN;
            const ends = item.flash_sale_ends ? Date.parse(item.flash_sale_ends) : NaN;
            if (!isNaN(starts) && now < starts) return false;
            if (!isNaN(ends) && now > ends) return false;
            return true;
          });
        }
      }

      list.sort((a: any, b: any) => {
        switch (sort) {
          case 'price_asc': return a.price - b.price;
          case 'price_desc': return b.price - a.price;
          case 'name': return a.name.localeCompare(b.name);
          default: return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        }
      });

      return NextResponse.json({
        products: list,
        categories: categories.map((item) => ({ id: item.id, name: item.name, slug: item.slug, icon: item.icon ?? null })),
        brands: brands.map((item) => ({ id: item.id, name: item.name, slug: item.slug })),
      });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('[Store Products GET]', error && (error as any).stack ? (error as any).stack : error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
