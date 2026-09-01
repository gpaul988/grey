import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

// Types for DB rows returned by better-sqlite3
interface DBCategoryRow { id: number; name: string; slug: string; icon?: string | null; }
interface DBBrandRow { id: number; name: string; slug: string; }
interface DBProductRow {
  id: number;
  name: string;
  slug: string;
  sku?: string | null;
  price?: number | null;
  // Optional legacy USD price column (may not exist in older DBs)
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
    const hasTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'").get();
    if (!hasTable) {
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
          compare_price REAL,
          stock INTEGER NOT NULL DEFAULT 0,
          images TEXT NOT NULL DEFAULT '[]',
          thumbnail TEXT,
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
    }

    const categoryCount = db.prepare('SELECT COUNT(*) AS c FROM product_categories').get() as { c: number };
    if (categoryCount.c === 0) {
      const cats = [
        ['laptops', 'Laptops', 'laptop'],
        ['desktops', 'Desktops', 'monitor'],
        ['phones', 'Mobile Phones', 'smartphone'],
        ['tablets', 'Tablets', 'tablet'],
        ['networking', 'Networking', 'wifi'],
      ];
      const categoryStmt = db.prepare('INSERT INTO product_categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)');
      cats.forEach(([slug, name, icon], index) => categoryStmt.run(name, slug, icon, `${name} products`, index));

      const brands = [
        ['apple', 'Apple'],
        ['dell', 'Dell'],
        ['hp', 'HP'],
        ['lenovo', 'Lenovo'],
        ['samsung', 'Samsung'],
        ['microsoft', 'Microsoft'],
        ['tp-link', 'TP-Link'],
        ['anker', 'Anker'],
      ];
      const brandStmt = db.prepare('INSERT INTO product_brands (name, slug, description) VALUES (?, ?, ?)');
      brands.forEach(([slug, name]) => brandStmt.run(name, slug, `${name} catalog items`));

      const brandMap: Record<string, number> = {};
      db.prepare('SELECT id, slug FROM product_brands').all() as DBBrandRow[]; 
      const brandRows = db.prepare('SELECT id, slug FROM product_brands').all() as DBBrandRow[];
      brandRows.forEach((row) => {
        brandMap[row.slug] = row.id;
      });

      const productStmt = db.prepare(`
        INSERT INTO products (name, slug, sku, category_id, brand_id, description, specs, price, compare_price, stock, images, thumbnail, status, featured, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const items = [
        ['MacBook Pro 14" M3 Pro', 'macbook-pro-14-m3-pro', 'MBP14-M3P', 'laptops', 'apple', 'Premium business laptop for performance and portability.', '{"Chip":"Apple M3 Pro","RAM":"18GB","Storage":"512GB SSD"}', 2850000, 3100000, 12, '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70', 'active', 1, '["premium","creator"]'],
        ['Dell XPS 15', 'dell-xps-15', 'XPS15-9530', 'laptops', 'dell', 'Elegant laptop for work, creative projects, and everyday productivity.', '{"CPU":"Intel Core i7-13700H","RAM":"16GB","Storage":"1TB SSD"}', 1950000, 2200000, 18, '["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=70', 'active', 1, '["business"]'],
        ['Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'SGS24-U-256', 'phones', 'samsung', 'Premium flagship mobile phone with pro-grade camera and AI features.', '{"Chip":"Snapdragon 8 Gen 3","RAM":"12GB","Storage":"256GB"}', 1580000, 1750000, 28, '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=70', 'active', 1, '["flagship"]'],
        ['TP-Link Archer AX73 Router', 'tp-link-archer-ax73-router', 'ARCHER-AX73', 'networking', 'tp-link', 'Fast Wi-Fi 6 router for dependable home and office networks.', '{"Standard":"Wi-Fi 6","Ports":"4 Gigabit LAN","Coverage":"Up to 3000 sq ft"}', 95000, 110000, 60, '["https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=70', 'active', 0, '["wifi"]'],
      ] as const;

      const categoryLookup: Record<string, number> = {};
      const categoryRows = db.prepare('SELECT id, slug FROM product_categories').all() as DBCategoryRow[];
      categoryRows.forEach((row) => {
        categoryLookup[row.slug] = row.id;
      });

      items.forEach(([name, slug, sku, categorySlug, brandSlug, description, specs, price, comparePrice, stock, images, thumbnail, status, featured, tags]) => {
        productStmt.run(
          name,
          slug,
          sku,
          categoryLookup[categorySlug],
          brandMap[brandSlug],
          description,
          specs,
          Number(price),
          Number(comparePrice),
          Number(stock),
          images,
          thumbnail,
          status,
          Number(featured),
          tags
        );
      });
    }
  } finally {
    db.close();
  }
}

interface ProductDTO {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  price_usd?: number | null;
  compare_price: number | null;
  stock: number;
  images: string[];
  thumbnail: string | null;
  description: string | null;
  specs: Record<string, string>;
  featured: number;
  tags: string[];
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  brand_id: number | null;
  brand_name?: string;
  brand_slug?: string;
  rating: number;
  created_at?: string | null;
}

export async function GET(request: NextRequest) {
  try {
    ensureCatalog();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'latest';

    const db = new Database(DB_PATH);
    try {
      const categories = db.prepare('SELECT id, name, slug, icon FROM product_categories ORDER BY sort_order ASC, name ASC').all() as DBCategoryRow[];
      const brands = db.prepare('SELECT id, name, slug FROM product_brands ORDER BY name ASC').all() as DBBrandRow[];

      const products = db.prepare(`
        SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
        FROM products p
        LEFT JOIN product_categories pc ON pc.id = p.category_id
        LEFT JOIN product_brands pb ON pb.id = p.brand_id
        WHERE p.status = 'active'
        ORDER BY p.created_at DESC
      `).all() as DBProductRow[];

      let list: ProductDTO[] = products.map((product) => ({
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
        description: product.description ?? null,
        specs: parseJsonObject<Record<string, string>>(product.specs, {}),
        featured: Number(product.featured ?? 0),
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

      list.sort((a, b) => {
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
    console.error('[Store Products GET]', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
