import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/store';

test.describe('Store responsive screenshots', () => {
  test('mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/store-mobile.png', fullPage: true });
  });

  test('tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/store-tablet.png', fullPage: true });
  });

  test('desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/store-desktop.png', fullPage: true });
  });
});
