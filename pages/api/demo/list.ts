/**
 * API Endpoint: GET /api/demo/list
 * List all active demo instances
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { listActiveDemos, getDemoStats, cleanupExpiredDemos } from '@/lib/demo/demo-manager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Cleanup expired demos first
    const cleaned = cleanupExpiredDemos();

    const activeDemos = listActiveDemos();
    const stats = getDemoStats();

    return res.status(200).json({
      success: true,
      demos: activeDemos.map(d => ({
        ...d,
        createdAt: d.createdAt.toISOString(),
        expiresAt: d.expiresAt.toISOString(),
      })),
      stats: {
        ...stats,
        justCleaned: cleaned,
      },
    });
  } catch (error) {
    console.error('Demo list error:', error);
    return res.status(500).json({
      error: 'Failed to list demos',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
