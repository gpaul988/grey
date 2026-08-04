/**
 * Simple in-memory rate limiter
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const limits = new Map<string, RateLimitEntry>();

/**
 * Check and increment rate limit
 * Returns true if within limit, false if exceeded
 */
export function checkRateLimit(key: string, maxRequests: number = 100, windowSeconds: number = 60): boolean {
  try {
    const now = Date.now();
    const entry = limits.get(key);

    if (!entry || entry.resetAt < now) {
      // Reset window
      limits.set(key, {
        count: 1,
        resetAt: now + windowSeconds * 1000,
      });
      return true;
    }

    entry.count++;
    if (entry.count > maxRequests) {
      return false; // Rate limit exceeded
    }

    return true;
  } catch (error) {
    console.error('Rate limit error:', error);
    return true; // Fail open (allow request)
  }
}

/**
 * Get remaining requests
 */
export function getRateLimitInfo(key: string, maxRequests: number = 100): { remaining: number; resetAt: number | null } {
  const entry = limits.get(key);
  if (!entry) {
    return { remaining: maxRequests, resetAt: null };
  }

  if (entry.resetAt < Date.now()) {
    limits.delete(key);
    return { remaining: maxRequests, resetAt: null };
  }

  return {
    remaining: Math.max(0, maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Reset rate limit for key
 */
export function resetRateLimit(key: string): void {
  limits.delete(key);
}

/**
 * Clear all rate limits
 */
export function clearRateLimits(): void {
  limits.clear();
}
