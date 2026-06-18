/**
 * API Endpoint: POST /api/bench/compare
 * Compare two endpoints
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { benchmarkEndpoint, compareBenchmarks } from '@/lib/bench/benchmark-runner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { baseline, current, iterations } = req.body;

    if (!baseline || !current) {
      return res.status(400).json({ error: 'Baseline and current URLs are required' });
    }

    const iter = Math.min(iterations || 50, 500);

    const baselineResult = await benchmarkEndpoint(baseline, 'GET', iter);
    const currentResult = await benchmarkEndpoint(current, 'GET', iter);

    if (!baselineResult.metrics || !currentResult.metrics) {
      return res.status(500).json({ error: 'Failed to benchmark endpoints' });
    }

    const comparison = compareBenchmarks(baselineResult.metrics, currentResult.metrics);

    return res.status(200).json({
      success: true,
      baseline: baselineResult.metrics,
      current: currentResult.metrics,
      comparison: {
        improvement: comparison.improvement,
        percentage: comparison.percentage,
        faster: comparison.improvement > 0 ? 'current' : 'baseline',
      },
    });
  } catch (error) {
    console.error('Comparison error:', error);
    return res.status(500).json({
      error: 'Failed to compare benchmarks',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
