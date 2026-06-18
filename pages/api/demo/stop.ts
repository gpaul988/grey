/**
 * API Endpoint: POST /api/demo/stop
 * Stop a demo instance
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { stopDemo } from '@/lib/demo/demo-manager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { demoId } = req.body;

    if (!demoId || typeof demoId !== 'string') {
      return res.status(400).json({ error: 'Demo ID is required' });
    }

    const stopped = await stopDemo(demoId);
    if (!stopped) {
      return res.status(404).json({ error: 'Demo instance not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Demo ${demoId} stopped`,
    });
  } catch (error) {
    console.error('Demo stop error:', error);
    return res.status(500).json({
      error: 'Failed to stop demo',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
