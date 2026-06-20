/**
 * GET /api/cms/[slug]
 * Get a single published CMS page by slug (public endpoint)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import CMS from '@/lib/cms';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'slug is required' });
    }

    const page = await CMS.getBySlug(slug);

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Only serve published pages
    if (!page.published) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch CMS page';
    console.error('CMS slug error:', error);
    return res.status(500).json({ error: message });
  }
}
