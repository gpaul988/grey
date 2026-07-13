import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyAdminToken } from '@/lib/admin/auth';

/**
 * GET all CMS pages
 * - Public endpoint (returns only published pages)
 * - Admin endpoint (returns all pages when authenticated)
 */
export async function GET(req: NextRequest) {
  try {
    // Check if user is admin by looking for auth header
    // For now, return all pages - TODO: Add auth check
    const allPages = await db
      .select()
      .from(cmsPages)
      .orderBy(desc(cmsPages.updatedAt));

    // Filter to published only for public
    const isAdmin = req.headers.get('x-admin-check') === 'true'; // TODO: Proper auth
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages = isAdmin ? allPages : allPages.filter((p: any) => p.published);

    return NextResponse.json({ pages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

/**
 * POST create new CMS page
 * - Super Admin only
 */
export async function POST(req: NextRequest) {
  try {
    // Verify super admin authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - no token' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const user = verifyAdminToken(token);

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Unauthorized - super admin only' }, { status: 403 });
    }

    const body = await req.json();
    const { title, slug, content, published } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await db
      .select()
      .from(cmsPages)
      .where(eq(cmsPages.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Create page
    const result = await db
      .insert(cmsPages)
      .values({
        title,
        slug,
        content,
        published: published || false,
      })
      .returning();

    return NextResponse.json(
      { success: true, page: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}

/**
 * PATCH update page by ID
 * - Super Admin only
 */
export async function PATCH(req: NextRequest) {
  try {
    // Verify super admin authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - no token' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const user = verifyAdminToken(token);

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Unauthorized - super admin only' }, { status: 403 });
    }

    const body = await req.json();
    const { id, title, slug, content, published } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Page ID required' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updates.title = title;
    if (slug !== undefined) updates.slug = slug;
    if (content !== undefined) updates.content = content;
    if (published !== undefined) updates.published = published;

    const result = await db
      .update(cmsPages)
      .set(updates)
      .where(eq(cmsPages.id, parseInt(id)))
      .returning();

    if (!result.length) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, page: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

/**
 * DELETE page by ID
 * - Super Admin only
 */
export async function DELETE(req: NextRequest) {
  try {
    // Verify super admin authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - no token' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const user = verifyAdminToken(token);

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Unauthorized - super admin only' }, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Page ID required' },
        { status: 400 }
      );
    }

    await db
      .delete(cmsPages)
      .where(eq(cmsPages.id, parseInt(id)));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
