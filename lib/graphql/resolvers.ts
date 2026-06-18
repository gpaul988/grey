import { GraphQLContext } from './context';
import { db } from '../db';
import { users, services, analyticsEvents, payments, audits } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

export const resolvers = {
  Query: {
    // User resolvers
    async user(_: any, { id }: { id: number }, context: GraphQLContext) {
      return await db.query.users.findFirst({
        where: eq(users.id, id),
      });
    },

    async users(_: any, { filter, limit, offset }: any, context: GraphQLContext) {
      return await db.query.users.findMany({
        limit,
        offset,
      });
    },

    async me(_: any, __: any, context: GraphQLContext) {
      return context.user;
    },

    // Service resolvers
    async service(_: any, { id }: { id: number }, context: GraphQLContext) {
      return await db.query.services.findFirst({
        where: eq(services.id, id),
      });
    },

    async services(_: any, { filter, limit }: any, context: GraphQLContext) {
      return await db.query.services.findMany({
        limit,
      });
    },

    async serviceBySlug(_: any, { slug }: { slug: string }, context: GraphQLContext) {
      return await db.query.services.findFirst({
        where: eq(services.slug, slug),
      });
    },

    // Analytics resolvers
    async analyticsEvents(_: any, { userId, eventType, limit }: any, context: GraphQLContext) {
      return await db.query.analyticsEvents.findMany({
        limit,
      });
    },

    // Payment resolvers
    async payment(_: any, { id }: { id: number }, context: GraphQLContext) {
      return await db.query.payments.findFirst({
        where: eq(payments.id, id),
      });
    },

    async payments(_: any, { status, limit }: any, context: GraphQLContext) {
      return await db.query.payments.findMany({
        limit,
      });
    },

    // Audit resolvers
    async audit(_: any, { id }: { id: number }, context: GraphQLContext) {
      return await db.query.audits.findFirst({
        where: eq(audits.id, id),
      });
    },

    async audits(_: any, { limit }: any, context: GraphQLContext) {
      return await db.query.audits.findMany({
        limit,
        orderBy: desc(audits.createdAt),
      });
    },
  },

  Mutation: {
    async updateUser(_: any, { id, name }: any, context: GraphQLContext) {
      // TODO: implement update logic
      return null;
    },
  },
};
