import { test, expect } from '@playwright/test';

const URL = '/store';

// increase default test timeout for slow dev server / asset loading
test.setTimeout(120000);

test('store responsive screenshots', async ({ page }) => {
  // mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'e2e/screenshots/store-mobile.png', fullPage: true });

  // tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'e2e/screenshots/store-tablet.png', fullPage: true });

  // desktop
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'e2e/screenshots/store-desktop.png', fullPage: true });

  // basic smoke assertions
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});
