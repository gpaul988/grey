/**
 * GraphQL Context
 * Authentication, DataLoader for N+1 prevention, Redis caching
 */

import DataLoader from 'dataloader';

export interface GraphQLContext {
  userId?: string;
  userLoader: DataLoader<string, any>;
  serviceLoader: DataLoader<string, any>;
  productLoader: DataLoader<string, any>;
  orderLoader: DataLoader<string, any>;
  reviewLoader: DataLoader<string, any>;
  req: any;
  res: any;
}

// In-memory cache for dev/testing
const memoryCache = new Map<string, { value: any; expires: number }>();

async function getCached(key: string): Promise<any | null> {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (item.expires < Date.now()) {
    memoryCache.delete(key);
    return null;
  }
  return item.value;
}

async function setCached(key: string, value: any, ttl: number): Promise<void> {
  memoryCache.set(key, { value, expires: Date.now() + ttl * 1000 });
}

// DataLoader batch functions
const userBatchLoader = async (ids: readonly string[]) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const cacheKey = `user:${id}`;
      const cached = await getCached(cacheKey);
      if (cached) return cached;

      // Placeholder: fetch from DB
      const user = {
        id,
        email: `user${id}@example.com`,
        name: `User ${id}`,
        role: 'user',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setCached(cacheKey, user, 3600);
      return user;
    })
  );

  return results;
};

const serviceBatchLoader = async (ids: readonly string[]) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const cacheKey = `service:${id}`;
      const cached = await getCached(cacheKey);
      if (cached) return cached;

      const service = {
        id,
        name: `Service ${id}`,
        description: '',
        category: 'BACKEND',
        price: 5000,
        rating: 4.5,
        reviewCount: 0,
        technologies: [],
        createdAt: new Date(),
      };

      await setCached(cacheKey, service, 3600);
      return service;
    })
  );

  return results;
};

const productBatchLoader = async (ids: readonly string[]) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const cacheKey = `product:${id}`;
      const cached = await getCached(cacheKey);
      if (cached) return cached;

      const product = {
        id,
        name: `Product ${id}`,
        description: '',
        price: 999,
        inventory: 100,
        rating: 4.0,
        category: 'Tools',
        createdAt: new Date(),
      };

      await setCached(cacheKey, product, 3600);
      return product;
    })
  );

  return results;
};

const orderBatchLoader = async (ids: readonly string[]) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const cacheKey = `order:${id}`;
      const cached = await getCached(cacheKey);
      if (cached) return cached;

      const order = {
        id,
        userId: '1',
        status: 'CONFIRMED',
        totalAmount: 9999,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setCached(cacheKey, order, 3600);
      return order;
    })
  );

  return results;
};

const reviewBatchLoader = async (ids: readonly string[]) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const cacheKey = `review:${id}`;
      const cached = await getCached(cacheKey);
      if (cached) return cached;

      const review = {
        id,
        userId: '1',
        rating: 5,
        comment: 'Great service!',
        helpful: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setCached(cacheKey, review, 3600);
      return review;
    })
  );

  return results;
};

/**
 * Create GraphQL context for each request
 */
export async function createGraphQLContext(req: any, res: any): Promise<GraphQLContext> {
  // Extract userId from JWT token if present
  let userId: string | undefined;

  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    // Placeholder: verify JWT and extract userId
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // userId = decoded.userId;
  }

  return {
    userId,
    userLoader: new DataLoader(userBatchLoader),
    serviceLoader: new DataLoader(serviceBatchLoader),
    productLoader: new DataLoader(productBatchLoader),
    orderLoader: new DataLoader(orderBatchLoader),
    reviewLoader: new DataLoader(reviewBatchLoader),
    req,
    res,
  };
}
