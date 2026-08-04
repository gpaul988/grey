import { Request, Response, NextFunction } from 'express';
import { rateLimit } from '../redis';

/**
 * Rate limiter middleware using Redis
 * Apply to sensitive endpoints like login, payment, API
 */
export function createRateLimiter(
  limit: number = 100,
  windowSeconds: number = 60
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `ratelimit:${req.ip || req.socket.remoteAddress}`;
      const { allowed, remaining } = await rateLimit(key, limit, windowSeconds);

      res.set('X-RateLimit-Limit', limit.toString());
      res.set('X-RateLimit-Remaining', remaining.toString());

      if (!allowed) {
        return res.status(429).json({
          error: 'Too many requests, please try again later',
          retryAfter: windowSeconds,
        });
      }

      next();
    } catch (err) {
      // If Redis fails, allow request (fail open)
      console.error('Rate limit check failed:', err);
      next();
    }
  };
}

/**
 * Per-user rate limiter (for authenticated endpoints)
 */
export function createUserRateLimiter(
  limit: number = 1000,
  windowSeconds: number = 3600
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userId = (req as any).user?.id;
      if (!userId) return next();

      const key = `ratelimit:user:${userId}`;
      const { allowed, remaining } = await rateLimit(key, limit, windowSeconds);

      res.set('X-RateLimit-User-Limit', limit.toString());
      res.set('X-RateLimit-User-Remaining', remaining.toString());

      if (!allowed) {
        return res.status(429).json({
          error: 'API rate limit exceeded',
        });
      }

      next();
    } catch (err) {
      console.error('User rate limit check failed:', err);
      next();
    }
  };
}
