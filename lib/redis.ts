import { createClient } from 'redis';

let redisClient: any = null;

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
      reconnectStrategy: (retries: number) => Math.min(retries * 50, 500),
      connectTimeout: 10000,
    },
  });

  redisClient.on('error', (err: any) => {
    console.error('Redis error:', err);
  });

  redisClient.on('connect', () => {
    console.log('Redis connected');
  });

  await redisClient.connect();
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
