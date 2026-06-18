/**
 * GraphQL Schema Definition
 * Complete typeDefs for Products, Orders, Services, Reviews, Users, Subscriptions
 * Apollo Server + Redis caching + DataLoader for N+1 prevention
 */

import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # ============================================
  # SCALARS
  # ============================================
  scalar DateTime
  scalar JSON

  # ============================================
  # ENUMS
  # ============================================
  enum ServiceCategory {
    FRONTEND
    BACKEND
    FULLSTACK
    DEVOPS
    MOBILE
    DESIGN
    CONSULTING
    TRAINING
  }

  enum OrderStatus {
    PENDING
    CONFIRMED
    IN_PROGRESS
    COMPLETED
    CANCELLED
    REFUNDED
  }

  enum SubscriptionPlan {
    STARTER
    PROFESSIONAL
    ENTERPRISE
  }

  enum SubscriptionStatus {
    ACTIVE
    PAUSED
    CANCELLED
    EXPIRED
  }

  # ============================================
  # TYPES
  # ============================================
  type User {
    id: ID!
    email: String!
    name: String!
    avatar: String
    role: String!
    verified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    orders: [Order!]!
    reviews: [Review!]!
    subscription: Subscription
  }

  type Service {
    id: ID!
    name: String!
    description: String!
    category: ServiceCategory!
    price: Float!
    rating: Float
    reviewCount: Int!
    imageUrl: String
    technologies: [String!]!
    createdAt: DateTime!
    orders: [Order!]!
    reviews: [Review!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    inventory: Int!
    rating: Float
    imageUrl: String
    category: String!
    createdAt: DateTime!
    orders: [Order!]!
    reviews: [Review!]!
  }

  type Order {
    id: ID!
    userId: ID!
    user: User!
    serviceId: ID
    service: Service
    productId: ID
    product: Product
    status: OrderStatus!
    totalAmount: Float!
    items: [OrderItem!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type OrderItem {
    id: ID!
    orderId: ID!
    serviceId: ID
    productId: ID
    quantity: Int!
    price: Float!
    createdAt: DateTime!
  }

  type Review {
    id: ID!
    userId: ID!
    user: User!
    serviceId: ID
    service: Service
    productId: ID
    product: Product
    rating: Int!
    comment: String
    helpful: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Subscription {
    id: ID!
    userId: ID!
    user: User!
    plan: SubscriptionPlan!
    status: SubscriptionStatus!
    startDate: DateTime!
    endDate: DateTime!
    autoRenew: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginatedOrders {
    items: [Order!]!
    total: Int!
    page: Int!
    pageSize: Int!
    hasMore: Boolean!
  }

  type PaginatedServices {
    items: [Service!]!
    total: Int!
    page: Int!
    pageSize: Int!
    hasMore: Boolean!
  }

  # ============================================
  # QUERIES
  # ============================================
  type Query {
    # User Queries
    me: User
    user(id: ID!): User
    users(page: Int, pageSize: Int): [User!]!

    # Service Queries
    service(id: ID!): Service
    services(
      category: ServiceCategory
      sortBy: String
      page: Int
      pageSize: Int
    ): PaginatedServices!
    searchServices(query: String!): [Service!]!

    # Product Queries
    product(id: ID!): Product
    products(page: Int, pageSize: Int): [Product!]!
    searchProducts(query: String!): [Product!]!

    # Order Queries
    order(id: ID!): Order
    myOrders(page: Int, pageSize: Int): PaginatedOrders!
    orders(userId: ID, page: Int, pageSize: Int): PaginatedOrders!

    # Review Queries
    review(id: ID!): Review
    serviceReviews(serviceId: ID!): [Review!]!
    productReviews(productId: ID!): [Review!]!

    # Analytics Queries
    orderStats: JSON!
    serviceStats: JSON!
    userStats: JSON!
  }

  # ============================================
  # MUTATIONS
  # ============================================
  type Mutation {
    # User Mutations
    createUser(email: String!, name: String!, password: String!): User!
    updateUser(id: ID!, name: String, avatar: String): User!
    deleteUser(id: ID!): Boolean!

    # Service Mutations
    createService(
      name: String!
      description: String!
      category: ServiceCategory!
      price: Float!
      technologies: [String!]!
      imageUrl: String
    ): Service!
    updateService(id: ID!, name: String, description: String, price: Float): Service!
    deleteService(id: ID!): Boolean!

    # Product Mutations
    createProduct(
      name: String!
      description: String!
      price: Float!
      inventory: Int!
      category: String!
      imageUrl: String
    ): Product!
    updateProduct(id: ID!, price: Float, inventory: Int): Product!
    deleteProduct(id: ID!): Boolean!

    # Order Mutations
    createOrder(
      serviceId: ID
      productId: ID
      quantity: Int
      totalAmount: Float!
    ): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
    cancelOrder(id: ID!): Order!

    # Review Mutations
    createReview(
      serviceId: ID
      productId: ID
      rating: Int!
      comment: String
    ): Review!
    updateReview(id: ID!, rating: Int, comment: String): Review!
    deleteReview(id: ID!): Boolean!
    helpfulReview(id: ID!): Review!

    # Subscription Mutations
    createSubscription(plan: SubscriptionPlan!): Subscription!
    cancelSubscription(id: ID!): Subscription!
    pauseSubscription(id: ID!): Subscription!
    resumeSubscription(id: ID!): Subscription!
  }

  # ============================================
  # SUBSCRIPTIONS
  # ============================================
  type Subscription {
    orderCreated: Order!
    orderUpdated(orderId: ID!): Order!
    reviewCreated: Review!
  }
`;
