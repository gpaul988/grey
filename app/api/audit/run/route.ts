import { NextRequest, NextResponse } from 'next/server';
import { runAudit } from '@/lib/audit/engine';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';

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

    // Store the audit result in DB (non-blocking — don't fail if DB write fails)
    try {
      await db.insert(auditSubmissions).values({
        userName: 'Anonymous',
        userEmail: 'noreply@greyinfotech.com',
        website: website?.trim() || null,
        gitHubRepo: repo?.trim() || null,
        priority: report.overallScore < 40 ? 'critical' : report.overallScore < 70 ? 'high' : 'medium',
        preferredContact: 'email',
        auditData: JSON.stringify(report),
        status: 'new',
      });
    } catch (dbErr) {
      console.warn('[Audit] DB write failed (non-blocking):', dbErr);
    }

    return NextResponse.json(report, {
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
