import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    let body: any = null;
    try {
      body = JSON.parse(raw);
    } catch (e) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON', rawBody: raw }, { status: 400 });
    }
    const url = body?.url;
    if (!url) return NextResponse.json({ ok: false, error: 'Missing url' }, { status: 400 });

    // Basic server-side fetch with a lightweight User-Agent
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'grey-seo-audit-bot/1.0' } });
    if (!res.ok) return NextResponse.json({ ok: false, error: `Fetch failed: ${res.status}` }, { status: 502 });

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = document.querySelector('title')?.textContent?.trim() || '';
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim()).filter(Boolean);
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
    const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
    const jsonLdCount = document.querySelectorAll('script[type="application/ld+json"]').length;

    const images = Array.from(document.querySelectorAll('img'));
    const imagesMissingAlt = images
      .filter(img => !(img.getAttribute('alt') || '').trim())
      .slice(0, 50)
      .map(img => img.getAttribute('src') || '');

    const links = Array.from(document.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(Boolean) as string[];

    const base = new URL(url);
    const internalLinks = links.filter(h => {
      try { return h.startsWith('/') || new URL(h, base).origin === base.origin; } catch { return false; }
    });
    const externalLinks = links.filter(h => {
      try { return !h.startsWith('/') && new URL(h, base).origin !== base.origin; } catch { return false; }
    });

    const textContent = document.body?.textContent || '';
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;

    // Simple heuristic score (0-100)
    const score = Math.max(0, Math.min(100, 60 + (jsonLdCount * 2) + (h1s.length * 5) - (imagesMissingAlt.length * 3)));

    return NextResponse.json({
      ok: true,
      title,
      metaDescription,
      h1s,
      canonical,
      robots,
      viewport,
      jsonLdCount,
      imagesMissingAlt,
      totalLinks: links.length,
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      wordCount,
      score,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
