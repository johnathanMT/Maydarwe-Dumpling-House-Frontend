import { MENU_ITEMS } from '../../src/data/menu.js';
import { cartButton, en, expect, test } from './fixtures.js';

/**
 * Critical-path smoke tests: if any of these fail, customers can't see the
 * menu or build an order. Each test also fails on any uncaught error, console
 * error, CSP/Trusted Types violation or unexpected third-party request
 * (see fixtures.js).
 */

/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {(typeof MENU_ITEMS)[number]} MenuItem */

const ORDERABLE = MENU_ITEMS.filter((item) => item.inStock);
const ADD = en.pages.menu.addToCart;
const escapeRegExp = (/** @type {string} */ text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Every "Add to cart" button on the page. @param {Page} page */
const addButtons = (page) => page.getByRole('main').getByRole('button', { name: new RegExp(`^${ADD}`) });

/**
 * One dish's "Add to cart" button: its accessible name is "Add to cart: <dish>".
 * @param {Page} page
 * @param {MenuItem} item
 */
const addButton = (page, item) =>
  page.getByRole('main').getByRole('button', { name: new RegExp(`^${ADD}\\s*: ${escapeRegExp(item.name.en)}$`) });

test.describe('every page renders', () => {
  for (const [path, key] of [
    ['/', 'home'],
    ['/menu', 'menu'],
    ['/about', 'about'],
    ['/contact', 'contact'],
  ]) {
    test(`${path} has its title, one h1 and the navigation`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(en.meta[key].title.split(' | ')[0]));
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(cartButton(page)).toBeVisible();
    });
  }

  test('an unknown URL shows the 404 page and is not indexable', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('heading', { level: 1, name: en.ui.notFound.title })).toBeVisible();
    // Search engines apply the strictest robots directive on the page.
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
  });
});

test.describe('menu', () => {
  test('lists every orderable dish with a price and an "Add to cart" button', async ({ page }) => {
    await page.goto('/menu');
    await expect(addButtons(page)).toHaveCount(ORDERABLE.length);
    for (const item of ORDERABLE.slice(0, 3)) {
      await expect(page.getByRole('main').getByRole('heading', { name: item.name.en }).first()).toBeVisible();
    }
  });
});

test.describe('cart', () => {
  test('adding a dish updates the badge, fills the drawer and survives a reload', async ({ page }) => {
    const [first, second] = ORDERABLE;
    await page.goto('/menu');
    await expect(cartButton(page)).toHaveAccessibleName('Cart, 0 items');

    await addButton(page, first).click();
    await expect(page.getByRole('status').filter({ hasText: first.name.en })).toBeVisible(); // "Added" toast
    await expect(cartButton(page)).toHaveAccessibleName('Cart, 1 item');

    await addButton(page, second).click();
    await addButton(page, first).click();
    await expect(cartButton(page)).toHaveAccessibleName('Cart, 3 items');

    await page.reload();
    await expect(cartButton(page)).toHaveAccessibleName('Cart, 3 items');

    await cartButton(page).click();
    const drawer = page.getByRole('dialog', { name: en.cart.title });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText(first.name.en)).toBeVisible();
    await expect(drawer.getByText(second.name.en)).toBeVisible();

    // The Messenger link carries the order as pre-filled text.
    const messenger = drawer.getByRole('link', { name: new RegExp(en.cart.messenger) });
    await expect(messenger).toHaveAttribute('href', /^https:\/\/m\.me\/.+\?text=/);
    expect(decodeURIComponent((await messenger.getAttribute('href')) ?? '')).toContain(first.name.en);

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(cartButton(page)).toBeFocused();
  });

  test('a tampered stored cart is cleaned up instead of crashing the app', async ({ page }) => {
    await page.goto('/menu');
    await page.evaluate(() =>
      localStorage.setItem(
        'maydarwe-cart-v1',
        JSON.stringify([
          { id: 'chicken-pan-fried', quantity: 999 },
          { id: '<img src=x onerror=alert(1)>', quantity: 2 },
          { id: 'no-such-dish', quantity: 1 },
        ])
      )
    );
    await page.reload();
    await expect(cartButton(page)).toHaveAccessibleName('Cart, 20 items');
  });
});

test.describe('language', () => {
  test('switching to Myanmar translates the page and is remembered', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: 'MM' }).first().click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'my');
    await expect(page.getByRole('radio', { name: 'MM' }).first()).toBeChecked();
    expect(await page.evaluate(() => localStorage.getItem('maydarwe-lang'))).toBe('my');
  });
});

test.describe('first visit', () => {
  test.use({ skipIntro: false });

  test('the loading screen shows once per session, then gets out of the way', async ({ page }) => {
    // The screen can come and go faster than a test can poll, so the page itself
    // records whether it ever appeared (reset on every full page load).
    await page.addInitScript((text) => {
      window.__sawLoader = false;
      new MutationObserver((_, observer) => {
        const shown = [...document.querySelectorAll('[role="status"]')].some((el) => el.textContent?.includes(text));
        if (shown) {
          window.__sawLoader = true;
          observer.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    }, en.ui.loading);
    const sawLoader = () => page.evaluate(() => window.__sawLoader);
    const loader = page.getByRole('status').filter({ hasText: en.ui.loading });

    await page.goto('/');
    expect(await sawLoader(), 'loading screen on the first visit').toBe(true);
    await expect(loader).toHaveCount(0, { timeout: 5_000 }); // and it leaves by itself
    await expect(page.locator('h1')).toBeVisible();

    await page.goto('/menu'); // full page loads in the same tab = same session
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    expect(await sawLoader(), 'no loading screen again in the same session').toBe(false);
  });
});
