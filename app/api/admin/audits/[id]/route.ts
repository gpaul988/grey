import { NextRequest, NextResponse } from 'next/server';

import { AuditSubmissions, logActivity } from '@/Admin/models';
import { canAccess } from '@/lib/admin/access';
import { getServerSession } from '@/lib/admin/server-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const submission = AuditSubmissions.find(Number(id));
  if (!submission) {
    return NextResponse.json({ ok: false, error: 'Audit not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: submission });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const current = AuditSubmissions.find(Number(id));
  if (!current) {
    return NextResponse.json({ ok: false, error: 'Audit not found' }, { status: 404 });
  }

  const updated = AuditSubmissions.update(Number(id), {
    status: body.status,
    admin_notes: body.admin_notes,
    proposed_solution: body.proposed_solution,
  });

  return NextResponse.json({ ok: true, data: updated });
}

// Delete audit submission (soft-delete)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submissionId = Number(id);
  const existing = AuditSubmissions.find(submissionId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Audit not found' }, { status: 404 });

  // Require server-side session and permission
  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  if (sess.user.role !== 'superadmin') return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    AuditSubmissions.update(submissionId, { status: 'archived' });
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'soft_delete', entity: 'audit_submission', entity_id: submissionId, detail: `Archived audit submission id=${submissionId}` });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Restore archived audit submission
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submissionId = Number(id);
  const existing = AuditSubmissions.find(submissionId);
  if (!existing) return NextResponse.json({ ok: false, error: 'Audit not found' }, { status: 404 });

  const body = await request.json();
  if (body?.action !== 'restore') return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });

  const sess = await getServerSession(request as NextRequest);
  if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

  try {
    AuditSubmissions.update(submissionId, { status: 'open' });
    const adminName = sess.user.name || 'system';
    logActivity({ user_id: sess.user.id, user_name: adminName, action: 'restore', entity: 'audit_submission', entity_id: submissionId, detail: `Restored audit submission id=${submissionId}` });
    const updated = AuditSubmissions.find(submissionId);
    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Restore failed' }, { status: 500 });
  }
}
