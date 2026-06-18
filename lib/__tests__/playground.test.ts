import { describe, it, expect } from 'vitest';
import {
  validateGraphQLQuery,
  executeGraphQLQuery,
  executeRESTQuery,
  formatQuery,
} from '@/lib/playground/query-executor';

describe('API Playground (Phase 6.8)', () => {
  describe('GraphQL Validation', () => {
    it('should validate valid GraphQL query', () => {
      const query = `
        query {
          user(id: "1") {
            id
            name
            email
          }
        }
      `;
      const result = validateGraphQLQuery(query);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid GraphQL syntax', () => {
      const query = `query { user(id: "1" { name } }`; // Missing closing paren
      const result = validateGraphQLQuery(query);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate mutations', () => {
      const query = `
        mutation CreateUser {
          createUser(name: "John", email: "john@example.com") {
            id
            name
          }
        }
      `;
      const result = validateGraphQLQuery(query);
      expect(result.valid).toBe(true);
    });

    it('should handle complex queries', () => {
      const query = `
        query GetUserPosts {
          user(id: "1") {
            id
            name
            posts {
              id
              title
              content
            }
          }
        }
      `;
      const result = validateGraphQLQuery(query);
      expect(result.valid).toBe(true);
    });
  });

  describe('GraphQL Execution', () => {
    it('should execute valid query', async () => {
      const query = `
        query {
          hello
        }
      `;
      const result = await executeGraphQLQuery(query);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
    });

    it('should execute query with variables', async () => {
      const query = `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
          }
        }
      `;
      const result = await executeGraphQLQuery(query, { id: '1' });
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should handle invalid query in execution', async () => {
      const query = `query { invalidField }`;
      const result = await executeGraphQLQuery(query);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should respect timeout', async () => {
      const query = `query { user(id: "1") { id } }`;
      const result = await executeGraphQLQuery(query, {}, 1); // 1ms timeout
      expect(result.executionTime).toBeDefined();
    });
  });

  describe('REST Execution', () => {
    it('should execute GET request', async () => {
      const result = await executeRESTQuery('GET', 'http://api.example.com/users');
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should execute POST request with body', async () => {
      const result = await executeRESTQuery('POST', 'http://api.example.com/users', {
        name: 'John',
        email: 'john@example.com',
      });
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should support all HTTP methods', async () => {
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        const result = await executeRESTQuery(method, 'http://api.example.com/resource');
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid HTTP method', async () => {
      const result = await executeRESTQuery('INVALID', 'http://api.example.com/users');
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should reject invalid URL', async () => {
      const result = await executeRESTQuery('GET', 'not-a-valid-url');
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should handle request timeout', async () => {
      const result = await executeRESTQuery('GET', 'http://api.example.com/slow', undefined, 1);
      expect(result.executionTime).toBeDefined();
    });
  });

  describe('Query Formatting', () => {
    it('should format multi-line query', () => {
      const query = `
        query {
          user(id: "1") {
            name
          }
        }
      `;
      const formatted = formatQuery(query);
      expect(formatted).toBeTruthy();
      expect(formatted.includes('query')).toBe(true);
    });

    it('should remove comments', () => {
      const query = `
        # Get user
        query {
          user(id: "1") {
            # User name
            name
          }
        }
      `;
      const formatted = formatQuery(query);
      expect(formatted.includes('#')).toBe(false);
    });

    it('should preserve query structure', () => {
      const query = `query { user(id: "1") { name } }`;
      const formatted = formatQuery(query);
      expect(formatted).toContain('query');
      expect(formatted).toContain('user');
    });
  });

  describe('Integration Tests', () => {
    it('should validate then execute query', async () => {
      const query = `query { hello }`;
      const validation = validateGraphQLQuery(query);
      expect(validation.valid).toBe(true);

      const execution = await executeGraphQLQuery(query);
      expect(execution.success).toBe(true);
    });

    it('should handle mixed GraphQL and REST in playground', async () => {
      const graphqlResult = await executeGraphQLQuery(`query { hello }`);
      const restResult = await executeRESTQuery('GET', 'http://api.example.com/status');

      expect(graphqlResult.success).toBe(true);
      expect(restResult.success).toBe(true);
    });

    it('should measure execution time accurately', async () => {
      const query = `query { user(id: "1") { id name } }`;
      const result = await executeGraphQLQuery(query);

      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.executionTime).toBeLessThan(10000); // Should complete in under 10 seconds
    });
  });
});
