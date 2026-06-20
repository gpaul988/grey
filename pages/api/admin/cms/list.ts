/**
 * GET /api/admin/cms/list
 * List CMS pages with filtering
 *
 * Authorization: Bearer <admin-jwt>
 * Query params:
 *   type?: 'blog' | 'doc' | 'service' | 'page'
 *   published?: 'true' | 'false'
 *   search?: string
 *   limit?: number (default 50, max 100)
 *   offset?: number (default 0)
 *   sortBy?: 'createdAt' | 'publishedAt' | 'title'
 *   sortOrder?: 'asc' | 'desc'
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminToken } from '@/lib/admin/auth';
import CMS from '@/lib/cms';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const user = verifyAdminToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Parse query parameters
    const { type, published, search, limit, offset, sortBy, sortOrder } = req.query;

    const result = await CMS.list({
      type: type ? (type as any) : undefined,
      published: published === 'true' ? true : published === 'false' ? false : undefined,
      search: search ? String(search) : undefined,
      limit: limit ? Math.min(parseInt(String(limit), 10), 100) : 50,
      offset: offset ? Math.max(parseInt(String(offset), 10), 0) : 0,
      sortBy: sortBy ? (sortBy as any) : 'createdAt',
      sortOrder: sortOrder === 'asc' ? 'asc' : 'desc',
    });

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
    const message = error instanceof Error ? error.message : 'Failed to list CMS pages';
    console.error('CMS list error:', error);
    return res.status(500).json({ error: message });
  }
}
