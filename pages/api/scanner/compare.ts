/**
 * API Endpoint: POST /api/scanner/compare
 * Compare tech stacks of two websites
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { detectTechStack, compareTechStacks } from '@/lib/scanner/tech-detector';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url1, url2 } = req.body;

    if (!url1 || !url2) {
      return res.status(400).json({ error: 'Both URLs are required' });
    }

    const stack1 = await detectTechStack(url1);
    const stack2 = await detectTechStack(url2);
    const comparison = compareTechStacks(stack1, stack2);

    return res.status(200).json({
      success: true,
      stack1,
      stack2,
      comparison,
    });
  } catch (error) {
    console.error('Comparison error:', error);
    return res.status(400).json({
      error: 'Failed to compare tech stacks',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
