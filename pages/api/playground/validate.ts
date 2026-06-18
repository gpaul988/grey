/**
 * API Endpoint: POST /api/playground/validate
 * Validate GraphQL query
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { validateGraphQLQuery } from '@/lib/playground/query-executor';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'GraphQL query is required' });
    }

    const validation = validateGraphQLQuery(query);

    return res.status(200).json({
      success: validation.valid,
      valid: validation.valid,
      errors: validation.errors.map(e => ({ message: e.message })),
    });
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({
      error: 'Failed to validate query',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
