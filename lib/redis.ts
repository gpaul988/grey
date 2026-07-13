import { createClient } from 'redis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redisClient: any = null;

/**
 * Redis singleton for tests and external use
 */
export const redis = {
  async get(key: string) { return (await getRedis()).get(key); },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async set(key: string, value: any) { return (await getRedis()).set(key, value); },
  async del(key: string) { return (await getRedis()).del(key); },
  async expire(key: string, ttl: number) { return (await getRedis()).expire(key, ttl); },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async lpush(key: string, value: any) { return (await getRedis()).lPush(key, value); },
};

/**
 * Get or create Redis client
 */
export async function getRedis() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

  redisClient = createClient({
    url: redisUrl,
    socket: {
      // Fast fail on local dev when Redis isn't running — don't hang the server.
      connectTimeout: 3000,
      // Exponential back-off capped at 2s; stops retrying after 3 attempts in dev.
      reconnectStrategy: (retries: number) => {
        if (!process.env.REDIS_URL && retries > 2) {
          // No REDIS_URL configured — Redis is optional. Stop retrying silently.
          return false;
        }
        return Math.min(retries * 100, 2000);
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  redisClient.on('error', (err: any) => {
    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      // Redis not running locally — silently ignore, it's optional in dev.
      return;
    }
    console.error('Redis error:', err.message || err);
  });

  redisClient.on('connect', () => {
    console.log('[redis] Connected');
  });

  try {
    await redisClient.connect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.warn('[redis] Not available (REDIS_URL not set or Redis not running). Continuing without cache.');
    redisClient = null;
    throw err;
  }
  return redisClient;
}

/**
 * Cache operations
 */
export const cache = {
  async get(key: string): Promise<string | null> {
    const redis = await getRedis();
    return redis.get(key);
  },

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const redis = await getRedis();
    if (ttlSeconds) {
      await redis.setEx(key, ttlSeconds, value);
    } else {
      await redis.set(key, value);
    }
  },

  async delete(key: string): Promise<void> {
    const redis = await getRedis();
    await redis.del(key);
  },

  async invalidatePattern(pattern: string): Promise<void> {
    const redis = await getRedis();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  },

  async getJSON(key: string) {
    const value = await this.get(key);
    return value ? JSON.parse(value) : null;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setJSON(key: string, value: any, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  },
};

/**
 * Rate limiting (token bucket)
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const redis = await getRedis();
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  const remaining = Math.max(0, limit - current);
  return {
    allowed: current <= limit,
    remaining,
  };
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const redis = await getRedis();
    await redis.ping();
    return true;
  } catch (e) {
    console.error('Redis health check failed:', e);
    return false;
  }
}

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}
