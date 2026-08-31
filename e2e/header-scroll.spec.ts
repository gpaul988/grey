import { test, expect } from '@playwright/test';

test('header hides on scroll down and shows on scroll up', async ({ page, baseURL }) => {
  const base = baseURL || 'http://localhost:3000';
  await page.goto(base + '/store');
  await page.waitForLoadState('networkidle');

  const header = page.locator('header');
  await expect(header).toHaveCount(1);

  // Ensure header is visible initially
  const rect1 = await header.evaluate((el) => el.getBoundingClientRect().top);
  expect(rect1).toBeGreaterThanOrEqual(0);

  // Scroll down sufficiently to hide header
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'auto' }));
  await page.waitForTimeout(300);
  const rect2 = await header.evaluate((el) => el.getBoundingClientRect().top);
  // header should be off-screen (negative top) when hidden
  expect(rect2).toBeLessThan(0);

  // Scroll up to show header
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  await page.waitForTimeout(300);
  const rect3 = await header.evaluate((el) => el.getBoundingClientRect().top);
  expect(rect3).toBeGreaterThanOrEqual(0);
});