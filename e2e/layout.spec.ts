import { test, expect } from '@playwright/test';

test('store pages render a single header and footer', async ({ page, baseURL }) => {
  const base = baseURL || 'http://localhost:3000';
  // Check store index
  await page.goto(base + '/store');
  await page.waitForLoadState('networkidle');
  const headers = await page.locator('header').count();
  const footers = await page.locator('footer').count();
  expect(headers).toBe(1);
  expect(footers).toBe(1);

  // Check a product page too
  await page.goto(base + '/store/products');
  await page.waitForLoadState('networkidle');
  const headers2 = await page.locator('header').count();
  const footers2 = await page.locator('footer').count();
  expect(headers2).toBe(1);
  expect(footers2).toBe(1);
});
