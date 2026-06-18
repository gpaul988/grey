/**
 * API Endpoint: POST /api/demo/start
 * Start a new demo instance
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { startDemo } from '@/lib/demo/demo-manager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { serviceType, timeout, maxInstances } = req.body;

    if (!serviceType || typeof serviceType !== 'string') {
      return res.status(400).json({ error: 'Service type is required' });
    }

    // Validate service type
    const validServices = ['react', 'nodejs', 'python', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt'];
    if (!validServices.includes(serviceType.toLowerCase())) {
      return res.status(400).json({
        error: `Invalid service type. Allowed: ${validServices.join(', ')}`,
      });
    }

    const instance = await startDemo({
      serviceType: serviceType.toLowerCase(),
      timeout: timeout ? Math.min(timeout, 120) : 60, // Max 120 minutes
      maxInstances: maxInstances || 10,
    });

    return res.status(201).json({
      success: true,
      demo: instance,
    });
  } catch (error) {
    console.error('Demo start error:', error);
    return res.status(500).json({
      error: 'Failed to start demo',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
