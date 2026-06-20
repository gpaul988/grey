/**
 * POST /api/admin/cms/create
 * Create a new CMS page (admin only)
 *
 * Authorization: Bearer <admin-jwt>
 * Body: {
 *   title: string (required)
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

    // Create CMS page
    const data = await CMS.create(req.body);

    return res.status(201).json({
      success: true,
      data,
      message: 'CMS page created successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create CMS page';

    // Handle specific error cases
    if (message.includes('already exists')) {
      return res.status(409).json({ error: message });
    }

    if (message.includes('Validation failed')) {
      return res.status(400).json({ error: message });
    }

    if (message.includes('required')) {
      return res.status(400).json({ error: message });
    }

    console.error('CMS create error:', error);
    return res.status(500).json({ error: message });
  }
}
