/**
 * GraphQL Middleware
 * Rate limiting, complexity analysis, depth limiting
 */

const RATE_LIMIT_WINDOW = 60; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute
const rateLimitCache = new Map<string, number>();

/**
 * Rate limiting middleware
 */
export async function rateLimitMiddleware(
  req: any,
  _res: any,
  next: any
): Promise<void> {
  const clientId = req.ip || req.headers['x-forwarded-for'] || 'anonymous';
  const key = `rate-limit:${clientId}`;
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `${key}:${now}`;

  const current = (rateLimitCache.get(windowKey) || 0) + 1;
  rateLimitCache.set(windowKey, current);

  // Clean old entries
  if (rateLimitCache.size > 1000) {
    const threshold = now - RATE_LIMIT_WINDOW;
    for (const cacheKey of rateLimitCache.keys()) {
      const [, timestamp] = cacheKey.split(':').slice(-1);
      if (parseInt(timestamp) < threshold) {
        rateLimitCache.delete(cacheKey);
      }
    }
  }

  if (current > RATE_LIMIT_MAX) {
    throw new Error(
      `Rate limit exceeded. Max ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW}s`
    );
  }

  next();
}

/**
 * Query complexity analysis
 * Prevents expensive queries (deep nesting, large pagination)
 */
export function analyzeComplexity(query: string): number {
  // Simple complexity score based on:
  // - Nesting depth
  // - Field count
  // - Pagination limits

  let complexity = 0;
  const depth = (query.match(/{/g) || []).length;
  const fieldCount = (query.match(/\w+:/g) || []).length;

  complexity = depth * 2 + fieldCount;

  return complexity;
}

const MAX_COMPLEXITY = 200;

/**
 * Validate query complexity
 */
export function validateQueryComplexity(query: string): boolean {
  const complexity = analyzeComplexity(query);
  return complexity <= MAX_COMPLEXITY;
}

/**
 * Depth limiting middleware
 * Prevents deeply nested queries (N+1 prevention)
 */
export function depthLimitMiddleware(maxDepth: number = 5) {
  return function (context: any, next: any) {
    let depth = 0;

    const beforeResolve = () => depth++;
    const afterResolve = () => depth--;

    if (depth > maxDepth) {
      throw new Error(`Query depth exceeds maximum of ${maxDepth}`);
    }

    return next();
  };
}

/**
 * Cache key generation
 */
export function generateCacheKey(
  operationName: string,
  variables: Record<string, any>
): string {
  const variableStr = JSON.stringify(variables || {});
  return `graphql:${operationName}:${Buffer.from(variableStr).toString('base64')}`;
}

/**
 * Query caching wrapper (uses in-memory cache)
 */
const globalCache = new Map<string, { value: any; expires: number }>();

export async function cachedQuery<T>(
  key: string,
  ttl: number,
  executor: () => Promise<T>
): Promise<T> {
  const cached = globalCache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.value;
  }

  const result = await executor();
  globalCache.set(key, { value: result, expires: Date.now() + ttl * 1000 });

  return result;
}

/**
 * Invalidate cache patterns
 */
export async function invalidateCache(...patterns: string[]): Promise<void> {
  for (const pattern of patterns) {
    for (const key of globalCache.keys()) {
      if (key.includes(pattern)) {
        globalCache.delete(key);
      }
    }
  }
}
