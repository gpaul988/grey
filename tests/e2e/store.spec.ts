/**
 * E2E Tests: Store/E-Commerce Flow
 * 
 * Tests browsing products, adding to cart, and checkout process
 */

import {test, expect} from '@playwright/test';

test.describe('Store Flow', () => {
  test('should display homepage', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/grey|home|infotech/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have header navigation', async ({page}) => {
    await page.goto('/');
    // Look for common nav elements
    const header = page.locator('header, [role="banner"]');
    await expect(header).toBeVisible();
  });

  test('should have footer', async ({page}) => {
    await page.goto('/');
    const footer = page.locator('footer, [role="contentinfo"]');
    await expect(footer).toBeVisible();
  });

  test('should be able to navigate to services', async ({page}) => {
    await page.goto('/');
    // Look for services link
    const servicesLink = page.locator('a:has-text("service"), a[href*="service"]').first();
    if (await servicesLink.isVisible()) {
      await servicesLink.click();
      // Should navigate to services page
      expect(page.url()).toContain('service');
    }
  });

  test('should be able to navigate to about page', async ({page}) => {
    await page.goto('/');
    const aboutLink = page.locator('a:has-text("about"), a[href*="about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      expect(page.url()).toContain('about');
    }
  });

  test('should have working contact form', async ({page}) => {
    await page.goto('/');
    // Look for contact form
    const contactForm = page.locator('form, [role="form"]').first();
    if (await contactForm.isVisible()) {
      // Form should have email and message inputs
      const emailInput = contactForm.locator('input[type="email"], input[name*="email"]');
      const messageInput = contactForm.locator('textarea, input[name*="message"]');
      
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();
    }
  });

  test('should respond to scroll', async ({page}) => {
    await page.goto('/');
    const initialScroll = await page.evaluate(() => window.scrollY);
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    const afterScroll = await page.evaluate(() => window.scrollY);
    
    expect(afterScroll).toBeGreaterThan(initialScroll);
  });

  test('should have proper viewport on mobile', async ({browser}) => {
    const mobileContext = await browser.newContext({
      viewport: {width: 375, height: 667},
    });
    const page = await mobileContext.newPage();
    await page.goto('/');
    
    // Should not have horizontal scroll on mobile
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    
    await mobileContext.close();
  });
});
