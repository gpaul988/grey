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
