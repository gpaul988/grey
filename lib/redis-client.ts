/**
 * Redis Client Singleton
 * Wrapper around getRedis() for easier use in modules
 */

import { getRedis, closeRedis as closeRedisOriginal } from './redis';

let instance: any = null;

export async function initRedis() {
  if (!instance) {
    instance = await getRedis();
  }
  return instance;
}

export async function getRedisClient() {
  if (!instance) {
    instance = await getRedis();
  }
  return instance;
}

export async function closeRedis() {
  return closeRedisOriginal();
}

export { getRedis };

// Default export: minimal mock for analytics/payments (works without Redis)
const redisProxy = {
  lpush: async (key: string, value: any) => Promise.resolve(1),
  expire: async (key: string, ttl: number) => Promise.resolve(1),
  set: async (key: string, value: any, mode?: string, ttl?: number) => Promise.resolve('OK'),
  get: async (key: string) => Promise.resolve(null),
  del: async (key: string) => Promise.resolve(0),
};

export default redisProxy;
