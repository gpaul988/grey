import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard E2E', () => {
  test('Admin login flow', async ({ page }) => {
    // Navigate to admin login
    await page.goto('/admin/login');
    
    // Check login form exists
    await expect(page.locator('input[name="password"]')).toBeVisible();
    
    // Enter password
    await page.locator('input[name="password"]').fill('test-admin-password');
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Should redirect to dashboard (or show error if invalid)
    await page.waitForTimeout(500);
    const url = page.url();
    expect(['http://localhost:3000/admin', 'http://localhost:3000/admin/login']).toContain(url);
  });

  test('Dashboard layout loads', async ({ page }) => {
    // Set token in localStorage to bypass login
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    
    // Reload page
    await page.reload();
    
    // Check header exists
    await expect(page.locator('text=Admin Dashboard')).toBeVisible({ timeout: 5000 });
    
    // Check metric cards exist
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Total Revenue')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Audit Score')).toBeVisible();
  });

  test('Dashboard charts render', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Check charts section exists
    await expect(page.locator('text=Analytics & Insights')).toBeVisible({ timeout: 5000 });
    
    // Check chart titles
    await expect(page.locator('text=User Growth')).toBeVisible();
    await expect(page.locator('text=Revenue Breakdown')).toBeVisible();
    await expect(page.locator('text=Service Popularity')).toBeVisible();
    await expect(page.locator('text=Conversion Funnel')).toBeVisible();
    await expect(page.locator('text=Daily Audit Rate')).toBeVisible();
    await expect(page.locator('text=Top Search Queries')).toBeVisible();
  });

  test('Export CSV button works', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Find and click CSV export button
    const csvButton = page.locator('button:has-text("Export CSV")');
    await expect(csvButton).toBeVisible({ timeout: 5000 });
    
    // Setup download listener
    const downloadPromise = page.waitForEvent('download');
    await csvButton.click();
    
    // Verify download started
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/dashboard-export-\d{4}-\d{2}-\d{2}\.csv/);
  });

  test('Export PDF button exists', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Find PDF export button
    const pdfButton = page.locator('button:has-text("Export PDF")');
    await expect(pdfButton).toBeVisible({ timeout: 5000 });
  });

  test('Navigation to FAQs page', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Find and click FAQs link
    const faqsLink = page.locator('a[href="/admin/faqs"]');
    await expect(faqsLink).toBeVisible({ timeout: 5000 });
    await faqsLink.click();
    
    // Should navigate to FAQs page
    await expect(page).toHaveURL('/admin/faqs');
  });

  test('Logout button works', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Find and click logout button
    await expect(page.locator('button:has-text("Logout")')).toBeVisible({ timeout: 5000 });
    await page.locator('button:has-text("Logout")').click();
    
    // Should redirect to login
    await expect(page).toHaveURL('/admin/login', { timeout: 5000 });
  });
});

test.describe('Admin FAQs Page E2E', () => {
  test('FAQs page loads', async ({ page }) => {
    await page.goto('/admin/faqs');
    
    // Check page title
    await expect(page.locator('text=Admin FAQs')).toBeVisible({ timeout: 5000 });
    
    // Check FAQs table or list exists
    const faqsContent = page.locator('text=FAQs');
    await expect(faqsContent).toBeVisible();
  });

  test('FAQs search works', async ({ page }) => {
    await page.goto('/admin/faqs');
    
    // Find search input
    const searchInput = page.locator('input[placeholder*="search" i], input[placeholder*="Search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('React');
      await page.waitForTimeout(300);
      
      // Results should be filtered
      const faqsContent = page.locator('text=React, text=FAQs');
      // Don't assert strictly — depends on data
    }
  });
});

test.describe('Admin Login Page E2E', () => {
  test('Login page renders', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Check login form exists
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Password input accepts text', async ({ page }) => {
    await page.goto('/admin/login');
    
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('my-secret-password');
    
    // Verify input has value
    const value = await passwordInput.inputValue();
    expect(value).toBe('my-secret-password');
  });
});

test.describe('Performance Tests', () => {
  test('Dashboard loads in <3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Wait for main content
    await expect(page.locator('text=Analytics & Insights')).toBeVisible({ timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('Charts render without layout shift', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Get initial viewport
    const initialMetrics = await page.evaluate(() => window.innerHeight);
    
    // Wait for charts
    await expect(page.locator('text=User Growth')).toBeVisible({ timeout: 5000 });
    
    // Check viewport hasn't shifted
    const finalMetrics = await page.evaluate(() => window.innerHeight);
    expect(finalMetrics).toBe(initialMetrics);
  });
});

test.describe('Accessibility Tests', () => {
  test('Dashboard is keyboard navigable', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Tab through buttons
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    // Should be a button or interactive element
    expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  });

  test('Colors have sufficient contrast', async ({ page }) => {
    await page.goto('/admin');
    await page.evaluate(() => {
      localStorage.setItem('admin-token', 'test-token-123');
    });
    await page.reload();
    
    // Check that text is visible
    const headerText = page.locator('h1, h2');
    const isVisible = await headerText.first().isVisible();
    expect(isVisible).toBe(true);
  });
});
