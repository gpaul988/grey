export type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateLimitBucket>();

export function enforceRateLimit(key: string, maxRequests = 10, windowMs = 60_000) {
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count += 1;
  return true;
}

export function getRequestKey(headers: Headers | Record<string, string | undefined> | undefined) {
  const source = (headers instanceof Headers ? Object.fromEntries(headers.entries()) : (headers || {})) as Record<string, string | undefined>;
  const forwarded = source['x-forwarded-for'] || source['X-Forwarded-For'];
  const ip = forwarded ? String(forwarded).split(',')[0].trim() : (source['x-real-ip'] || source['X-Real-Ip'] || 'anonymous');
  return `store:${ip || 'anonymous'}`;
}

export function isStrongPassword(password: string) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
