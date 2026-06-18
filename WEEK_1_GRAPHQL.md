# WEEK 1 - DAY 2-3: GRAPHQL API IMPLEMENTATION

**Timeline:** Days 2-3 (6-8 hours)  
**Technology:** Apollo Server, GraphQL, TypeScript  
**Integration:** Zero breaking changes, works alongside REST API

---

## WHAT WE'RE BUILDING

### GraphQL Schema (All Entities)

```graphql
type Query {
  # User queries
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  currentUser: User
  
  # Product queries
  product(id: ID!): Product
  products(filter: ProductFilter, sort: SortBy): [Product!]!
  
  # Service queries (from grey.git)
  service(id: ID!): Service
  services(category: String): [Service!]!
  
  # Order queries
  order(id: ID!): Order
  orders(userId: ID!): [Order!]!
  
  # Review queries
  reviews(productId: ID!, limit: Int): [Review!]!
  
  # Recommendation queries
  recommendations(userId: ID!): [Product!]!
  trendingProducts: [Product!]!
  
  # Search queries
  search(query: String!): SearchResults!
  
  # Analytics queries
  analytics: Analytics!
}

type Mutation {
  # User mutations
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  
  # Product mutations
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
  
  # Order mutations
  createOrder(input: CreateOrderInput!): Order!
  updateOrder(id: ID!, input: UpdateOrderInput!): Order!
  cancelOrder(id: ID!): Boolean!
  
  # Review mutations
  createReview(input: CreateReviewInput!): Review!
  updateReview(id: ID!, input: UpdateReviewInput!): Review!
  deleteReview(id: ID!): Boolean!
  
  # Recommendation mutations
  like(productId: ID!): Boolean!
  unlike(productId: ID!): Boolean!
}

type Subscription {
  # Real-time subscriptions
  orderStatusChanged(orderId: ID!): Order!
  reviewPublished(productId: ID!): Review!
  newProduct: Product!
  priceChanged(productId: ID!): Product!
}

# User type
type User {
  id: ID!
  name: String!
  email: String!
  phone: String
  avatar: String
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
  orders: [Order!]!
  reviews: [Review!]!
}

# Product type
type Product {
  id: ID!
  name: String!
  slug: String!
  description: String!
  price: Float!
  currency: String!
  image: String
  category: String!
  tags: [String!]!
  rating: Float!
  reviews: [Review!]!
  relatedProducts: [Product!]!
  inStock: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Order type
type Order {
  id: ID!
  ref: String!
  userId: ID!
  user: User!
  items: [OrderItem!]!
  status: OrderStatus!
  total: Float!
  currency: String!
  paymentMethod: String!
  shippingAddress: Address!
  trackingNumber: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Review type
type Review {
  id: ID!
  productId: ID!
  product: Product!
  userId: ID!
  user: User!
  rating: Int! # 1-5
  title: String!
  text: String!
  helpful: Int!
  verified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Enums & Inputs
enum Role {
  USER
  ADMIN
  STAFF
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

input ProductFilter {
  category: String
  minPrice: Float
  maxPrice: Float
  inStock: Boolean
  rating: Float
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
  phone: String
}

input CreateOrderInput {
  items: [OrderItemInput!]!
  paymentMethod: String!
  shippingAddress: AddressInput!
}

input CreateReviewInput {
  productId: ID!
  rating: Int!
  title: String!
  text: String!
}

scalar DateTime
scalar JSON
```

---

## IMPLEMENTATION STEPS

### Step 1: Setup Apollo Server

**File: `lib/graphql/schema.ts`**
```typescript
import { gql, ApolloServer } from 'apollo-server-micro';

export const typeDefs = gql`
  # [Schema from above]
`;
```

**File: `lib/graphql/resolvers.ts`**
```typescript
export const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      // Fetch user by ID from database
    },
    users: async (_, { limit, offset }, context) => {
      // Fetch paginated users
    },
    product: async (_, { id }, context) => {
      // Fetch product by ID
    },
    // ... more resolvers
  },
  
  Mutation: {
    createUser: async (_, { input }, context) => {
      // Create new user
    },
    // ... more mutations
  },
  
  Subscription: {
    orderStatusChanged: {
      subscribe: () => {
        // Subscribe to order status updates
      }
    },
    // ... more subscriptions
  },
  
  User: {
    orders: async (user, _, context) => {
      // Resolve user's orders
    },
    reviews: async (user, _, context) => {
      // Resolve user's reviews
    }
  },
  
  Product: {
    reviews: async (product, _, context) => {
      // Resolve product's reviews
    },
    relatedProducts: async (product, _, context) => {
      // Resolve related products
    }
  }
};
```

