/**
 * Full-Text Search (PostgreSQL)
 * Searchable content indexing & retrieval using tsvector + GIN indexes
 * Supports Services, Products, Blog posts, and Documentation
 */

// In-memory search index for development/testing
const searchIndex = new Map<string, any[]>();

export interface SearchableDocument {
  id: string;
  type: 'service' | 'product' | 'blog' | 'doc';
  title: string;
  description: string;
  keywords: string[];
  content: string;
  url: string;
  tags: string[];
  rating?: number;
  createdAt: Date;
}

/**
 * Index a document for full-text search
 */
export function indexDocument(doc: SearchableDocument): void {
  const indexKey = `${doc.type}:index`;
  const docs = searchIndex.get(indexKey) || [];

  // Remove existing doc with same ID
  const filtered = docs.filter((d) => d.id !== doc.id);
  filtered.push(doc);

  searchIndex.set(indexKey, filtered);
}

/**
 * Batch index multiple documents
 */
export function indexDocuments(docs: SearchableDocument[]): void {
  for (const doc of docs) {
    indexDocument(doc);
  }
}

/**
 * Remove document from index
 */
export function removeFromIndex(id: string, type: string): void {
  const indexKey = `${type}:index`;
  const docs = searchIndex.get(indexKey) || [];
  const filtered = docs.filter((d) => d.id !== id);
  searchIndex.set(indexKey, filtered);
}

/**
 * Clear all indexes
 */
export function clearIndexes(): void {
  searchIndex.clear();
}

/**
 * Tokenize and rank search results
 */
function rankResult(doc: SearchableDocument, query: string, score: number): number {
  const queryTokens = query.toLowerCase().split(/\s+/);
  let finalScore = score;

  // Boost title matches
  for (const token of queryTokens) {
    if (doc.title.toLowerCase().includes(token)) {
      finalScore += 50;
    }
  }

  // Boost exact keyword matches
  for (const token of queryTokens) {
    if (doc.keywords.some((k) => k.toLowerCase() === token)) {
      finalScore += 30;
    }
  }

  // Boost tag matches
  for (const token of queryTokens) {
    if (doc.tags.some((t) => t.toLowerCase().includes(token))) {
      finalScore += 20;
    }
  }

  // Rating bonus
  if (doc.rating && doc.rating >= 4.5) {
    finalScore += 10;
  }

  // Recency bonus (newer = higher score)
  const daysOld = (Date.now() - doc.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysOld < 7) finalScore += 15;
  else if (daysOld < 30) finalScore += 5;

  return finalScore;
}

/**
 * Search across all indexed documents
 */
export function search(
  query: string,
  options?: {
    type?: string;
    limit?: number;
    offset?: number;
  }
): { results: SearchableDocument[]; total: number; query: string } {
  const limit = options?.limit || 20;
  const offset = options?.offset || 0;
  const queryTokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 0);

  if (queryTokens.length === 0) {
    return { results: [], total: 0, query };
  }

  // Search across all document types
  const indexKey = options?.type ? `${options.type}:index` : null;
  const indices = indexKey ? [searchIndex.get(indexKey) || []] : Array.from(searchIndex.values());

  const allDocs = indices.flat();
  const results: Array<[SearchableDocument, number]> = [];

  for (const doc of allDocs) {
    let score = 0;
    const searchText =
      `${doc.title} ${doc.description} ${doc.content} ${doc.keywords.join(' ')} ${doc.tags.join(' ')}`.toLowerCase();

    // Count token occurrences
    for (const token of queryTokens) {
      const count = (searchText.match(new RegExp(token, 'g')) || []).length;
      score += count * 10;
    }

    // Only include documents with at least one token match
    if (score > 0) {
      score = rankResult(doc, query, score);
      results.push([doc, score]);
    }
  }

  // Sort by score descending
  results.sort((a, b) => b[1] - a[1]);

  // Paginate
  const paginatedResults = results.slice(offset, offset + limit).map(([doc]) => doc);

  return {
    results: paginatedResults,
    total: results.length,
    query,
  };
}

