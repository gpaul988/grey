import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { QueryResult } from 'pg';
import { trackEvent, getEventStats, getCohortData } from '@/lib/analytics';

// Mock database and redis
vi.mock('@/lib/db', () => ({
  getPgPool: vi.fn(),
  db: {
    query: vi.fn(),
  },
}));

vi.mock('@/lib/db-raw', () => ({
  query: vi.fn(),
}));

vi.mock('@/lib/redis-client', () => ({
  default: {
    lpush: vi.fn(),
    expire: vi.fn(),
    set: vi.fn(),
    get: vi.fn(),
    del: vi.fn(),
  },
}));

import { db, getPgPool } from '@/lib/db';
import { query as rawQuery } from '@/lib/db-raw';
import redis from '@/lib/redis-client';

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mocks for db.query and rawQuery
    vi.mocked(db).query.mockResolvedValue({ rows: [] } as unknown as QueryResult<any>);
    vi.mocked(rawQuery).mockResolvedValue({ rows: [] } as unknown as QueryResult<any>);
  });

  describe('trackEvent', () => {
    it('should track a page view event', async () => {
      const event = {
        sessionId: 'session-1',
        eventType: 'page_view' as const,
        eventName: 'home_page_view',
        properties: { path: '/' },
        url: 'https://example.com',
        userAgent: 'Mozilla/5.0',
        ip: '127.0.0.1',
      };

      vi.mocked(redis).lpush.mockResolvedValue(1);
      vi.mocked(redis).expire.mockResolvedValue(1);

      const result = await trackEvent(event);

      expect(result.id).toBeDefined();
      expect(result.sessionId).toBe('session-1');
      expect(result.eventType).toBe('page_view');
      expect(result.timestamp).toBeDefined();
    });

    it('should track a conversion event', async () => {
      const event = {
        sessionId: 'session-2',
        eventType: 'conversion' as const,
        eventName: 'product_purchased',
        properties: { productId: '123', amount: 99.99 },
        url: 'https://example.com/checkout',
        userAgent: 'Mozilla/5.0',
        ip: '127.0.0.1',
        userId: 'user-1',
      };

      vi.mocked(redis).lpush.mockResolvedValue(1);
      vi.mocked(redis).expire.mockResolvedValue(1);

      const result = await trackEvent(event);

      expect(result.eventType).toBe('conversion');
      expect(result.userId).toBe('user-1');
    });

    it('should store event in redis with 24h TTL', async () => {
      const event = {
        sessionId: 'session-3',
        eventType: 'click' as const,
        eventName: 'button_click',
        properties: {},
        url: 'https://example.com',
        userAgent: 'Mozilla/5.0',
        ip: '127.0.0.1',
      };

      vi.mocked(redis).lpush.mockResolvedValue(1);
      vi.mocked(redis).expire.mockResolvedValue(1);

      await trackEvent(event);

      expect(vi.mocked(redis).lpush).toHaveBeenCalled();
      expect(vi.mocked(redis).expire).toHaveBeenCalledWith(expect.stringContaining('analytics:'), 86400);
    });
  });

  describe('getEventStats', () => {
    it('should return event statistics', async () => {
      const mockResult = {
        rows: [
          { event_type: 'page_view', count: '100' },
          { event_type: 'conversion', count: '10' },
          { event_type: 'click', count: '50' },
        ],
      };

      vi.mocked(rawQuery).mockResolvedValue(mockResult as unknown as QueryResult<any>);

      const stats = await getEventStats('30d');

      expect(stats.page_view).toBe(100);
      expect(stats.conversion).toBe(10);
      expect(stats.click).toBe(50);
    });

    it('should support different timeframes', async () => {
      vi.mocked(rawQuery).mockResolvedValue({ rows: [] } as unknown as QueryResult<any>);

      await getEventStats('24h');
      await getEventStats('7d');
      await getEventStats('30d');

      expect(vi.mocked(rawQuery)).toHaveBeenCalledTimes(3);
    });

    it('should return empty object on error', async () => {
      vi.mocked(rawQuery).mockRejectedValue(new Error('DB error'));

      const stats = await getEventStats('30d');

      expect(stats).toEqual({});
    });
  });

  describe('getCohortData', () => {
    it('should return cohort breakdown by property', async () => {
      const mockResult = {
        rows: [
          { cohort_value: 'mobile', count: '500' },
          { cohort_value: 'desktop', count: '300' },
          { cohort_value: 'tablet', count: '200' },
        ],
      };

      vi.mocked(rawQuery).mockResolvedValue(mockResult as unknown as QueryResult<any>);

      const cohorts = await getCohortData('device', '30d');

      expect(cohorts.mobile).toBe(500);
      expect(cohorts.desktop).toBe(300);
      expect(cohorts.tablet).toBe(200);
    });

    it('should handle unknown cohort values', async () => {
      const mockResult = {
        rows: [
          { cohort_value: 'known', count: '100' },
          { cohort_value: null, count: '10' },
        ],
      };

      vi.mocked(rawQuery).mockResolvedValue(mockResult as unknown as QueryResult<any>);

      const cohorts = await getCohortData('channel', '30d');

      expect(cohorts.known).toBe(100);
      expect(cohorts.unknown).toBe(10);
    });

    it('should return empty object on error', async () => {
      vi.mocked(rawQuery).mockRejectedValue(new Error('DB error'));

      const cohorts = await getCohortData('property', '30d');

      expect(cohorts).toEqual({});
    });
  });

  // TODO: getMetricsWithCache - function not yet implemented
  describe.skip('getMetricsWithCache', () => {
    it('should return cached metrics if available', async () => {
      // Skipped - function not implemented
    });

    it('should fetch fresh metrics if cache misses', async () => {
      // Skipped - function not implemented
    });
  });

  describe('edge cases', () => {
    it('should handle empty results gracefully', async () => {
      vi.mocked(rawQuery).mockResolvedValue({ rows: [] } as unknown as QueryResult<any>);

      const stats = await getEventStats('30d');
      expect(stats).toEqual({});
    });

    it('should handle malformed event data', async () => {
      const event = {
        sessionId: 'session-x',
        eventType: 'custom' as const,
        eventName: 'test',
        properties: { nested: { deep: { value: 123 } } },
        url: 'https://example.com',
        userAgent: 'Test',
        ip: '127.0.0.1',
      };

      vi.mocked(redis).lpush.mockResolvedValue(1);
      vi.mocked(redis).expire.mockResolvedValue(1);

      const result = await trackEvent(event);
      expect(result).toBeDefined();
    });
  });
});
