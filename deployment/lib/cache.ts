/**
 * Simple in-memory cache (Redis fallback for MVP)
 * For production, replace with Redis client
 */

interface CacheEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Get from cache
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const entry = cache.get(key);
    if (!entry) return null;

    if (entry.expiresAt < Date.now()) {
      cache.delete(key);
      return null;
    }

    return entry.value as T;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set cache
 */
export async function setCached<T>(key: string, value: T, ttlSeconds: number = 300): Promise<void> {
  try {
    cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Delete from cache
 */
export async function deleteCached(key: string): Promise<void> {
  try {
    cache.delete(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

/**
 * Clear all cache
 */
export async function clearCache(): Promise<void> {
  cache.clear();
}

/**
 * Cache wrapper for async functions
 */
export async function cacheOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  const cached = await getCached<T>(key);
  if (cached) return cached;

  const value = await fetcher();
  await setCached(key, value, ttlSeconds);
  return value;
}

/**
 * Cache stats (for debugging)
 */
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
