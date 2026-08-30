import { test, expect } from '@playwright/test';

test('store header/footer width alignment and widgets absent', async ({ page, baseURL }) => {
  await page.goto('/store');

  // Wait for main content
  await page.waitForSelector('main');

  // Select container inside header and footer
  const headerContainer = await page.$('header > div.max-w-7xl');
  const footerContainer = await page.$('footer div.max-w-7xl, footer > div > div.max-w-7xl');

  expect(headerContainer).not.toBeNull();
  expect(footerContainer).not.toBeNull();

  const headerRect = await headerContainer!.evaluate((el) => el.getBoundingClientRect());
  const footerRect = await footerContainer!.evaluate((el) => el.getBoundingClientRect());

  // Allow 4px tolerance
  const diff = Math.abs(headerRect.width - footerRect.width);
  expect(diff).toBeLessThan(5);

  // Ensure client-only widgets are not rendered server-side on /store
  const aiLauncher = await page.$('button[aria-label="Open Grey AI assistant"]');
  const requestBtn = await page.$('[data-request-quote-floating-button]');
  expect(aiLauncher).toBeNull();
  expect(requestBtn).toBeNull();
});
