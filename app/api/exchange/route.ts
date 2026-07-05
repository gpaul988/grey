import { NextResponse } from 'next/server';

// Server-side exchange rate endpoint for app router (in-memory cache)
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
let cached: { fetchedAt: number; rates: Record<string, number> | null } | null = null;

export async function GET() {
  try {
    const now = Date.now();
    if (cached && (now - cached.fetchedAt) < CACHE_TTL_MS && cached.rates) {
      return NextResponse.json({ success: true, rates: cached.rates, source: 'cache' });
    }

    const provider = 'https://open.er-api.com/v6/latest/GBP';
    const pRes = await fetch(provider);
    if (!pRes.ok) {
      return NextResponse.json({ success: false, error: 'Exchange provider error', source: 'provider_error' }, { status: 502 });
    }
    const json = await pRes.json();
    if (!json || !(json.result === 'success' || json.rates)) {
      return NextResponse.json({ success: false, error: 'Invalid provider response', body: json }, { status: 502 });
    }

    const rates = json.rates as Record<string, number>;
    const keep: Record<string, number | null> = {
      GBP: rates.GBP || 1,
      NGN: rates.NGN || null,
      USD: rates.USD || null,
      EUR: rates.EUR || null,
    };

    cached = { fetchedAt: now, rates: keep as Record<string, number> };
    return NextResponse.json({ success: true, rates: keep, source: 'provider' });
  } catch (e) {
    console.error('Exchange API error', e);
    const fallback = { GBP: 1, NGN: 1800, USD: 1.33, EUR: 1.16 };
    return NextResponse.json({ success: false, error: 'server_error', rates: fallback, source: 'fallback' });
  }
}
