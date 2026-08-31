import { test, expect } from '@playwright/test';

test('footer logo navigates to /store', async ({ page, baseURL }) => {
  const base = baseURL || 'http://localhost:3000';
  await page.goto(base + '/store/products');
  await page.waitForLoadState('networkidle');

  const logo = page.locator('footer a:has(img[alt="Grey TechStore logo"])');
  await expect(logo).toHaveCount(1);
  await logo.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/store$/);
});