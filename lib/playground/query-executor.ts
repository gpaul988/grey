/**
 * API Playground - Query Executor
 * Execute GraphQL and REST queries safely
 */

import { buildSchema, validate, parse, GraphQLError } from 'graphql';

export interface ExecutionResult {
  success: boolean;
  data?: unknown;
  errors?: Array<{ message: string; path?: string[] }>;
  executionTime: number;
}

export interface QueryValidationResult {
  valid: boolean;
  errors: Array<GraphQLError | { message: string }>;
}

// Simple GraphQL schema for playground
const DEFAULT_SCHEMA = buildSchema(`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
    post(id: ID!): Post
  }

  type User {
    id: ID!
    name: String
    email: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updatePost(id: ID!, title: String, content: String): Post
  }
`);

/**
 * Validate GraphQL query syntax
 */
export const validateGraphQLQuery = (query: string): QueryValidationResult => {
  try {
    const ast = parse(query);
    const errors = validate(DEFAULT_SCHEMA, ast);

    return {
      valid: errors.length === 0,
      errors: [...errors],
    };
  } catch (error) {
    return {
      valid: false,
      errors: [new GraphQLError((error as Error).message)],
    };
  }
};

/**
 * Execute GraphQL query with timeout
 */
export const executeGraphQLQuery = async (
  query: string,
  variables?: Record<string, unknown>,
  timeout: number = 5000
): Promise<ExecutionResult> => {
  const startTime = Date.now();

  try {
    // Validate query first
    const validation = validateGraphQLQuery(query);
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors.map(e => ({ message: e.message })),
        executionTime: Date.now() - startTime,
      };
    }

    // Simulate query execution with timeout
    const result = await Promise.race([
      executeQueryWithDelay(variables),
      new Promise<ExecutionResult>((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), timeout);
      }),
    ]);

    return {
      ...result,
      executionTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      errors: [{ message: (error as Error).message }],
      executionTime: Date.now() - startTime,
    };
  }
};

/**
 * Execute REST query (mock)
 */
export const executeRESTQuery = async (
  method: string,
  url: string,
  body?: unknown,
  timeout: number = 5000
): Promise<ExecutionResult> => {
  const startTime = Date.now();

  try {
    // Validate method
    if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
      return {
        success: false,
        errors: [{ message: 'Invalid HTTP method' }],
        executionTime: Date.now() - startTime,
      };
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return {
        success: false,
        errors: [{ message: 'Invalid URL format' }],
        executionTime: Date.now() - startTime,
      };
    }

    // Simulate REST call with timeout
    const result = await Promise.race([
      simulateRESTCall(method, url, body),
      new Promise<ExecutionResult>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      }),
    ]);

    return {
      ...result,
      executionTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      errors: [{ message: (error as Error).message }],
      executionTime: Date.now() - startTime,
    };
  }
};

/**
 * Get GraphQL schema for introspection
 */
export const getGraphQLSchema = () => {
  return DEFAULT_SCHEMA.getQueryType()?.getFields();
};

/**
 * Format query for display
 */
export const formatQuery = (query: string): string => {
  return query
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'))
    .join('\n');
};

// Helper functions

const executeQueryWithDelay = async (
  variables?: Record<string, unknown>
): Promise<Omit<ExecutionResult, 'executionTime'>> => {
  // Simulate query execution with mock data
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));

  const mockData = {
    hello: 'Hello from GraphQL Playground!',
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      posts: [
        { id: '1', title: 'First Post', content: 'Content 1' },
        { id: '2', title: 'Second Post', content: 'Content 2' },
      ],
    },
    users: [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ],
  };

  return {
    success: true,
    data: mockData,
  };
};

const simulateRESTCall = async (
  method: string,
  url: string,
  body?: unknown
): Promise<Omit<ExecutionResult, 'executionTime'>> => {
  // Simulate REST call with mock data
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));

  const mockResponses: Record<string, unknown> = {
    GET: { status: 200, message: 'Success' },
    POST: { status: 201, id: Math.random(), created: new Date().toISOString() },
    PUT: { status: 200, updated: new Date().toISOString() },
    DELETE: { status: 204, deleted: true },
    PATCH: { status: 200, patched: true },
  };

  return {
    success: true,
    data: {
      method,
      url,
      request: body,
      response: mockResponses[method.toUpperCase()] || { status: 200, ok: true },
    },
  };
};
