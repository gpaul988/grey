import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { GraphQLSchema, GraphQLObjectType, GraphQLField, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { createGraphQLContext } from './context';
import { db, getDb } from '../db';
import { users, services, analyticsEvents, payments, audits } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { Request } from 'express';

/**
 * Build GraphQL Schema
 */
function buildSchema() {
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      role: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      emailVerified: { type: new GraphQLNonNull(GraphQLBoolean) },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });

  const ServiceType = new GraphQLObjectType({
    name: 'Service',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      slug: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      category: { type: GraphQLString },
      featured: { type: GraphQLBoolean },
    }),
  });

  const AnalyticsEventType = new GraphQLObjectType({
    name: 'AnalyticsEvent',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      eventType: { type: new GraphQLNonNull(GraphQLString) },
      eventName: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });

  const PaymentType = new GraphQLObjectType({
    name: 'Payment',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      amount: { type: GraphQLString },
      currency: { type: GraphQLString },
      provider: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });

  const AuditType = new GraphQLObjectType({
    name: 'Audit',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      score: { type: GraphQLInt },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      user: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
        resolve: async (_, { id }, context) => {
          return await context.db.query.users.findFirst({
            where: eq(users.id, id),
          });
        },
      },
      users: {
        type: new GraphQLList(UserType),
        args: { limit: { type: GraphQLInt, defaultValue: 100 } },
        resolve: async (_, { limit }, context) => {
          return await context.db.query.users.findMany({ limit });
        },
      },
      me: {
        type: UserType,
        resolve: (_, __, context) => context.user,
      },
      service: {
        type: ServiceType,
        args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
        resolve: async (_, { id }, context) => {
          return await context.db.query.services.findFirst({
            where: eq(services.id, id),
          });
        },
      },
      services: {
        type: new GraphQLList(ServiceType),
        args: { limit: { type: GraphQLInt, defaultValue: 50 } },
        resolve: async (_, { limit }, context) => {
          return await context.db.query.services.findMany({ limit });
        },
      },
      payments: {
        type: new GraphQLList(PaymentType),
        args: { limit: { type: GraphQLInt, defaultValue: 50 } },
        resolve: async (_, { limit }, context) => {
          return await context.db.query.payments.findMany({ limit });
        },
      },
      audits: {
        type: new GraphQLList(AuditType),
        args: { limit: { type: GraphQLInt, defaultValue: 50 } },
        resolve: async (_, { limit }, context) => {
          return await context.db.query.audits.findMany({
            limit,
            orderBy: desc(audits.createdAt),
          });
        },
      },
    }),
  });

  return new GraphQLSchema({
    query: QueryType,
  });
}

/**
 * Create Apollo Server instance
 */
export async function createApolloServer() {
  const schema = buildSchema();

  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        code: (error.extensions as any)?.code,
      };
    },
  });

  await server.start();
  return server;
}

/**
 * GraphQL Context factory
 */
export async function graphqlContextFactory(req: Request) {
  return await createGraphQLContext(req);
}
