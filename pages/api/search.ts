/**
 * Search API Endpoint
 * Full-text search across services, products, blog, docs
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  search,
  searchServices,
  searchProducts,
  searchBlog,
  searchDocs,
  searchSimilar,
  recordQuery,
  getAutocomplete,
  getSearchStats,
} from '@/lib/search/fts';

interface SearchResponse {
  success: boolean;
  query: string;
  results: any[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      query: '',
      results: [],
      total: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
      error: 'Method not allowed. Use GET.',
    });
  }

  try {
    const { q, type, page = '1', limit = '20', similar } = req.query;

    // Validate query
    const query = (q as string || '').trim();
    if (query.length === 0) {
      return res.status(400).json({
        success: false,
        query: '',
        results: [],
        total: 0,
        page: 1,
        pageSize: parseInt(limit as string),
        hasMore: false,
        error: 'Search query is required',
      });
    }

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(limit as string) || 20));
    const offset = (pageNum - 1) * pageSize;

    // Record query for suggestions
    recordQuery(query);

    // Search by type
    let result: any;
    if (similar) {
      // Similar documents
      const similarDocs = searchSimilar(similar as string, pageSize);
      result = {
        results: similarDocs,
        total: similarDocs.length,
        query,
      };
    } else if (type === 'services') {
      result = searchServices(query, { limit: pageSize, offset });
    } else if (type === 'products') {
      result = searchProducts(query, { limit: pageSize, offset });
    } else if (type === 'blog') {
      result = searchBlog(query, { limit: pageSize, offset });
    } else if (type === 'docs') {
      result = searchDocs(query, { limit: pageSize, offset });
    } else {
      // Global search
      result = search(query, { limit: pageSize, offset });
    }

    // Add response metadata
    const hasMore = offset + pageSize < result.total;

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({
      success: true,
      query,
      results: result.results || [],
      total: result.total || 0,
      page: pageNum,
      pageSize,
      hasMore,
    });
  } catch (error: any) {
    console.error('[Search Error]', error);

    return res.status(500).json({
      success: false,
      query: (req.query.q as string) || '',
      results: [],
      total: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
      error: process.env.NODE_ENV === 'production' ? 'Search error' : error.message,
    });
  }
}
