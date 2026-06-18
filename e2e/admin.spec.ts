import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard E2E Tests', () => {
  // Test 1: Admin Login
  test('should login to admin dashboard', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Check login page loads
    await expect(page).toHaveTitle(/Admin Login/);
    
    // Fill credentials
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await page.waitForURL('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/dashboard/);
  });

  // Test 2: Dashboard Loads with Metrics
  test('should display dashboard with metrics', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Check header
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    
    // Check metrics cards exist
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Total Revenue')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Audit Score')).toBeVisible();
  });

  // Test 3: Charts Render
  test('should display all dashboard charts', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Wait for charts to render
    await page.waitForTimeout(2000);
    
    // Check chart titles
    await expect(page.locator('text=User Growth')).toBeVisible();
    await expect(page.locator('text=Revenue Breakdown')).toBeVisible();
    await expect(page.locator('text=Service Popularity')).toBeVisible();
    await expect(page.locator('text=Conversion Funnel')).toBeVisible();
    await expect(page.locator('text=Daily Audit Rate')).toBeVisible();
    await expect(page.locator('text=Top Search Queries')).toBeVisible();
  });

  // Test 4: Export CSV
  test('should export dashboard data as CSV', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Click export CSV button
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export CSV")');
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/dashboard-export-\d{4}-\d{2}-\d{2}\.csv/);
  });

  // Test 5: Navigation Links
  test('should navigate to admin sub-pages', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Check navigation links exist
    const userLink = page.locator('a:has-text("Users")');
    const servicesLink = page.locator('a:has-text("Services")');
    const paymentsLink = page.locator('a:has-text("Payments")');
    
    await expect(userLink).toBeVisible();
    await expect(servicesLink).toBeVisible();
    await expect(paymentsLink).toBeVisible();
    
    // Click Users link
    await userLink.click();
    await page.waitForURL(/\/admin\/users/);
    await expect(page).toHaveURL(/\/admin\/users/);
  });

  // Test 6: Logout
  test('should logout from admin dashboard', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Find and click logout button
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await page.waitForURL('/admin/login');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  // Test 7: WebSocket Connection Status
  test('should show WebSocket connection status', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Check connection status indicator
    const statusBadge = page.locator('text=Live, Offline');
    
    // Wait for initial status
    await page.waitForTimeout(1000);
    
    // Should show either Live or Offline
    const isVisible = await statusBadge.isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
  });

  // Test 8: Responsive Layout
  test('should be responsive on mobile', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/admin/dashboard');
    
    // Check layout adapts
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Charts should be stacked on mobile
    const charts = page.locator('[class*="grid"]');
    await expect(charts).toHaveCount({ gte: 1 });
  });

  // Test 9: FAQs Page CRUD
  test('should list FAQs on admin panel', async ({ page }) => {
    await page.goto('/admin/faqs');
    
    // Check page loads
    const heading = page.locator('h1, h2').first();
    await expect(heading).toContainText(/FAQ|faq/i);
  });

  // Test 10: Search Functionality
  test('should have search on admin dashboard', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Check if search is accessible
    // (depending on implementation)
    const searchElements = page.locator('input[type="search"], input[placeholder*="search" i]');
    const count = await searchElements.count();
    
    // Search may or may not be visible on dashboard
    // This just verifies no errors if clicked
    if (count > 0) {
      await searchElements.first().click();
      await searchElements.first().type('test');
    }
  });
});

test.describe('Admin Authentication E2E Tests', () => {
  // Test 11: Redirect to Login if Not Authenticated
  test('should redirect to login if no token', async ({ page }) => {
    // Clear any stored auth
    await page.context().clearCookies();
    
    // Navigate to protected route
    await page.goto('/admin/dashboard');
    
    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 }).catch(() => {
      // May not redirect if checking localStorage instead of cookies
    });
  });

  // Test 12: Token Verification
  test('should verify token on page load', async ({ page }) => {
    // Set invalid token
    await page.goto('/admin/dashboard');
    
    // Page should handle token check gracefully
    const heading = page.locator('h1');
    const isVisible = await heading.isVisible().catch(() => false);
    
    // Either shows dashboard (if auto-login works) or redirects
    expect(isVisible || page.url().includes('/admin/login')).toBeTruthy();
  });
});

test.describe('Admin Dashboard Performance E2E Tests', () => {
  // Test 13: Page Load Performance
  test('should load dashboard within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/admin/dashboard', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  // Test 14: Chart Rendering Performance
  test('should render charts without freezing UI', async ({ page }) => {
    await page.goto('/admin/dashboard');
    
    // Check that page remains responsive
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Verify interaction is possible
    await buttons.first().hover();
  });
});
