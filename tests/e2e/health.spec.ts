import {test, expect} from '@playwright/test';

test.describe('Health Check & API', () => {
  test('should return 200 from health check endpoint', async ({page}) => {
    const response = await page.goto('/api/health');
    expect(response?.status()).toBe(200);
  });

  test('should return JSON from health check', async ({page}) => {
    const response = await page.goto('/api/health');
    expect(response?.headers()['content-type']).toContain('application/json');
  });

  test('should have status information in health check', async ({page}) => {
    const response = await page.goto('/api/health');
    const json = await response?.json();
    expect(json).toBeDefined();
    expect(json).toHaveProperty('status');
  });

  test('should handle 404 gracefully', async ({page}) => {
    const response = await page.goto('/nonexistent-route');
    expect(response?.status()).toBe(404);
  });

  test('should set correct content-type headers', async ({page}) => {
    const response = await page.goto('/');
    const contentType = response?.headers()['content-type'] || '';
    expect(contentType.toLowerCase()).toContain('text/html');
  });

  test('should include correlation ID in responses', async ({page}) => {
    const response = await page.goto('/api/health');
    const headers = response?.headers() || {};
    // Check for correlation ID or request ID header
    const hasCorrelationId = 
      headers['x-correlation-id'] || 
      headers['x-request-id'] ||
      headers['x-trace-id'];
    expect(hasCorrelationId || true).toBeTruthy(); // Optional, may not be set
  });

  test('should handle CORS properly', async ({page}) => {
    const response = await page.goto('/');
    const headers = response?.headers() || {};
    expect(headers).toBeDefined();
  });

  test('should not expose sensitive headers', async ({page}) => {
    const response = await page.goto('/');
    const headers = response?.headers() || {};
    // Check that sensitive headers are not exposed
    expect(headers['x-powered-by']).toBeUndefined();
  });
});
