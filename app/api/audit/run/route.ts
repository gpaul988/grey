import { NextRequest, NextResponse } from 'next/server';
import { runAudit } from '@/lib/audit/engine';
import { saveAudit } from '@/lib/audit/repository';

export const maxDuration = 60; // 60s for deep audits

/**
 * Normalize input to full URL or GitHub URL
 * - "example.com" → "https://example.com"
 * - "https://example.com" → "https://example.com" (unchanged)
 * - "owner/repo" → "https://github.com/owner/repo"
 * - "https://github.com/owner/repo" → "https://github.com/owner/repo" (unchanged)
 */
function normalizeUrl(input: string, isRepo: boolean = false): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  
  if (isRepo) {
    // GitHub repo: owner/repo format
    if (trimmed.startsWith('http')) return trimmed;
    if (trimmed.includes('/') && !trimmed.includes('.')) {
      // Looks like owner/repo
      return `https://github.com/${trimmed}`;
    }
    return trimmed; // Already a URL or invalid, pass through
  } else {
    // Website: domain or URL
    if (trimmed.startsWith('http')) return trimmed;
    // Add https:// to bare domain
    return `https://${trimmed}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    let body: Record<string, string>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    let { website, repo } = body ?? {};

    // Normalize inputs
    website = website ? normalizeUrl(website.trim(), false) : (undefined as any);
    repo = repo ? normalizeUrl(repo.trim(), true) : (undefined as any);

    if (!website && !repo) {
      return NextResponse.json(
        { error: 'Provide at least a domain name, website URL, or GitHub repository URL.' },
        { status: 400 }
      );
    }

    // Run the real audit engine
    const report = await runAudit({
      website: website || undefined,
      repo: repo || undefined,
    });

    // Store the audit result in DB via the audit repository (SQLite via Admin/db)
    let externalId: string | undefined;
    try {
      // Get client IP and user agent for tracking
      const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      const userAgent = req.headers.get('user-agent') || undefined;

      // Save using the audit repository which properly handles the audits table
      const saved = saveAudit(report, ipAddress || undefined, userAgent);
      externalId = saved.externalId;
    } catch (dbErr) {
      console.warn('[Audit] DB write failed (non-blocking):', dbErr);
    }

    // Return report enriched with externalId and shareUrl
    const responsePayload = {
      ...report,
      externalId,
      shareUrl: externalId ? `/audit?reportId=${externalId}` : undefined,
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('[Audit/run]', err);
    return NextResponse.json(
      {
        error: 'Audit engine failed.',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Audit API online', version: '2.0' });
}
