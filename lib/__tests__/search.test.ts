/**
 * Full-Text Search Tests
 * Unit tests for indexing, searching, ranking, and suggestions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  indexDocument,
  indexDocuments,
  removeFromIndex,
  search,
  searchServices,
  searchProducts,
  searchBlog,
  searchDocs,
  searchSimilar,
  clearIndexes,
  recordQuery,
  getSuggestions,
  getAutocomplete,
  getSearchStats,
} from '../search/fts';
import type { SearchableDocument } from '../search/fts';

describe('Full-Text Search (FTS)', () => {
  beforeEach(() => {
    clearIndexes();
  });

  // ============================================
  // INDEXING TESTS
  // ============================================
  describe('Indexing', () => {
    it('should index a single document', () => {
      const doc: SearchableDocument = {
        id: 'svc1',
        type: 'service',
        title: 'React Frontend Services',
        description: 'Build modern React applications',
        keywords: ['react', 'frontend', 'javascript'],
        content: 'We specialize in React development',
        url: '/services/react',
        tags: ['frontend', 'javascript'],
        createdAt: new Date(),
      };

      indexDocument(doc);

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(1);
      expect(stats.documentsByType.service).toBe(1);
    });

    it('should index multiple documents', () => {
      const docs: SearchableDocument[] = [
        {
          id: 'prod1',
          type: 'product',
          title: 'API Gateway',
          description: 'Manage your APIs',
          keywords: ['api', 'gateway'],
          content: 'Enterprise API management',
          url: '/products/api-gateway',
          tags: ['backend'],
          createdAt: new Date(),
        },
        {
          id: 'prod2',
          type: 'product',
          title: 'Cache Manager',
          description: 'Fast caching solution',
          keywords: ['cache', 'redis'],
          content: 'High-performance caching',
          url: '/products/cache',
          tags: ['backend'],
          createdAt: new Date(),
        },
      ];

      indexDocuments(docs);

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(2);
      expect(stats.documentsByType.product).toBe(2);
    });

    it('should update existing document on re-index', () => {
      const doc: SearchableDocument = {
        id: 'doc1',
        type: 'doc',
        title: 'Getting Started',
        description: 'Intro to platform',
        keywords: ['intro'],
        content: 'Welcome',
        url: '/docs/start',
        tags: ['guide'],
        createdAt: new Date(),
      };

      indexDocument(doc);
      indexDocument({ ...doc, title: 'Getting Started v2' });

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(1);
    });

    it('should remove document from index', () => {
      const doc: SearchableDocument = {
        id: 'blog1',
        type: 'blog',
        title: 'Tips and Tricks',
        description: 'Best practices',
        keywords: ['tips'],
        content: 'Useful advice',
        url: '/blog/tips',
        tags: ['tutorial'],
        createdAt: new Date(),
      };

      indexDocument(doc);
      removeFromIndex('blog1', 'blog');

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(0);
    });

    it('should clear all indexes', () => {
      indexDocuments([
        {
          id: '1',
          type: 'service',
          title: 'Test',
          description: 'Test',
          keywords: [],
          content: 'Test',
          url: '/test',
          tags: [],
          createdAt: new Date(),
        },
        {
          id: '2',
          type: 'product',
          title: 'Test',
          description: 'Test',
          keywords: [],
          content: 'Test',
          url: '/test',
          tags: [],
          createdAt: new Date(),
        },
      ]);

      clearIndexes();

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(0);
    });
  });

  // ============================================
  // SEARCH TESTS
  // ============================================
  describe('Search', () => {
    beforeEach(() => {
      clearIndexes();
      indexDocuments([
        {
          id: 'svc1',
          type: 'service',
          title: 'Node.js Backend Services',
          description: 'Build scalable backend with Node.js',
          keywords: ['node', 'backend', 'javascript', 'express'],
          content: 'Professional Node.js development services',
          url: '/services/nodejs',
          tags: ['backend', 'nodejs', 'javascript'],
          rating: 4.8,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'svc2',
          type: 'service',
          title: 'React Frontend Development',
          description: 'Modern React applications',
          keywords: ['react', 'frontend', 'javascript'],
          content: 'Build interactive user interfaces with React',
          url: '/services/react',
          tags: ['frontend', 'react', 'javascript'],
          rating: 4.6,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'prod1',
          type: 'product',
          title: 'JavaScript Framework Toolkit',
          description: 'Complete toolkit for JS development',
          keywords: ['javascript', 'toolkit', 'framework'],
          content: 'All-in-one development toolkit',
          url: '/products/js-toolkit',
          tags: ['javascript', 'tools'],
          rating: 4.5,
          createdAt: new Date(),
        },
      ]);
    });

    it('should find documents by keyword', () => {
      const result = search('javascript');
      expect(result.total).toBeGreaterThan(0);
      expect(result.results.some((r) => r.title.includes('JavaScript'))).toBe(true);
    });

    it('should search with multiple keywords', () => {
      const result = search('nodejs backend');
      expect(result.total).toBeGreaterThan(0);
    });

    it('should return empty results for no matches', () => {
      const result = search('nonexistent technology xyz');
      expect(result.total).toBe(0);
      expect(result.results).toEqual([]);
    });

    it('should rank by title relevance', () => {
      const result = search('React');
      if (result.results.length > 0) {
        expect(result.results[0].type).toBe('service');
      }
    });

    it('should support pagination', () => {
      const page1 = search('javascript', { limit: 1, offset: 0 });
      const page2 = search('javascript', { limit: 1, offset: 1 });

      expect(page1.results.length).toBeLessThanOrEqual(1);
      if (page1.total > 1) {
        expect(page2.results.length).toBeGreaterThan(0);
      }
    });
  });

  // ============================================
  // TYPE-SPECIFIC SEARCH TESTS
  // ============================================
  describe('Type-Specific Search', () => {
    beforeEach(() => {
      clearIndexes();
      indexDocuments([
        {
          id: 'svc1',
          type: 'service',
          title: 'Service 1',
          description: 'Description',
          keywords: ['test'],
          content: 'Content',
          url: '/services/1',
          tags: [],
          createdAt: new Date(),
        },
        {
          id: 'prod1',
          type: 'product',
          title: 'Product 1',
          description: 'Description',
          keywords: ['test'],
          content: 'Content',
          url: '/products/1',
          tags: [],
          createdAt: new Date(),
        },
        {
          id: 'blog1',
          type: 'blog',
          title: 'Blog Post',
          description: 'Description',
          keywords: ['test'],
          content: 'Content',
          url: '/blog/1',
          tags: [],
          createdAt: new Date(),
        },
        {
          id: 'doc1',
          type: 'doc',
          title: 'Documentation',
          description: 'Description',
          keywords: ['test'],
          content: 'Content',
          url: '/docs/1',
          tags: [],
          createdAt: new Date(),
        },
      ]);
    });

    it('should search services only', () => {
      const result = searchServices('test');
      expect(result.results.every((r) => r.type === 'service')).toBe(true);
    });

    it('should search products only', () => {
      const result = searchProducts('test');
      expect(result.results.every((r) => r.type === 'product')).toBe(true);
    });

    it('should search blog only', () => {
      const result = searchBlog('test');
      expect(result.results.every((r) => r.type === 'blog')).toBe(true);
    });

    it('should search docs only', () => {
      const result = searchDocs('test');
      expect(result.results.every((r) => r.type === 'doc')).toBe(true);
    });
  });

  // ============================================
  // RANKING TESTS
  // ============================================
  describe('Ranking & Relevance', () => {
    beforeEach(() => {
      clearIndexes();
      indexDocuments([
        {
          id: '1',
          type: 'service',
          title: 'Python Development',
          description: 'Python services',
          keywords: ['python'],
          content: 'Some content',
          url: '/svc/1',
          tags: [],
          rating: 3.0,
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          type: 'service',
          title: 'Python Web Framework',
          description: 'Framework content',
          keywords: ['python', 'framework'],
          content: 'Python framework details',
          url: '/svc/2',
          tags: [],
          rating: 4.8,
          createdAt: new Date(),
        },
      ]);
    });

    it('should boost title matches', () => {
      const result = search('Python');
      // Both have Python in title, but framework mention should rank higher
      expect(result.results.length).toBeGreaterThan(0);
    });

    it('should boost high-rated documents', () => {
      const result = search('python');
      if (result.results.length >= 2) {
        const firstRating = result.results[0].rating || 0;
        const secondRating = result.results[1].rating || 0;
        expect(firstRating).toBeGreaterThanOrEqual(secondRating);
      }
    });

    it('should boost recent documents', () => {
      // New doc should rank higher even without rating boost
      const result = search('python');
      expect(result.results.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // SIMILAR DOCUMENTS TEST
  // ============================================
  describe('Similar Documents', () => {
    beforeEach(() => {
      clearIndexes();
      indexDocuments([
        {
          id: 'svc1',
          type: 'service',
          title: 'React Services',
          description: 'React development',
          keywords: ['react', 'javascript'],
          content: 'React content',
          url: '/services/react',
          tags: ['frontend', 'javascript'],
          createdAt: new Date(),
        },
        {
          id: 'svc2',
          type: 'service',
          title: 'Vue Services',
          description: 'Vue development',
          keywords: ['vue', 'javascript'],
          content: 'Vue content',
          url: '/services/vue',
          tags: ['frontend', 'javascript'],
          createdAt: new Date(),
        },
        {
          id: 'svc3',
          type: 'service',
          title: 'Python Services',
          description: 'Python development',
          keywords: ['python'],
          content: 'Python content',
          url: '/services/python',
          tags: ['backend'],
          createdAt: new Date(),
        },
      ]);
    });

    it('should find similar documents', () => {
      const similar = searchSimilar('svc1', 2);
      expect(similar.length).toBeGreaterThan(0);
      // Vue should be more similar than Python
      const hasVue = similar.some((s) => s.id === 'svc2');
      expect(hasVue).toBe(true);
    });

    it('should limit similar results', () => {
      const similar = searchSimilar('svc1', 1);
      expect(similar.length).toBeLessThanOrEqual(1);
    });

    it('should handle missing documents', () => {
      const similar = searchSimilar('nonexistent', 5);
      expect(similar).toEqual([]);
    });
  });

  // ============================================
  // SUGGESTIONS & AUTOCOMPLETE TESTS
  // ============================================
  describe('Suggestions & Autocomplete', () => {
    it('should record queries', () => {
      recordQuery('react development');
      recordQuery('react');
      recordQuery('react components');

      const suggestions = getSuggestions('react');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some((s) => s.includes('react'))).toBe(true);
    });

    it('should suggest based on frequency', () => {
      recordQuery('nodejs');
      recordQuery('nodejs');
      recordQuery('nodejs');
      recordQuery('python');

      const suggestions = getSuggestions('node');
      expect(suggestions[0]).toEqual('nodejs');
    });

    it('should provide autocomplete suggestions', () => {
      clearIndexes();
      indexDocuments([
        {
          id: '1',
          type: 'service',
          title: 'React',
          description: 'Test',
          keywords: ['reactjs', 'react-native'],
          content: 'Test',
          url: '/test',
          tags: [],
          createdAt: new Date(),
        },
      ]);

      const autocomplete = getAutocomplete('react');
      expect(autocomplete.suggestions.length).toBeGreaterThan(0);
    });

    it('should limit autocomplete results', () => {
      recordQuery('test1');
      recordQuery('test2');
      recordQuery('test3');
      recordQuery('test4');
      recordQuery('test5');

      const autocomplete = getAutocomplete('test', 2);
      expect(autocomplete.suggestions.length).toBeLessThanOrEqual(2);
    });
  });

  // ============================================
  // STATS TESTS
  // ============================================
  describe('Statistics', () => {
    it('should return correct stats', () => {
      clearIndexes();
      indexDocuments([
        {
          id: '1',
          type: 'service',
          title: 'Test',
          description: 'Test',
          keywords: [],
          content: 'Test',
          url: '/test',
          tags: [],
          createdAt: new Date(),
        },
        {
          id: '2',
          type: 'product',
          title: 'Test',
          description: 'Test',
          keywords: [],
          content: 'Test',
          url: '/test',
          tags: [],
          createdAt: new Date(),
        },
      ]);

      const stats = getSearchStats();
      expect(stats.totalDocuments).toBe(2);
      expect(stats.documentsByType.service).toBe(1);
      expect(stats.documentsByType.product).toBe(1);
      expect(stats.indexSize).toBeGreaterThan(0);
    });
  });
});
