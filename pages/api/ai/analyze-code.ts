/**
 * API Endpoint: POST /api/ai/analyze-code
 * Analyze code snippet for patterns and issues
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeCode, getRecommendations } from '@/lib/ai/code-analyzer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Code snippet is required' });
    }

    if (code.length > 100000) {
      return res.status(400).json({ error: 'Code snippet too large (max 100KB)' });
    }

    const analysis = analyzeCode(code);
    const recommendations = getRecommendations(analysis);

    return res.status(200).json({
      success: true,
      analysis: {
        ...analysis,
        recommendations,
      },
    });
  } catch (error) {
    console.error('Code analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze code',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
