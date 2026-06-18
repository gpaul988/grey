/**
 * Search Autocomplete Endpoint
 * Query suggestions and keyword autocomplete
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAutocomplete } from '@/lib/search/fts';

interface AutocompleteResponse {
  success: boolean;
  prefix: string;
  suggestions: string[];
  type: 'query' | 'keyword';
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AutocompleteResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      prefix: '',
      suggestions: [],
      type: 'query',
      error: 'Method not allowed. Use GET.',
    });
  }

  try {
    const { prefix = '', limit = '10' } = req.query;

    const prefixStr = (prefix as string).trim();
    if (prefixStr.length < 1) {
      return res.status(400).json({
        success: false,
        prefix: '',
        suggestions: [],
        type: 'query',
        error: 'Prefix must be at least 1 character',
      });
    }

    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 10));

    const result = getAutocomplete(prefixStr, limitNum);

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    return res.status(200).json({
      success: true,
      prefix: prefixStr,
      suggestions: result.suggestions,
      type: result.type,
    });
  } catch (error: any) {
    console.error('[Autocomplete Error]', error);

    return res.status(500).json({
      success: false,
      prefix: (req.query.prefix as string) || '',
      suggestions: [],
      type: 'query',
      error: process.env.NODE_ENV === 'production' ? 'Autocomplete error' : error.message,
    });
  }
}
