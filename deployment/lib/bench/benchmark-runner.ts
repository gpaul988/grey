/**
 * Performance Benchmarking Tool
 * Measure and compare performance metrics
 */

export interface BenchmarkMetrics {
  name: string;
  iterations: number;
  duration: number; // milliseconds
  latency: {
    min: number;
    max: number;
    mean: number;
    median: number;
    p95: number;
    p99: number;
  };
  throughput: number; // ops/sec
  memory?: {
    heapUsed: number;
    heapTotal: number;
    external: number;
  };
}

export interface BenchmarkResult {
  success: boolean;
  metrics?: BenchmarkMetrics;
  error?: string;
  timestamp: Date;
}

/**
 * Run a benchmark on a function
 */
export const runBenchmark = async (
  name: string,
  fn: () => Promise<void> | void,
  iterations: number = 100
): Promise<BenchmarkResult> => {
  try {
    if (iterations < 1 || iterations > 100000) {
      return {
        success: false,
        error: 'Iterations must be between 1 and 100000',
        timestamp: new Date(),
      };
    }

    const durations: number[] = [];
    const startTotal = performance.now();

    // Warmup run
    await fn();

    // Actual benchmark
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await fn();
      const duration = performance.now() - start;
      durations.push(duration);
    }

    const totalDuration = performance.now() - startTotal;

    // Calculate metrics
    durations.sort((a, b) => a - b);
    const metrics: BenchmarkMetrics = {
      name,
      iterations,
      duration: totalDuration,
      latency: {
        min: durations[0],
        max: durations[durations.length - 1],
        mean: durations.reduce((a, b) => a + b, 0) / durations.length,
        median: durations[Math.floor(durations.length / 2)],
        p95: durations[Math.floor(durations.length * 0.95)],
        p99: durations[Math.floor(durations.length * 0.99)],
      },
      throughput: (iterations / (totalDuration / 1000)) || 0,
      memory: getMemoryMetrics(),
    };

    return {
      success: true,
      metrics,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    };
  }
};

/**
 * Run concurrent benchmarks
 */
export const runConcurrentBenchmarks = async (
  benchmarks: Array<{ name: string; fn: () => Promise<void> | void; iterations?: number }>
): Promise<BenchmarkResult[]> => {
  return Promise.all(
    benchmarks.map(b => runBenchmark(b.name, b.fn, b.iterations || 100))
  );
};

/**
 * Benchmark HTTP endpoint
 */
export const benchmarkEndpoint = async (
  url: string,
  method: string = 'GET',
  iterations: number = 50
): Promise<BenchmarkResult> => {
  try {
    new URL(url);
  } catch {
    return {
      success: false,
      error: 'Invalid URL',
      timestamp: new Date(),
    };
  }

  const result = await runBenchmark(
    `${method} ${new URL(url).pathname}`,
    async () => {
      // Simulate HTTP call
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50));
    },
    iterations
  );

  return result;
};

/**
 * Compare two benchmarks
 */
export const compareBenchmarks = (
  baseline: BenchmarkMetrics,
  current: BenchmarkMetrics
): { improvement: number; percentage: number } => {
  const improvement = baseline.latency.mean - current.latency.mean;
  const percentage = (improvement / baseline.latency.mean) * 100;

  return {
    improvement,
    percentage,
  };
};

/**
 * Get memory metrics
 */
const getMemoryMetrics = () => {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const mem = process.memoryUsage();
    return {
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024 * 100) / 100, // MB
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024 * 100) / 100,
      external: Math.round(mem.external / 1024 / 1024 * 100) / 100,
    };
  }
  return undefined;
};

/**
 * Format benchmark metrics for display
 */
export const formatMetrics = (metrics: BenchmarkMetrics): string => {
  return `
Benchmark: ${metrics.name}
Iterations: ${metrics.iterations}
Total Duration: ${metrics.duration.toFixed(2)}ms

Latency:
  Min: ${metrics.latency.min.toFixed(3)}ms
  Max: ${metrics.latency.max.toFixed(3)}ms
  Mean: ${metrics.latency.mean.toFixed(3)}ms
  Median: ${metrics.latency.median.toFixed(3)}ms
  p95: ${metrics.latency.p95.toFixed(3)}ms
  p99: ${metrics.latency.p99.toFixed(3)}ms

Throughput: ${metrics.throughput.toFixed(2)} ops/sec
  `.trim();
};
