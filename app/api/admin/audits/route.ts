import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getServerSession } from '@/lib/admin/server-auth';
import type { NextRequest as NR } from 'next/server';
import { canAccess } from '@/lib/admin/access';
import { logActivity } from '@/Admin/models';

// GET all audit submissions
export async function GET(req: NextRequest) {
  try {
    const sess = await getServerSession(req as NR);
    if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(auditSubmissions);

    if (status) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.where(eq(auditSubmissions.status, status)) as any;
    }

    if (priority) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.where(eq(auditSubmissions.priority, priority)) as any;
    }

    const submissions = await query
      .orderBy(desc(auditSubmissions.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ submissions, count: submissions.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching audit submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// UPDATE submission status/notes
export async function PATCH(req: NextRequest) {
  try {
    const sess = await getServerSession(req as NR);
    if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const { id, status, adminNotes, proposedSolution } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID required' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {
      updatedAt: new Date(),
    };

    if (status) updates.status = status;
    if (adminNotes) updates.adminNotes = adminNotes;
    if (proposedSolution) updates.proposedSolution = proposedSolution;
    if (status && status !== 'new') {
      updates.respondedAt = new Date();
    }

    const result = await db
      .update(auditSubmissions)
      .set(updates)
      .where(eq(auditSubmissions.id, parseInt(id)))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    logActivity({ user_id: sess.user.id, user_name: sess.user.name, action: 'update', entity: 'audit_submission', entity_id: parseInt(id), detail: `Updated audit submission ${id}` });

    return NextResponse.json(
      {
        success: true,
        submission: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

// DELETE submission
export async function DELETE(req: NextRequest) {
  try {
    const sess = await getServerSession(req as NR);
    if (!sess || !sess.user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    if (!canAccess(sess.user.role, 'review_audits')) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID required' },
        { status: 400 }
      );
    }

    await db
      .delete(auditSubmissions)
      .where(eq(auditSubmissions.id, parseInt(id)));

    logActivity({ user_id: sess.user.id, user_name: sess.user.name, action: 'delete', entity: 'audit_submission', entity_id: parseInt(id), detail: `Deleted audit submission ${id}` });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
