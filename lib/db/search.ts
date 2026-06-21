import { sql } from 'drizzle-orm';
import { getPgPool } from '../db';

export interface SearchResult {
  id: number;
  title: string;
  description?: string;
  type: 'service' | 'blog' | 'audit' | 'doc';
  relevance: number;
  url?: string;
}

/**
 * Full-text search across services, blog posts, and audits
 * Uses PostgreSQL native FTS for performance
 */
export async function fullTextSearch(
  query: string,
  type?: 'service' | 'blog' | 'audit' | 'doc',
  limit: number = 20
): Promise<SearchResult[]> {
  const pool = getPgPool();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  // Build FTS query with OR condition for flexibility
  const tsQuery = searchTerm
    .split(' ')
    .map(word => `${word}:*`)
    .join(' | ');

  let sqlQuery = `
    WITH search_results AS (
      -- Search services
      SELECT 
        id,
        name as title,
        description,
        'service' as type,
        ts_rank(
          to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, '')),
          plainto_tsquery('english', $1)
        ) as relevance,
        '/services/' || slug as url
      FROM services
      WHERE to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, ''))
            @@ plainto_tsquery('english', $1)
      
      UNION ALL
      
      -- Search blog posts
      SELECT 
        id,
        title,
        excerpt as description,
        'blog' as type,
        ts_rank(
          to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, '')),
          plainto_tsquery('english', $1)
        ) as relevance,
        '/blog/' || slug as url
      FROM blog_posts
      WHERE published = true
        AND to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, ''))
            @@ plainto_tsquery('english', $1)
      
      UNION ALL
      
      -- Search audits
      SELECT 
        id,
        name as title,
        description,
        'audit' as type,
        ts_rank(
          to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, '')),
          plainto_tsquery('english', $1)
        ) as relevance,
        '/audit/' || id::text as url
      FROM audits
      WHERE to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, ''))
            @@ plainto_tsquery('english', $1)
    )
    SELECT * FROM search_results
  `;

  // Filter by type if specified
  if (type) {
    sqlQuery += ` WHERE type = $2`;
  }

  sqlQuery += ` ORDER BY relevance DESC LIMIT ${limit}`;

  try {
    const params = type ? [searchTerm, type] : [searchTerm];
    const result = await pool.query(sqlQuery, params);
    return result.rows as SearchResult[];
  } catch (error) {
    console.error('Full-text search error:', error);
    return [];
  }
}

/**
 * Search services by name, description, tags, category
 */
export async function searchServices(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  return fullTextSearch(query, 'service', limit);
}

/**
 * Search published blog posts
 */
export async function searchBlogPosts(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  return fullTextSearch(query, 'blog', limit);
}

/**
 * Search audits and findings
 */
export async function searchAudits(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  return fullTextSearch(query, 'audit', limit);
}

/**
 * Fuzzy search using similarity (trigram)
 * More forgiving than exact FTS (handles typos)
 */
export async function fuzzySearch(
  query: string,
  limit: number = 10,
  threshold: number = 0.3
): Promise<SearchResult[]> {
  const pool = getPgPool();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const sqlQuery = `
    SELECT 
      id,
      name as title,
      description,
      'service' as type,
      similarity(name, $1) as relevance,
      '/services/' || slug as url
    FROM services
    WHERE similarity(name, $1) > $2
    
    UNION ALL
    
    SELECT 
      id,
      title,
      excerpt as description,
      'blog' as type,
      similarity(title, $1) as relevance,
      '/blog/' || slug as url
    FROM blog_posts
    WHERE published = true
      AND similarity(title, $1) > $2
    
    ORDER BY relevance DESC
    LIMIT $3
  `;

  try {
    const result = await pool.query(sqlQuery, [searchTerm, threshold, limit]);
    return result.rows as SearchResult[];
  } catch (error) {
    console.error('Fuzzy search error:', error);
    return [];
  }
}

/**
 * Search with autocomplete suggestions
 */
export async function searchSuggestions(
  query: string,
  limit: number = 5
): Promise<string[]> {
  const pool = getPgPool();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm || searchTerm.length < 1) {
    return [];
  }

  const sqlQuery = `
    (SELECT DISTINCT name as suggestion FROM services WHERE name ILIKE $1 LIMIT $2)
    UNION ALL
    (SELECT DISTINCT title as suggestion FROM blog_posts WHERE published = true AND title ILIKE $1 LIMIT $2)
    UNION ALL
    (SELECT DISTINCT category as suggestion FROM services WHERE category ILIKE $1 LIMIT $2)
    ORDER BY suggestion
    LIMIT $2
  `;

  try {
    const likePattern = `${searchTerm}%`;
    const result = await pool.query(sqlQuery, [likePattern, limit]);
    return result.rows.map(row => row.suggestion);
  } catch (error) {
    console.error('Search suggestions error:', error);
    return [];
  }
}

/**
 * Get search statistics (for analytics)
 */
export async function getSearchStats(): Promise<{
  services: number;
  blogPosts: number;
  audits: number;
}> {
  const pool = getPgPool();

  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM services)::int as services,
        (SELECT COUNT(*) FROM blog_posts WHERE published = true)::int as "blogPosts",
        (SELECT COUNT(*) FROM audits)::int as audits
    `);

    const row = result.rows[0];
    return {
      services: parseInt(row.services, 10) || 0,
      blogPosts: parseInt(row.blogPosts, 10) || 0,
      audits: parseInt(row.audits, 10) || 0,
    };
  } catch (error) {
    console.error('Search stats error:', error);
    return { services: 0, blogPosts: 0, audits: 0 };
  }
}
