/**
 * API Endpoint: POST /api/bench/run
 * Run benchmark on endpoint
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { benchmarkEndpoint } from '@/lib/bench/benchmark-runner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, method, iterations } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await benchmarkEndpoint(url, method || 'GET', Math.min(iterations || 50, 1000));

    return res.status(200).json({
      success: result.success,
      metrics: result.metrics,
      error: result.error,
    });
  } catch (error) {
    console.error('Benchmark error:', error);
    return res.status(500).json({
      error: 'Failed to run benchmark',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
