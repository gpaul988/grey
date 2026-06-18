/**
 * API Endpoint: GET /api/demo/status
 * Get demo instance status
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getDemoStatus, getDemoLogs } from '@/lib/demo/demo-manager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { demoId } = req.query;

    if (!demoId || typeof demoId !== 'string') {
      return res.status(400).json({ error: 'Demo ID is required' });
    }

    const instance = getDemoStatus(demoId);
    if (!instance) {
      return res.status(404).json({ error: 'Demo instance not found' });
    }

    const logs = getDemoLogs(demoId);

    return res.status(200).json({
      success: true,
      instance: {
        ...instance,
        createdAt: instance.createdAt.toISOString(),
        expiresAt: instance.expiresAt.toISOString(),
      },
      logs,
    });
  } catch (error) {
    console.error('Demo status error:', error);
    return res.status(500).json({
      error: 'Failed to get demo status',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
