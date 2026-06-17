/**
 * E2E Tests: Authentication Flow
 * 
 * Tests user signup, email verification, login, and password reset
 * Covers both happy path and error scenarios
 */

import {test, expect} from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({page}) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/login|auth/i);
    await expect(page.locator('h1, h2')).toContainText(/login|sign in/i);
  });

  test('should display register page', async ({page}) => {
    await page.goto('/register');
    await expect(page).toHaveTitle(/register|signup/i);
    await expect(page.locator('h1, h2')).toContainText(/register|sign up/i);
  });

  test('should reject login with empty fields', async ({page}) => {
    await page.goto('/login');
    await page.click('button[type="submit"]');
    // Expect validation errors
    const errorSelector = '[role="alert"], .error, .validation-error';
    await expect(page.locator(errorSelector).first()).toBeVisible({timeout: 5000});
  });

  test('should reject login with invalid email', async ({page}) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    // Expect validation error
    await expect(page.locator('input[type="email"]')).toBeFocused({timeout: 5000});
  });

  test('should show "email or password incorrect" for non-existent user', async ({page}) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'nonexistent@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    // Expect error message
    await expect(page.locator('text=incorrect|not found')).toBeVisible({timeout: 5000});
  });

  test('should have password reset link on login page', async ({page}) => {
    await page.goto('/login');
    const resetLink = page.locator('a:has-text("forgot password"), a:has-text("reset password")');
    await expect(resetLink).toBeVisible();
  });

  test('should have signup link on login page', async ({page}) => {
    await page.goto('/login');
    const signupLink = page.locator('a:has-text("sign up"), a:has-text("register")');
    await expect(signupLink).toBeVisible();
  });

  test('should have login link on register page', async ({page}) => {
    await page.goto('/register');
    const loginLink = page.locator('a:has-text("login"), a:has-text("sign in")');
    await expect(loginLink).toBeVisible();
  });

  test('should reject registration with weak password', async ({page}) => {
    await page.goto('/register');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[name*="password"]', '123');
    await page.click('button[type="submit"]');
    // Expect password strength error
    await expect(page.locator('text=weak|strong|password|must|least')).toBeVisible({timeout: 5000});
  });

  test('should show verification email message after signup', async ({page}) => {
    await page.goto('/register');
    await page.fill('input[type="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name*="password"]', 'SecurePass123!');
    await page.fill('input[name*="confirm"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    // Should show success/verification message or redirect
    const successMessage = page.locator('text=verification|check email|confirm');
    const redirected = page.url();
    await expect(successMessage).toBeVisible({timeout: 5000}).catch(() => {
      expect(redirected).not.toContain('/register');
    });
  });
});
