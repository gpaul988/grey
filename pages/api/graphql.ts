/**
 * GraphQL Endpoint
 * Direct graphql-js implementation
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { graphql, buildSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@/lib/graphql/schema';
import { resolvers } from '@/lib/graphql/resolvers';
import { createGraphQLContext, type GraphQLContext } from '@/lib/graphql/context';
import { validateQueryComplexity } from '@/lib/graphql/middleware';

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  let limit = rateLimitMap.get(clientId);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 100) {
    return false;
  }

  limit.count++;
  return true;
}

// Schema singleton
let schema: any = null;

function getSchema() {
  if (!schema) {
    try {
      schema = makeExecutableSchema({ typeDefs, resolvers });
    } catch (error) {
      console.error('Schema error:', error);
      throw error;
    }
  }
  return schema;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientId = (req.headers['x-forwarded-for'] as string) || '127.0.0.1';
    if (!checkRateLimit(clientId)) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    // Parse body
    const { query, variables, operationName } = req.body || {};

    if (!query) {
      return res.status(400).json({ error: 'No query provided' });
    }

    // Validate complexity
    if (!validateQueryComplexity(query)) {
      return res.status(400).json({ error: 'Query complexity exceeds limit' });
    }

    // Create context
    const context = await createGraphQLContext(req, res);

    // Get schema
    const schema = getSchema();

    // Execute query
    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      operationName,
      rootValue: {},
      contextValue: context,
    });

    // Send response
    res.setHeader('Content-Type', 'application/json');
    return res.status(result.errors ? 200 : 200).json(result);
  } catch (error: any) {
    console.error('[GraphQL Error]', error);

    return res.status(500).json({
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message,
      ...(process.env.DEBUG && { stack: error.stack }),
    });
  }
}
