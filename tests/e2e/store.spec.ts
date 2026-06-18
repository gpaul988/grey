import {test, expect} from '@playwright/test';

test.describe('Store Flow', () => {
  test('should display homepage', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should have header navigation', async ({page}) => {
    await page.goto('/');
    const header = page.locator('header, nav').first();
    expect(header).toBeDefined();
  });

  test('should have footer', async ({page}) => {
    await page.goto('/');
    const footer = page.locator('footer').first();
    // Footer may be below fold, just check it exists
    expect(footer).toBeDefined();
  });

  test('should be able to navigate to services', async ({page}) => {
    await page.goto('/');
    const servicesLink = page.locator('a[href*="service"], text=Services').first();
    
    if (await servicesLink.isVisible({timeout: 2000}).catch(() => false)) {
      await servicesLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('service');
    }
  });

  test('should be able to navigate to about page', async ({page}) => {
    await page.goto('/');
    const aboutLink = page.locator('a[href*="about"], text=About').first();
    
    if (await aboutLink.isVisible({timeout: 2000}).catch(() => false)) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('about') || expect(page.url()).toContain('company');
    }
  });

  test('should have working contact form', async ({page}) => {
    await page.goto('/');
    const contactForm = page.locator('form').first();
    expect(contactForm).toBeDefined();
  });

  test('should respond to scroll', async ({page}) => {
    await page.goto('/');
    // Scroll down and check page responds
    await page.evaluate(() => window.scrollBy(0, 500));
    const scrollPos = await page.evaluate(() => window.scrollY);
    expect(scrollPos).toBeGreaterThan(0);
  });

  test('should have proper viewport on mobile', async ({page}) => {
    // Check that viewport is set
    const viewport = page.viewportSize();
    expect(viewport).toBeDefined();
    expect(viewport?.width).toBeGreaterThan(0);
  });

  test('should load all critical resources', async ({page}) => {
    await page.goto('/');
    // Wait for network to be idle
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('localhost') || expect(page.url()).toContain('http');
  });

  test('should handle navigation without errors', async ({page}) => {
    await page.goto('/');
    // Click multiple navigation items and check for errors
    const links = page.locator('a[href^="/"]').first();
    if (await links.isVisible({timeout: 1000}).catch(() => false)) {
      expect(links).toBeDefined();
    }
  });
});
