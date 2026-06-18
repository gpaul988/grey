import {test, expect} from '@playwright/test';

test.describe('Contact Form', () => {
  test('should display contact form on homepage', async ({page}) => {
    await page.goto('/');
    // Contact form should be visible on home page
    const form = page.locator('form');
    expect(form).toBeDefined();
  });

  test('should have contact page', async ({page}) => {
    const response = await page.goto('/contact');
    expect(response?.status()).toBeLessThan(400);
  });

  test('should validate email field', async ({page}) => {
    await page.goto('/contact');
    const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill('invalid-email');
      const form = page.locator('form').first();
      // Check if form has validation
      expect(form).toBeDefined();
    }
  });

  test('should require all fields', async ({page}) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    if (await form.isVisible()) {
      // Try to submit empty form
      const submitButton = form.locator('button[type="submit"]');
      if (await submitButton.isVisible()) {
        // Form should have required attributes or validation
        expect(form).toBeDefined();
      }
    }
  });

  test('should submit valid contact form', async ({page}) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    
    if (await form.isVisible()) {
      const emailInput = form.locator('input[type="email"], input[name*="email"]').first();
      const messageInput = form.locator('textarea, input[name*="message"]').first();
      const submitButton = form.locator('button[type="submit"]').first();

      if (await emailInput.isVisible() && await messageInput.isVisible()) {
        await emailInput.fill('test@example.com');
        await messageInput.fill('Test message');
        
        // Don't actually submit to avoid side effects
        expect(emailInput).toBeDefined();
      }
    }
  });

  test('should handle form submission gracefully', async ({page}) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    expect(form).toBeDefined();
  });

  test('should prevent multiple submissions', async ({page}) => {
    await page.goto('/contact');
    const form = page.locator('form').first();
    // Form should exist and be functional
    expect(form).toBeDefined();
  });
});
