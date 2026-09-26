import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end smoke tests (tests/e2e). They run against the real production
 * build served by `vite preview`, which sends the production security headers
 * (CSP, Trusted Types), so a CSP regression fails here before it reaches Vercel.
 *
 *   npm run build && npm run test:e2e
 *
 * Every third-party request (Cloudinary, Google Maps) is answered from local
 * fixtures (tests/e2e/fixtures.js), so the tests are fast, offline and stable.
 */
if (!existsSync(new URL('./dist/index.html', import.meta.url))) {
  throw new Error('No production build found: run `npm run build` before `npm run test:e2e`.');
}

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const CI = !!process.env.CI;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: CI, // a stray test.only() fails CI instead of silently skipping the rest
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Optional: point at an already-installed Chromium instead of Playwright's download.
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !CI,
    timeout: 60_000,
  },
});
