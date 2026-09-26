import { readFileSync } from 'node:fs';
import { test as base, expect } from '@playwright/test';

/**
 * Shared test setup.
 *
 * - Hermetic network: the site's two third-party origins are answered from
 *   local fixtures, and any OTHER outside request fails the test (the site
 *   must never start calling a new origin without anyone noticing).
 * - Health checks after every test: no uncaught exceptions, no console
 *   errors, no Content-Security-Policy or Trusted Types violations.
 * - `lang` and `skipIntro` options pick the language and whether the
 *   once-per-session loading screen has already been seen.
 */

const DISH_JPG = readFileSync(new URL('./assets/dish.jpg', import.meta.url));
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

/** The English UI text, so assertions read like the page. */
export const en = JSON.parse(readFileSync(new URL('../../src/locales/en/translation.json', import.meta.url), 'utf8'));

/** Playwright's `test`, with the options and health checks above. */
export const test = base.extend({
  lang: ['en', { option: true }],
  skipIntro: [true, { option: true }],

  page: async ({ page, lang, skipIntro }, use) => {
    const health = {
      /** @type {string[]} uncaught exceptions and console errors */
      errors: [],
      /** @type {string[]} requests to origins the site should never call */
      blockedRequests: [],
    };

    // Language and intro state are in place before any app code runs.
    await page.addInitScript(
      ({ lang: l, skip }) => {
        if (!localStorage.getItem('maydarwe-lang')) localStorage.setItem('maydarwe-lang', l);
        if (skip) sessionStorage.setItem('maydarwe-intro-seen', '1');
        // Record CSP / Trusted Types violations: they are silent otherwise.
        document.addEventListener('securitypolicyviolation', (e) => {
          console.error(`CSP violation: ${e.violatedDirective} blocked ${e.blockedURI || '(inline)'}`);
        });
      },
      { lang, skip: skipIntro }
    );

    page.on('pageerror', (error) => health.errors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      // Our own 404 for the stubbed video is expected; everything else is not.
      if (/Failed to load resource: the server responded with a status of 404/.test(message.text())) return;
      health.errors.push(`console.error: ${message.text()}`);
    });

    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (LOCAL_HOSTS.has(url.hostname) || url.protocol === 'data:' || url.protocol === 'blob:') {
        return route.fallback();
      }
      if (url.hostname === 'res.cloudinary.com') {
        if (url.pathname.includes('/video/') || url.pathname.endsWith('.glb')) return route.fulfill({ status: 404 });
        return route.fulfill({ status: 200, contentType: 'image/jpeg', body: DISH_JPG });
      }
      if (url.hostname === 'www.google.com' && url.pathname.startsWith('/maps')) {
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Map</title>' });
      }
      health.blockedRequests.push(url.href);
      return route.abort('blockedbyclient');
    });

    await use(page);

    expect(health.errors, 'no uncaught errors, console errors or CSP violations').toEqual([]);
    expect(health.blockedRequests, 'no requests to unapproved third-party origins').toEqual([]);
  },
});

export { expect };

/**
 * The navbar cart button (its accessible name includes the item count).
 * @param {import('@playwright/test').Page} page
 */
export const cartButton = (page) => page.getByRole('banner').getByRole('button', { name: /^Cart/ });
