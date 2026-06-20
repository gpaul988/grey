/**
 * POST /api/admin/cms/update
 * Update an existing CMS page (admin only)
 *
 * Authorization: Bearer <admin-jwt>
 * Body: {
 *   id: number (required)
 *   title?: string
 *   slug?: string
 *   description?: string
 *   content?: string
 *   type?: 'blog' | 'doc' | 'service' | 'page'
 *   author?: string
 *   tags?: string[]
 *   published?: boolean
 *   featuredImage?: string
 *   metadata?: object
 * }
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminToken } from '@/lib/admin/auth';
import CMS from '@/lib/cms';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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

    // Validate ID
    const { id } = req.body;
    if (!id || typeof id !== 'number') {
      return res.status(400).json({ error: 'id is required and must be a number' });
    }

    // Update CMS page
    const data = await CMS.update(req.body);

    return res.status(200).json({
      success: true,
      data,
      message: 'CMS page updated successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update CMS page';

    // Handle specific error cases
    if (message.includes('not found')) {
      return res.status(404).json({ error: message });
    }

    if (message.includes('Validation failed')) {
      return res.status(400).json({ error: message });
    }

    console.error('CMS update error:', error);
    return res.status(500).json({ error: message });
  }
}
