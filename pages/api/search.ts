import type { NextApiRequest, NextApiResponse } from 'next';
import { fullTextSearch, fuzzySearch, searchSuggestions, getSearchStats, SearchResult } from '@/lib/db/search';

interface SearchResponse {
  success: boolean;
  query: string;
  results: SearchResult[];
  count: number;
  took?: number; // milliseconds
  error?: string;
}

interface SuggestionsResponse {
  success: boolean;
  suggestions: string[];
  query: string;
}

interface StatsResponse {
  success: boolean;
  stats: {
    services: number;
    blogPosts: number;
    audits: number;
  };
}

type ApiResponse = SearchResponse | SuggestionsResponse | StatsResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    } as any);
  }

  // Handle suggestions endpoint
  if (req.query.action === 'suggestions') {
    const query = (req.query.q as string)?.trim() || '';

    if (!query || query.length < 1) {
      return res.status(400).json({
        success: false,
        suggestions: [],
        query: '',
      } as SuggestionsResponse);
    }

    try {
      const suggestions = await searchSuggestions(query, 10);
      return res.status(200).json({
        success: true,
        suggestions,
        query,
      } as SuggestionsResponse);
    } catch (error) {
      console.error('Suggestions error:', error);
      return res.status(500).json({
        success: false,
        suggestions: [],
        query,
      } as SuggestionsResponse);
    }
  }

  // Handle stats endpoint
  if (req.query.action === 'stats') {
    try {
      const stats = await getSearchStats();
      return res.status(200).json({
        success: true,
        stats,
      } as StatsResponse);
    } catch (error) {
      console.error('Stats error:', error);
      return res.status(500).json({
        success: false,
        stats: { services: 0, blogPosts: 0, audits: 0 },
      } as StatsResponse);
    }
  }

  // Handle main search
  const query = (req.query.q as string)?.trim() || '';
  const type = (req.query.type as any)?.toLowerCase();
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100); // Max 100
  const fuzzy = req.query.fuzzy === 'true';

  // Validate query
  if (!query || query.length < 2) {
    return res.status(400).json({
      success: false,
      query,
      results: [],
      count: 0,
      error: 'Query must be at least 2 characters',
    } as SearchResponse);
  }

  // Validate type if provided
  const validTypes = ['service', 'blog', 'audit', 'doc'];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      query,
      results: [],
      count: 0,
      error: `Type must be one of: ${validTypes.join(', ')}`,
    } as SearchResponse);
  }

  try {
    const startTime = Date.now();

    // Use fuzzy search or full-text search
    const results = fuzzy
      ? await fuzzySearch(query, limit)
      : await fullTextSearch(query, type, limit);

    const took = Date.now() - startTime;

    return res.status(200).json({
      success: true,
      query,
      results,
      count: results.length,
      took,
    } as SearchResponse);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      query,
      results: [],
      count: 0,
      error: 'Search failed',
    } as SearchResponse);
  }
}
