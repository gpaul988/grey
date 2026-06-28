import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { exportAsJSON, exportAsHTML } from '@/lib/audit/export';
import type { AuditReport } from '@/lib/audit/engine';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const format = req.nextUrl.searchParams.get('format') || 'json';

    // Look up the audit by ID from DB
    const rows = await db
      .select()
      .from(auditSubmissions)
      .where(eq(auditSubmissions.id, parseInt(id, 10)))
      .limit(1);

    if (!rows.length || !rows[0].auditData) {
      return NextResponse.json({ error: 'Audit report not found' }, { status: 404 });
    }

    const report = rows[0].auditData as unknown as AuditReport;

    if (format === 'json') {
      const json = exportAsJSON(report);
      return new NextResponse(json, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="audit-report-${id}.json"`,
        },
      });
    }

    if (format === 'html' || format === 'pdf') {
      const html = exportAsHTML(report);
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': format === 'pdf' ? 'inline' : `attachment; filename="audit-report-${id}.html"`,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid format. Use json or html.' }, { status: 400 });
  } catch (err) {
    console.error('[Audit/export]', err);
    return NextResponse.json(
      { error: 'Export failed', message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
