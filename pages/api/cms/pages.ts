/**
 * GET /api/cms/pages
 * Get published CMS pages (public endpoint)
 *
 * Query params:
 *   type?: 'blog' | 'doc' | 'service' | 'page'
 *   search?: string
 *   limit?: number (default 50, max 100)
 *   offset?: number (default 0)
 *   sortOrder?: 'asc' | 'desc'
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import CMS from '@/lib/cms';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse query parameters
    const { type, search, limit, offset, sortOrder } = req.query;

    const result = await CMS.getPublished({
      type: type ? (type as any) : undefined,
      limit: limit ? Math.min(parseInt(String(limit), 10), 100) : 50,
      offset: offset ? Math.max(parseInt(String(offset), 10), 0) : 0,
    });

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');

    return res.status(200).json({
      success: true,
      data: result.pages,
      pagination: {
        total: result.total,
        limit: limit ? Math.min(parseInt(String(limit), 10), 100) : 50,
        offset: offset ? Math.max(parseInt(String(offset), 10), 0) : 0,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch CMS pages';
    console.error('CMS pages error:', error);
    return res.status(500).json({ error: message });
  }
}
