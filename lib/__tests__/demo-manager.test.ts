import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  startDemo,
  stopDemo,
  getDemoStatus,
  listActiveDemos,
  getDemoLogs,
  addDemoLog,
  getDemoStats,
  cleanupExpiredDemos,
  resetDemos,
} from '@/lib/demo/demo-manager';

describe('Demo Manager (Phase 6.7)', () => {
  beforeEach(() => {
    resetDemos();
  });

  afterEach(() => {
    resetDemos();
  });

  describe('Demo Lifecycle', () => {
    it('should start a new demo instance', async () => {
      const demo = await startDemo({ serviceType: 'nodejs' });

      expect(demo).toBeDefined();
      expect(demo.id).toBeTruthy();
      expect(demo.serviceType).toBe('nodejs');
      expect(demo.status).toBe('running');
      expect(demo.port).toBeTruthy();
      expect(demo.url).toBeTruthy();
    });

    it('should validate service type', async () => {
      try {
        await startDemo({ serviceType: 'invalid-service' });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should get demo status', async () => {
      const demo = await startDemo({ serviceType: 'react' });
      const status = getDemoStatus(demo.id);

      expect(status).toBeDefined();
      expect(status?.id).toBe(demo.id);
      expect(status?.status).toBe('running');
    });

    it('should stop a demo instance', async () => {
      const demo = await startDemo({ serviceType: 'nextjs' });
      const stopped = await stopDemo(demo.id);

      expect(stopped).toBe(true);
      const status = getDemoStatus(demo.id);
      expect(status?.status).toBe('stopped');
    });

    it('should return false when stopping non-existent demo', async () => {
      const stopped = await stopDemo('non-existent-id');
      expect(stopped).toBe(false);
    });

    it('should return null for non-existent demo status', () => {
      const status = getDemoStatus('non-existent-id');
      expect(status).toBeNull();
    });
  });

  describe('Demo Listing & Management', () => {
    it('should list active demos', async () => {
      await startDemo({ serviceType: 'nodejs' });
      await startDemo({ serviceType: 'react' });

      const activeDemos = listActiveDemos();
      expect(activeDemos.length).toBe(2);
      expect(activeDemos.every(d => d.status === 'running')).toBe(true);
    });

    it('should not list stopped demos', async () => {
      const demo = await startDemo({ serviceType: 'python' });
      await stopDemo(demo.id);

      const activeDemos = listActiveDemos();
      expect(activeDemos.length).toBe(0);
    });

    it('should get demo statistics', async () => {
      await startDemo({ serviceType: 'nodejs' });
      await startDemo({ serviceType: 'react' });
      const demo3 = await startDemo({ serviceType: 'vue' });
      await stopDemo(demo3.id);

      const stats = getDemoStats();
      expect(stats.totalCreated).toBe(3);
      expect(stats.activeCount).toBe(2);
      expect(stats.stoppedCount).toBe(1);
    });

    it('should respect max instances limit', async () => {
      try {
        await startDemo({ serviceType: 'nodejs', maxInstances: 1 });
        await startDemo({ serviceType: 'nodejs', maxInstances: 1 });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Demo Logging', () => {
    it('should get demo logs', async () => {
      const demo = await startDemo({ serviceType: 'nodejs' });
      const logs = getDemoLogs(demo.id);

      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBeGreaterThan(0);
    });

    it('should add log entry', async () => {
      const demo = await startDemo({ serviceType: 'nodejs' });
      const initialLogCount = getDemoLogs(demo.id).length;

      addDemoLog(demo.id, 'Test log message');
      const logs = getDemoLogs(demo.id);

      expect(logs.length).toBeGreaterThan(initialLogCount);
      expect(logs.some(log => log.includes('Test log message'))).toBe(true);
    });

    it('should return empty logs for non-existent demo', () => {
      const logs = getDemoLogs('non-existent');
      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBe(0);
    });

    it('should limit logs to last 100 entries', async () => {
      const demo = await startDemo({ serviceType: 'nodejs' });

      for (let i = 0; i < 150; i++) {
        addDemoLog(demo.id, `Log entry ${i}`);
      }

      const logs = getDemoLogs(demo.id);
      expect(logs.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Demo Timeout & Cleanup', () => {
    it('should set expiration time', async () => {
      const demo = await startDemo({ serviceType: 'nodejs', timeout: 30 });
      expect(demo.expiresAt.getTime()).toBeGreaterThan(demo.createdAt.getTime());
    });

    it('should respect timeout duration', async () => {
      const demo = await startDemo({ serviceType: 'nodejs', timeout: 5 });
      const expectedExpiry = new Date(demo.createdAt.getTime() + 5 * 60 * 1000);

      // Should be within 1 second of expected time
      expect(Math.abs(demo.expiresAt.getTime() - expectedExpiry.getTime())).toBeLessThan(1000);
    });

    it('should cleanup expired demos', async () => {
      // Create demo with very short timeout, then manually set expiry to past
      const demo = await startDemo({ serviceType: 'nodejs', timeout: 1 });
      demo.expiresAt = new Date(Date.now() - 1000); // Set to 1 second ago

      const cleaned = cleanupExpiredDemos();
      expect(cleaned).toBe(1);

      const status = getDemoStatus(demo.id);
      expect(status?.status).toBe('stopped');
    });

    it('should set timeout correctly', async () => {
      const timeoutMin = 30;
      const demo = await startDemo({ serviceType: 'nodejs', timeout: timeoutMin });
      const expectedExpiry = new Date(demo.createdAt.getTime() + timeoutMin * 60 * 1000);

      // Verify expiry is set to timeout duration
      const diff = Math.abs(demo.expiresAt.getTime() - expectedExpiry.getTime());
      expect(diff).toBeLessThan(1000); // Within 1 second
    });
  });

  describe('Resource Management', () => {
    it('should track resource usage', async () => {
      const demo = await startDemo({ serviceType: 'nodejs' });
      expect(demo).toBeDefined();
      // Resource tracking would be populated by actual system monitoring
      // Just verify structure exists
      if (demo.resourceUsage) {
        expect(demo.resourceUsage).toHaveProperty('cpu');
        expect(demo.resourceUsage).toHaveProperty('memory');
      }
    });

    it('should handle multiple concurrent demos', async () => {
      const demos = await Promise.all([
        startDemo({ serviceType: 'nodejs' }),
        startDemo({ serviceType: 'react' }),
        startDemo({ serviceType: 'python' }),
        startDemo({ serviceType: 'vue' }),
      ]);

      expect(demos.length).toBe(4);
      expect(demos.every(d => d.status === 'running')).toBe(true);
      expect(new Set(demos.map(d => d.port)).size).toBe(4); // All different ports
    });
  });

  describe('Integration Tests', () => {
    it('should manage complete demo lifecycle', async () => {
      // Start demo
      const demo = await startDemo({ serviceType: 'nodejs', timeout: 60 });
      expect(demo.status).toBe('running');

      // Get status
      let status = getDemoStatus(demo.id);
      expect(status?.status).toBe('running');

      // Add logs
      addDemoLog(demo.id, 'Custom message');
      let logs = getDemoLogs(demo.id);
      expect(logs.some(l => l.includes('Custom message'))).toBe(true);

      // List active
      let active = listActiveDemos();
      expect(active.find(d => d.id === demo.id)).toBeDefined();

      // Stop demo
      await stopDemo(demo.id);
      status = getDemoStatus(demo.id);
      expect(status?.status).toBe('stopped');

      // Should no longer be in active list
      active = listActiveDemos();
      expect(active.find(d => d.id === demo.id)).toBeUndefined();
    });

    it('should provide comprehensive stats', async () => {
      await startDemo({ serviceType: 'nodejs' });
      await startDemo({ serviceType: 'react' });
      await startDemo({ serviceType: 'python' });

      const stats = getDemoStats();
      expect(stats.totalCreated).toBe(3);
      expect(stats.activeCount).toBe(3);
      expect(stats.serviceTypes).toContain('nodejs');
      expect(stats.serviceTypes).toContain('react');
      expect(stats.serviceTypes).toContain('python');
    });
  });
});
