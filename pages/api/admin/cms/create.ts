import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { withAuth } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug, title, description, content, type, author, tags, published, featuredImage, metadata } = req.body;

    if (!slug || !title || !type) {
      return res.status(400).json({ error: 'slug, title, and type are required' });
    }

    const validTypes = ['blog', 'doc', 'service', 'page'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}` });
    }

    const page = await db.insert(cmsPages).values({
      slug,
      title,
      description,
      content,
      type,
      author: author || 'Admin',
      tags: tags || [],
      published: published || false,
      publishedAt: published ? new Date() : null,
      featuredImage,
      metadata: metadata || {},
    }).returning();

    res.status(201).json({ data: page[0], message: 'CMS page created successfully' });
  } catch (error: any) {
    console.error('CMS create error:', error);
    if (error.message?.includes('duplicate key')) {
      return res.status(400).json({ error: 'slug already exists' });
    }
    res.status(500).json({ error: error.message || 'Failed to create CMS page' });
  }
});
