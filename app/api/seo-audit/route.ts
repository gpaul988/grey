import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    let body: Record<string, unknown> | null = null;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch (e) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON', rawBody: raw }, { status: 400 });
    }
    const url = body?.url as string | undefined;
    if (!url) return NextResponse.json({ ok: false, error: 'Missing url' }, { status: 400 });

    // Basic server-side fetch with a lightweight User-Agent
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'grey-seo-audit-bot/1.0' } });
    if (!res.ok) return NextResponse.json({ ok: false, error: `Fetch failed: ${res.status}` }, { status: 502 });

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = (document.querySelector('title') as HTMLTitleElement | null)?.textContent?.trim() || '';
    const metaDescription = (document.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.getAttribute('content') || '';

    // Explicitly type NodeList conversions to avoid 'unknown' inference
    const h1s = Array.from(document.querySelectorAll('h1') as NodeListOf<HTMLHeadingElement>)
      .map(h => h.textContent?.trim())
      .filter(Boolean) as string[];

    const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.getAttribute('href') || '';
    const robots = (document.querySelector('meta[name="robots"]') as HTMLMetaElement | null)?.getAttribute('content') || '';
    const viewport = (document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null)?.getAttribute('content') || '';
    const jsonLdCount = document.querySelectorAll('script[type="application/ld+json"]').length;

    const images = Array.from(document.querySelectorAll('img') as NodeListOf<HTMLImageElement>);
    const imagesMissingAlt = images
      .filter(img => !((img.getAttribute('alt') || '').trim()))
      .slice(0, 50)
      .map(img => img.getAttribute('src') || '');

    const links = Array.from(document.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>)
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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
