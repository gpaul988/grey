import { defineConfig, devices } from '@playwright/test';

// Configure reporters - HTML always, GitHub only in CI
const reporters: any[] = [['html']];
if (process.env.CI) {
  reporters.push(['github']);
}

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: reporters,
  timeout: 30000, // 30 second timeout per test
  globalTimeout: 600000, // 10 minute global timeout
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: undefined, // CI starts server separately via workflow; local dev doesn't use it
});
