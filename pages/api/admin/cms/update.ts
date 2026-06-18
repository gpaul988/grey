import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { slug, title, description, content, type, author, tags, published, featuredImage, metadata } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const updates: any = {};
    if (slug) updates.slug = slug;
    if (title) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (content !== undefined) updates.content = content;
    if (type) updates.type = type;
    if (author) updates.author = author;
    if (tags) updates.tags = tags;
    if (published !== undefined) {
      updates.published = published;
      updates.publishedAt = published ? new Date() : null;
    }
    if (featuredImage !== undefined) updates.featuredImage = featuredImage;
    if (metadata) updates.metadata = metadata;
    updates.updatedAt = new Date();

    const page = await db
      .update(cmsPages)
      .set(updates)
      .where(eq(cmsPages.id, parseInt(id as string)))
      .returning();

    if (page.length === 0) {
      return res.status(404).json({ error: 'CMS page not found' });
    }

    res.status(200).json({ data: page[0], message: 'CMS page updated successfully' });
  } catch (error: any) {
    console.error('CMS update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update CMS page' });
  }
});
