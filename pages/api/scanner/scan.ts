/**
 * API Endpoint: POST /api/scanner/scan
 * Scan website for tech stack
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { detectTechStack } from '@/lib/scanner/tech-detector';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await detectTechStack(url);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Tech scan error:', error);
    return res.status(400).json({
      error: 'Failed to scan website',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
