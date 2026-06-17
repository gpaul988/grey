/**
 * Playwright E2E Test Configuration
 * 
 * Runs end-to-end tests against the full application
 * Tests real user flows: signup, login, checkout, admin operations
 * 
 * Run: npm run test:e2e
 * Run single file: npm run test:e2e -- tests/e2e/auth.spec.ts
 * Debug: npx playwright test --debug
 */

import {defineConfig, devices} from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const adminURL = process.env.ADMIN_URL || 'http://localhost:3000/admin';

export default defineConfig({
  // Run 30 tests in parallel (adjust based on system resources)
  workers: process.env.CI ? 1 : undefined,

  // Test execution
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 30_000,

  // Output - use completely separate folders
  reporter: [
    ['html', {outputFolder: '.playwright/html-report'}],
    ['junit', {outputFile: '.playwright/junit.xml'}],
    ['list'],
  ],

  use: {
    // Base URL for relative navigation
    baseURL,

    // Screenshots and videos on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Trace on failure (inspect DOM, network, etc.)
    trace: 'on-first-retry',

    // User agent
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

    // Accept all dialogs
    acceptDownloads: true,
  },

  // Global setup (runs once before all tests)
  globalSetup: undefined,

  // Global teardown (runs once after all tests)
  globalTeardown: undefined,

  // WebServer configuration (auto-start server if not running)
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },

  // Test projects (browsers)
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    // {
    //   name: 'webkit',
    //   use: {...devices['Desktop Safari']},
    // },
  ],
});
