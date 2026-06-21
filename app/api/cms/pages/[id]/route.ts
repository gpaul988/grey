import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if ID is numeric (database ID) or slug
    let page;
    
    if (/^\d+$/.test(id)) {
      // Numeric ID
      page = await db
        .select()
        .from(cmsPages)
        .where(eq(cmsPages.id, parseInt(id)));
    } else {
      // Slug
      page = await db
        .select()
        .from(cmsPages)
        .where(eq(cmsPages.slug, id));
    }

    if (!page.length) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Check if published (for public access)
    const pageData = page[0] as any;
    if (!pageData.published) {
      // TODO: Add auth check - allow access if user is admin
      return NextResponse.json(
        { error: 'Page not published' },
        { status: 404 }
      );
    }

    return NextResponse.json({ page: pageData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add super admin authentication check

    const id = parseInt(params.id);
    const body = await req.json();
    const { title, slug, content, published } = body;

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
      .where(eq(cmsPages.id, id))
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
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add super admin authentication check

    const id = parseInt(params.id);

    await db
      .delete(cmsPages)
      .where(eq(cmsPages.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
