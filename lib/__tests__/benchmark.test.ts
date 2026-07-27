import { describe, it, expect } from 'vitest';
import type { BenchmarkMetrics } from '@/lib/bench/benchmark-runner';
import {
  runBenchmark,
  runConcurrentBenchmarks,
  benchmarkEndpoint,
  compareBenchmarks,
  formatMetrics,
} from '@/lib/bench/benchmark-runner';

describe('Performance Benchmarking (Phase 6.9)', () => {
  describe('Basic Benchmarking', () => {
    it('should run basic benchmark', async () => {
      let counter = 0;
      const result = await runBenchmark('counter', () => {
        counter++;
      }, 10);

      expect(result.success).toBe(true);
      expect(result.metrics).toBeDefined();
      expect(result.metrics?.iterations).toBe(10);
      expect(result.metrics?.throughput).toBeGreaterThan(0);
    });

    it('should handle async functions', async () => {
      const result = await runBenchmark(
        'async-task',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1));
        },
        5
      );

      expect(result.success).toBe(true);
      expect(result.metrics?.latency.mean).toBeGreaterThan(0);
    });

    it('should validate iteration count', async () => {
      const result = await runBenchmark('test', () => {}, 0); // Invalid
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should calculate correct latency percentiles', async () => {
      const result = await runBenchmark('percentile-test', () => {
        // Simple operation
      }, 50);

      const metrics = result.metrics;
      expect(metrics?.latency.min ?? 0).toBeLessThanOrEqual(metrics?.latency.median ?? 0);
      expect(metrics?.latency.median ?? 0).toBeLessThanOrEqual(metrics?.latency.p95 ?? 0);
      expect(metrics?.latency.p95 ?? 0).toBeLessThanOrEqual(metrics?.latency.p99 ?? 0);
      expect(metrics?.latency.p99 ?? 0).toBeLessThanOrEqual(metrics?.latency.max ?? 0);
    });

    it('should measure throughput', async () => {
      const result = await runBenchmark('throughput-test', () => {
        // Simple operation
      }, 100);

      expect(result.metrics?.throughput).toBeGreaterThan(0);
      expect(result.metrics?.throughput).toBeLessThan(Infinity);
    });
  });

  describe('Concurrent Benchmarks', () => {
    it('should run multiple concurrent benchmarks', async () => {
      const results = await runConcurrentBenchmarks([
        {
          name: 'bench-1',
          fn: () => {
            let x = 0;
            for (let i = 0; i < 1000; i++) x += i;
          },
          iterations: 20,
        },
        {
          name: 'bench-2',
          fn: async () => {
            await new Promise(resolve => setTimeout(resolve, 1));
          },
          iterations: 10,
        },
      ]);

      expect(results).toHaveLength(2);
      expect(results.every(r => r.success)).toBe(true);
      expect(results[0].metrics?.name).toBe('bench-1');
      expect(results[1].metrics?.name).toBe('bench-2');
    });

    it('should handle concurrent benchmark failures gracefully', async () => {
      const results = await runConcurrentBenchmarks([
        {
          name: 'valid',
          fn: () => {},
          iterations: 10,
        },
        {
          name: 'invalid',
          fn: () => {
            throw new Error('Benchmark error');
          },
          iterations: 10,
        },
      ]);

      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
    });
  });

  describe('Endpoint Benchmarking', () => {
    it('should benchmark valid endpoint', async () => {
      const result = await benchmarkEndpoint('http://api.example.com/users', 'GET', 20);
      expect(result.success).toBe(true);
      expect(result.metrics).toBeDefined();
    });

    it('should reject invalid URL', async () => {
      const result = await benchmarkEndpoint('not-a-url', 'GET', 10);
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should benchmark multiple endpoints', async () => {
      const endpoints = [
        'http://api.example.com/users',
        'http://api.example.com/posts',
        'http://api.example.com/comments',
      ];

      for (const url of endpoints) {
        const result = await benchmarkEndpoint(url, 'GET', 10);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('Benchmark Comparison', () => {
    it('should compare two benchmarks', async () => {
      const baseline = await runBenchmark('baseline', () => {
        for (let i = 0; i < 100; i++) {
          // operation
        }
      }, 20);

      const current = await runBenchmark('current', () => {
        for (let i = 0; i < 50; i++) {
          // faster operation
        }
      }, 20);

      if (baseline.metrics && current.metrics) {
        const comparison = compareBenchmarks(baseline.metrics, current.metrics);
        expect(comparison.improvement).toBeDefined();
        expect(comparison.percentage).toBeDefined();
      }
    });

    it('should indicate performance improvement', async () => {
      const slow = { latency: { mean: 100 } } as unknown as BenchmarkMetrics;
      const fast = { latency: { mean: 50 } } as unknown as BenchmarkMetrics;

      const result = compareBenchmarks(slow, fast);
      expect(result.improvement).toBeGreaterThan(0);
      expect(result.percentage).toBeGreaterThan(0);
    });

    it('should indicate performance regression', async () => {
      const fast = { latency: { mean: 50 } } as unknown as BenchmarkMetrics;
      const slow = { latency: { mean: 100 } } as unknown as BenchmarkMetrics;

      const result = compareBenchmarks(fast, slow);
      expect(result.improvement).toBeLessThan(0);
      expect(result.percentage).toBeLessThan(0);
    });
  });

  describe('Metrics Formatting', () => {
    it('should format metrics for display', async () => {
      const result = await runBenchmark('format-test', () => {}, 10);
      if (result.metrics) {
        const formatted = formatMetrics(result.metrics);
        expect(formatted).toContain('Benchmark');
        expect(formatted).toContain('Latency');
        expect(formatted).toContain('Throughput');
      }
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete benchmarking workflow', async () => {
      // Benchmark 1
      const result1 = await runBenchmark('workflow-1', () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) sum += i;
      }, 25);

      expect(result1.success).toBe(true);

      // Benchmark 2
      const result2 = await runBenchmark('workflow-2', () => {
        let sum = 0;
        for (let i = 0; i < 500; i++) sum += i;
      }, 25);

      expect(result2.success).toBe(true);

      // Compare
      if (result1.metrics && result2.metrics) {
        const comparison = compareBenchmarks(result1.metrics, result2.metrics);
        expect(comparison.improvement).toBeDefined();
      }
    });

    it('should provide memory metrics', async () => {
      const result = await runBenchmark('memory-test', () => {}, 10);
      expect(result.metrics?.memory).toBeDefined();
      if (result.metrics?.memory) {
        expect(result.metrics.memory.heapUsed).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
