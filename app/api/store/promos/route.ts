import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

function parseJsonArray<T = unknown>(value: string | null | undefined, fallback: T[] = []) {
  if (!value) return fallback;
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? (parsed as T[]) : fallback; } catch { return fallback; }
}

export async function GET(_req: NextRequest) {
  try {
    if (!DB_PATH) return NextResponse.json({ error: 'DB path not configured' }, { status: 500 });
    const db = new Database(DB_PATH, { readonly: true });
    try {
      // load store settings
      const settingsRows = db.prepare('SELECT key, value FROM store_settings').all() as Array<{ key: string; value: string }>;
      const settings: Record<string, string> = {};
      settingsRows.forEach((r) => (settings[r.key] = r.value));
      const blackFridayActive = settings['black_friday_active'] === '1' || settings['black_friday_active'] === 'true';
      const blackFridayDiscount = Number(settings['black_friday_discount'] || 0);

      // load products that have flash_sale flag set (server-side filter)
      const rows = db
        .prepare('SELECT id,name,slug,price,price_usd,compare_price,stock,flash_sale,flash_sale_starts,flash_sale_ends,flash_sale_price,thumbnail FROM products WHERE flash_sale = 1')
        .all() as any[];

      const now = Date.now();
      const activeFlash: any[] = [];
      for (const r of rows) {
        const start = r.flash_sale_starts ? Date.parse(r.flash_sale_starts) : NaN;
        const end = r.flash_sale_ends ? Date.parse(r.flash_sale_ends) : NaN;
        const active = (Number(r.flash_sale || 0) === 1) && (Number.isNaN(start) || now >= start) && (Number.isNaN(end) || now <= end);
        const base = Number(r.price || 0);
        let effective = base;
        let promo: string | null = null;
        if (active && typeof r.flash_sale_price === 'number' && !isNaN(r.flash_sale_price) && r.flash_sale_price > 0) {
          effective = Math.round(Number(r.flash_sale_price));
          promo = 'flash_sale';
        } else if (blackFridayActive && blackFridayDiscount > 0) {
          const factor = (100 - Math.max(0, Math.min(100, blackFridayDiscount))) / 100;
          effective = Math.round(base * factor);
          promo = 'black_friday';
        }
        activeFlash.push({
          id: r.id, slug: r.slug, name: r.name, thumbnail: r.thumbnail ?? null,
          flash_sale: Number(r.flash_sale || 0) === 1,
          flash_sale_starts: r.flash_sale_starts ?? null,
          flash_sale_ends: r.flash_sale_ends ?? null,
          flash_sale_price: r.flash_sale_price ?? null,
          price: base,
          effective_price: effective,
          promotion: promo,
        });
      }

      // return both store settings and computed active flash products
      return NextResponse.json({
        store_settings: { black_friday_active: blackFridayActive, black_friday_discount: blackFridayDiscount },
        flash_candidates_count: rows.length,
        active_flash_products: activeFlash.filter(p => p.promotion === 'flash_sale'),
        computed_promo_preview: activeFlash,
      });
    } finally {
      try { db.close(); } catch {}
    }
  } catch (err) {
    console.error('[Promos GET]', err);
    return NextResponse.json({ error: 'Failed to read promos' }, { status: 500 });
  }
}
