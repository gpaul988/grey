/**
 * API Endpoint: POST /api/playground/execute
 * Execute GraphQL or REST query
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { executeGraphQLQuery, executeRESTQuery, validateGraphQLQuery } from '@/lib/playground/query-executor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, query, method, url, variables, body, timeout } = req.body;

    if (!type || !['graphql', 'rest'].includes(type)) {
      return res.status(400).json({ error: 'Type must be "graphql" or "rest"' });
    }

    if (type === 'graphql') {
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'GraphQL query is required' });
      }

      const result = await executeGraphQLQuery(query, variables, timeout || 5000);
      return res.status(200).json(result);
    } else {
      // REST
      if (!method || !url) {
        return res.status(400).json({ error: 'Method and URL are required for REST' });
      }

      const result = await executeRESTQuery(method, url, body, timeout || 5000);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error('Query execution error:', error);
    return res.status(500).json({
      error: 'Failed to execute query',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
