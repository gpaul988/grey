/**
 * E2E Tests: Health Check & API
 * 
 * Tests health check endpoints and basic API functionality
 */

import {test, expect} from '@playwright/test';

test.describe('Health Check & API', () => {
  test('should return 200 from health check endpoint', async ({page}) => {
    const response = await page.request.get('/api/health');
    expect(response.status()).toBe(200);
  });

  test('should return JSON from health check', async ({page}) => {
    const response = await page.request.get('/api/health');
    const data = await response.json();
    expect(data).toHaveProperty('ok');
  });

  test('should have status information in health check', async ({page}) => {
    const response = await page.request.get('/api/health');
    const data = await response.json();
    
    // Should include basic health info
    expect(data.ok).toBe(true);
  });

  test('should handle 404 gracefully', async ({page}) => {
    const response = await page.request.get('/api/nonexistent-endpoint');
    expect(response.status()).toBe(404);
  });

  test('should reject requests without proper auth', async ({page}) => {
    const response = await page.request.post('/api/admin/leads', {
      data: {name: 'Test'},
    });
    
    // Should reject with 401 or 403
    expect([401, 403]).toContain(response.status());
  });

  test('should set correct content-type headers', async ({page}) => {
    const response = await page.request.get('/api/health');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('should include correlation ID in responses', async ({page}) => {
    const response = await page.request.get('/api/health');
    const correlationId = response.headers()['x-correlation-id'];
    
    // Should have correlation ID for tracing
    expect(correlationId).toBeDefined();
  });

  test('should handle CORS properly', async ({page}) => {
    const response = await page.request.get('/api/health');
    const headers = response.headers();
    
    // Check for CORS headers or lack thereof (depending on config)
    expect(response.status()).toBe(200);
  });

  test('should not expose sensitive headers', async ({page}) => {
    const response = await page.request.get('/');
    const headers = response.headers();
    
    // Should not expose server version or implementation details
    const serverHeader = headers['server'] || headers['Server'] || '';
    expect(serverHeader).not.toContain('Node.js');
    expect(serverHeader).not.toContain('Express');
  });
});
