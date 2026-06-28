import { NextRequest, NextResponse } from 'next/server';
import { runAudit } from '@/lib/audit/engine';
import { getDb } from '@/Admin/db';

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

    // Store the audit result in DB via Admin SQLite (non-blocking)
    let externalId: string | undefined;
    try {
      const db = getDb();
      const stmt = db.prepare(`
        INSERT INTO audit_submissions (
          user_name, user_email, website, github_repo,
          priority, preferred_contact, audit_data, status
        ) VALUES (
          @user_name, @user_email, @website, @github_repo,
          @priority, @preferred_contact, @audit_data, 'new'
        )
      `);

      const priority =
        report.overallScore < 40 ? 'critical' :
        report.overallScore < 70 ? 'high' : 'medium';

      const result = stmt.run({
        user_name: 'Anonymous',
        user_email: 'noreply@greyinfotech.com',
        website: website?.trim() || null,
        github_repo: repo?.trim() || null,
        priority,
        preferred_contact: 'email',
        audit_data: JSON.stringify(report),
      });

      if (result?.lastInsertRowid) {
        externalId = String(result.lastInsertRowid);
      }
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
