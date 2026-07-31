// Simple in-memory rate limiter for Next.js route handlers.
// For production, replace with Redis-based limiter to be shared across instances.

type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 900000); // 15 minutes
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);

export function checkRateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS };
  }

  if (now - bucket.windowStart > WINDOW_MS) {
    // window expired -> reset
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, reset: bucket.windowStart + WINDOW_MS };
  }

  bucket.count += 1;
  const remaining = Math.max(0, MAX_REQUESTS - bucket.count);
  return { allowed: true, remaining, reset: bucket.windowStart + WINDOW_MS };
}

// Periodic cleanup to avoid unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now - v.windowStart > WINDOW_MS * 2) buckets.delete(k);
  }
}, WINDOW_MS);
