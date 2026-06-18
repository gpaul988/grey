import { GraphQLSchema, GraphQLObjectType, GraphQLField, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';

/**
 * GraphQL Type Definitions
 */

// User Type
export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user in the system',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) }, // superadmin | admin | manager | staff
    avatar: { type: GraphQLString },
    phone: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLString) }, // active | suspended
    emailVerified: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Service Type
export const ServiceType = new GraphQLObjectType({
  name: 'Service',
  description: 'A service offered',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
    category: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    featured: { type: GraphQLBoolean },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Analytics Event Type
export const AnalyticsEventType = new GraphQLObjectType({
  name: 'AnalyticsEvent',
  description: 'User behavior event',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLInt },
    eventType: { type: new GraphQLNonNull(GraphQLString) }, // page_view | click | conversion
    eventName: { type: new GraphQLNonNull(GraphQLString) },
    sessionId: { type: GraphQLString },
    url: { type: GraphQLString },
    timestamp: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Payment Type
export const PaymentType = new GraphQLObjectType({
  name: 'Payment',
  description: 'Payment transaction',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLInt },
    email: { type: GraphQLString },
    amount: { type: GraphQLString },
    currency: { type: GraphQLString },
    provider: { type: new GraphQLNonNull(GraphQLString) },
    transactionId: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Audit Type
export const AuditType = new GraphQLObjectType({
  name: 'Audit',
  description: 'Security audit',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: GraphQLInt },
    reportUrl: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Query Input Types
export const UserFilterInput = new GraphQLInputObjectType({
  name: 'UserFilter',
  fields: {
    role: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

export const ServiceFilterInput = new GraphQLInputObjectType({
  name: 'ServiceFilter',
  fields: {
    category: { type: GraphQLString },
    featured: { type: GraphQLBoolean },
  },
});

// Root Query Type
export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    // User queries
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (_, args, context) => context.db.query.users.findFirst({ where: (u, { eq }) => eq(u.id, args.id) }),
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        filter: { type: UserFilterInput },
        limit: { type: GraphQLInt, defaultValue: 100 },
        offset: { type: GraphQLInt, defaultValue: 0 },
      },
      resolve: (_, args, context) => context.db.query.users.findMany({ limit: args.limit, offset: args.offset }),
    },
    me: {
      type: UserType,
      resolve: (_, __, context) => context.user,
    },

    // Service queries
    service: {
      type: ServiceType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (_, args, context) => context.db.query.services.findFirst({ where: (s, { eq }) => eq(s.id, args.id) }),
    },
    services: {
      type: new GraphQLList(ServiceType),
      args: {
        filter: { type: ServiceFilterInput },
        limit: { type: GraphQLInt, defaultValue: 50 },
      },
      resolve: (_, args, context) => context.db.query.services.findMany({ limit: args.limit }),
    },
    serviceBySlug: {
      type: ServiceType,
      args: { slug: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (_, args, context) => context.db.query.services.findFirst({ where: (s, { eq }) => eq(s.slug, args.slug) }),
    },

    // Analytics queries
    analyticsEvents: {
      type: new GraphQLList(AnalyticsEventType),
      args: {
        userId: { type: GraphQLInt },
        eventType: { type: GraphQLString },
        limit: { type: GraphQLInt, defaultValue: 100 },
      },
      resolve: (_, args, context) => context.db.query.analyticsEvents.findMany({ limit: args.limit }),
    },

    // Payment queries
    payment: {
      type: PaymentType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (_, args, context) => context.db.query.payments.findFirst({ where: (p, { eq }) => eq(p.id, args.id) }),
    },
    payments: {
      type: new GraphQLList(PaymentType),
      args: {
        status: { type: GraphQLString },
        limit: { type: GraphQLInt, defaultValue: 50 },
      },
      resolve: (_, args, context) => context.db.query.payments.findMany({ limit: args.limit }),
    },

    // Audit queries
    audit: {
      type: AuditType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (_, args, context) => context.db.query.audits.findFirst({ where: (a, { eq }) => eq(a.id, args.id) }),
    },
    audits: {
      type: new GraphQLList(AuditType),
      args: { limit: { type: GraphQLInt, defaultValue: 50 } },
      resolve: (_, args, context) => context.db.query.audits.findMany({ limit: args.limit }),
    },
  }),
});

// Root Mutation Type
export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Placeholder mutations - will implement in next phase
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
      },
      resolve: () => null, // TODO: implement
    },
  }),
});

// Create the GraphQL Schema
export const graphqlSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