**File: `lib/graphql/context.ts`**
```typescript
export interface GraphQLContext {
  userId?: string;
  user?: any;
  db: Database;
  redis: RedisClient;
  loaders: DataLoaders;
}

export function createContext(req: any): GraphQLContext {
  return {
    userId: req.headers['x-user-id'],
    db: database,
    redis: redisClient,
    loaders: createDataLoaders()
  };
}
```

**File: `lib/graphql/middleware.ts`**
```typescript
// Rate limiting per query
// Complexity analysis (prevent DoS)
// Caching directives
// Auth validation
```

### Step 2: Create API Endpoint

**File: `pages/api/graphql.ts`**
```typescript
import { ApolloServer } from 'apollo-server-micro';
import { createContext } from '@/lib/graphql/context';
import { typeDefs, resolvers } from '@/lib/graphql/schema';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  cache: new RedisCache(),
  plugins: [
    {
      async requestDidStart() {
        // Logging, monitoring
      }
    }
  ]
});

const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};
```

### Step 3: Add Data Loaders (N+1 Query Prevention)

```typescript
// Batch load users, products, etc.
// Cache at request level
// Prevent database query explosions
```

### Step 4: Implement Subscriptions

```typescript
// WebSocket support
// Real-time order status updates
// New product notifications
// Price change alerts
```

---

## TESTS (15+ Unit Tests)

```typescript
describe('GraphQL API', () => {
  describe('Queries', () => {
    test('should fetch user by ID', async () => {
      const query = gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `;
      const result = await apolloServer.executeOperation({ query, variables: { id: '1' } });
      expect(result.data.user.id).toBe('1');
    });
    
    test('should fetch paginated products', async () => {
      // Test pagination (limit, offset)
    });
    
    test('should filter products by category', async () => {
      // Test filtering
    });
    
    // 12 more tests...
  });
  
  describe('Mutations', () => {
    test('should create user', async () => {
      // Test user creation
    });
    
    test('should update user', async () => {
      // Test user update
    });
    
    // 10 more tests...
  });
  
  describe('Performance', () => {
    test('should use data loaders to prevent N+1 queries', async () => {
      // Test batch loading
    });
    
    test('should cache frequently accessed data', async () => {
      // Test caching
    });
  });
});
```

---

## CONFIGURATION

### Environment Variables
```env
GRAPHQL_PLAYGROUND=true  # Enable GraphQL Playground UI
GRAPHQL_INTROSPECTION=true  # Allow schema introspection
GRAPHQL_DEBUG=false  # Debug mode
```

### .env.local
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

## DEPLOYMENT CHECKLIST

- [ ] Schema validates
- [ ] All resolvers implemented
- [ ] Data loaders working
- [ ] Subscriptions tested
- [ ] Rate limiting active
- [ ] Caching configured
- [ ] Tests passing (15+)
- [ ] Performance benchmarked
- [ ] Documentation generated
- [ ] Endpoint live at /api/graphql

---

## USAGE EXAMPLES

### Query Example
```graphql
query GetProductWithReviews {
  product(id: "123") {
    name
    price
    reviews(limit: 5) {
      rating
      text
      author {
        name
      }
    }
  }
}
```

### Mutation Example
```graphql
mutation CreateOrder {
  createOrder(input: {
    items: [
      { productId: "123", quantity: 2 }
    ]
    paymentMethod: "stripe"
    shippingAddress: {
      street: "123 Main St"
      city: "New York"
      state: "NY"
      zip: "10001"
    }
  }) {
    id
    status
    total
  }
}
```

### Subscription Example
```graphql
subscription OnOrderUpdate {
  orderStatusChanged(orderId: "order-123") {
    id
    status
    trackingNumber
    updatedAt
  }
}
```

---

## PERFORMANCE TARGETS

- Query latency: < 100ms (p95)
- Mutation latency: < 200ms (p95)
- Subscription delivery: < 50ms
- Cache hit rate: > 80%
- DB queries per request: < 5 (with data loaders)

---

## NEXT STEPS

After GraphQL:
1. Full-text Search (Day 4-5)
2. Webhooks (Day 6-7)
3. i18n (Week 2, Days 1-2)
4. Analytics Dashboard (Week 2, Days 3-4)
5. Payments (Week 2, Days 5-7)
6. Voice AI Complete (Week 3, Days 1-3)
7. AI Code Analyzer (Week 3, Days 4-7)
8. Live Demo Environments (Week 4, Days 1-2)
9. API Playground (Week 4, Days 3-4)
10. Benchmarking Tool (Week 4, Days 5-6)
11. Tech Stack Scanner (Week 4, Day 7)

**Ready to build? Starting now. 🚀**