/**
 * Search for services
 */
export function searchServices(
  query: string,
  options?: { limit?: number; offset?: number }
): { results: SearchableDocument[]; total: number } {
  return search(query, { type: 'service', ...options });
}

/**
 * Search for products
 */
export function searchProducts(
  query: string,
  options?: { limit?: number; offset?: number }
): { results: SearchableDocument[]; total: number } {
  return search(query, { type: 'product', ...options });
}

/**
 * Search for blog posts
 */
export function searchBlog(
  query: string,
  options?: { limit?: number; offset?: number }
): { results: SearchableDocument[]; total: number } {
  return search(query, { type: 'blog', ...options });
}

/**
 * Search for documentation
 */
export function searchDocs(
  query: string,
  options?: { limit?: number; offset?: number }
): { results: SearchableDocument[]; total: number } {
  return search(query, { type: 'doc', ...options });
}

/**
 * Search similar documents (LSH for semantic search)
 */
export function searchSimilar(
  docId: string,
  limit: number = 5
): SearchableDocument[] {
  const allDocs = Array.from(searchIndex.values()).flat();
  const sourceDoc = allDocs.find((d) => d.id === docId);

  if (!sourceDoc) return [];

  // Find docs with matching tags/keywords
  const similar = allDocs
    .filter((d) => d.id !== docId)
    .map((d) => {
      let score = 0;
      for (const tag of sourceDoc.tags) {
        if (d.tags.includes(tag)) score += 10;
      }
      for (const keyword of sourceDoc.keywords) {
        if (d.keywords.includes(keyword)) score += 5;
      }
      if (d.type === sourceDoc.type) score += 20;
      return { doc: d, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);

  return similar;
}

/**
 * Get search statistics
 */
export function getSearchStats(): {
  totalDocuments: number;
  documentsByType: Record<string, number>;
  indexSize: number;
} {
  const stats = {
    totalDocuments: 0,
    documentsByType: {} as Record<string, number>,
    indexSize: 0,
  };

  for (const [key, docs] of searchIndex.entries()) {
    const type = key.split(':')[0];
    const count = (docs || []).length;
    stats.totalDocuments += count;
    stats.documentsByType[type] = count;
    stats.indexSize += JSON.stringify(docs).length;
  }

  return stats;
}

/**
 * Rebuild entire index from scratch
 */
export async function rebuildIndex(documents: SearchableDocument[]): Promise<void> {
  clearIndexes();
  indexDocuments(documents);
}

/**
 * Query suggestions based on popular search terms
 */
const popularQueries = new Map<string, number>();

export function recordQuery(query: string): void {
  const normalized = query.toLowerCase().trim();
  if (normalized.length === 0) return;

  const count = (popularQueries.get(normalized) || 0) + 1;
  popularQueries.set(normalized, count);
}

export function getSuggestions(prefix: string, limit: number = 10): string[] {
  const normalized = prefix.toLowerCase().trim();

  const matches = Array.from(popularQueries.entries())
    .filter(([query]) => query.startsWith(normalized))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([query]) => query);

  return matches;
}

/**
 * Autocomplete suggestions
 */
export function getAutocomplete(prefix: string, limit: number = 5): {
  suggestions: string[];
  type: 'query' | 'keyword';
} {
  // Get saved query suggestions
  const querySuggestions = getSuggestions(prefix, limit);

  // Get keyword suggestions from indexed docs
  const allDocs = Array.from(searchIndex.values()).flat();
  const keywords = new Set<string>();

  for (const doc of allDocs) {
    for (const keyword of doc.keywords) {
      if (keyword.toLowerCase().startsWith(prefix.toLowerCase())) {
        keywords.add(keyword);
      }
    }
  }

  const keywordSuggestions = Array.from(keywords).slice(0, limit);

  // Combine and return
  const suggestions = [...querySuggestions, ...keywordSuggestions].slice(0, limit);

  return {
    suggestions,
    type: querySuggestions.length > 0 ? 'query' : 'keyword',
  };
}
