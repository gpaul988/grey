/**
 * CMS page create — SQLite-backed.
 *
 * The legacy implementation targeted a Postgres/Drizzle `cmsPages` table that
 * does not exist at runtime. CMS "pages" of type `blog`/`doc`/`page`/`service`
 * are stored in the SQLite `blog_posts` table via the Admin/models BlogPosts
 * repo. This route now writes there.
 *
 * POST /api/admin/cms/create
 *   Authorization: Bearer <admin-jwt>
 *   body: { slug, title, description?, content?, type, author?, tags?, published?, featuredImage? }
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminToken } from '@/lib/admin/auth';
import { BlogPosts, logActivity } from '@/Admin/models';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const user = verifyAdminToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  try {
    const {
      slug,
      title,
      description,
      content,
      type = 'page',
      author,
      tags,
      published,
      featuredImage,
    } = req.body ?? {};

    if (!title) return res.status(400).json({ error: 'title is required' });

    const validTypes = ['blog', 'doc', 'service', 'page'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}` });
    }

    const finalSlug = (slug && String(slug).trim()) || slugify(String(title));
    const isPublished = published === true || published === 'true' || published === 1;

    const post = BlogPosts.create({
      title,
      slug: finalSlug,
      excerpt: description ?? null,
      body: content ?? null,
      cover: featuredImage ?? null,
      author: author || 'Admin',
      tags: JSON.stringify(Array.isArray(tags) ? tags : []),
      status: isPublished ? 'published' : 'draft',
      published_at: isPublished ? new Date().toISOString() : null,
    });

    logActivity({
      user_id: Number(user.id) || null,
      user_name: user.name,
      action: 'create',
      entity: 'cms',
      entity_id: (post as { id?: number })?.id,
      detail: `CMS ${type} "${title}" created`,
    });

    return res.status(201).json({ data: post, message: 'CMS page created successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create CMS page';
    if (/UNIQUE constraint failed/i.test(msg)) {
      return res.status(409).json({ error: 'slug already exists' });
    }
    console.error('CMS create error:', error);
    return res.status(500).json({ error: msg });
  }
}
