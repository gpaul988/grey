import { NextRequest, NextResponse } from 'next/server';
import { runAudit } from '@/lib/audit/engine';
import { saveAudit } from '@/lib/audit/repository';

export const maxDuration = 60; // 60s for deep audits

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

    const { website, repo } = body ?? {};

    if (!website?.trim() && !repo?.trim()) {
      return NextResponse.json(
        { error: 'Provide at least a website URL or a GitHub repository URL.' },
        { status: 400 }
      );
    }

    // Run the real audit engine
    const report = await runAudit({
      website: website?.trim() || undefined,
      repo: repo?.trim() || undefined,
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
