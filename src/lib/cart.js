/**
 * Cart rules, free of React so they can be read (and tested) on their own.
 *
 * The cart stores only { id, quantity }. Names, prices and photos are looked
 * up from MENU_ITEMS every time, so a saved cart can never show a stale or
 * tampered price, and a dish that goes out of stock drops out on the next load.
 */
import { MENU_ITEMS } from '../data/menu.js';
import { sanitizeId, sanitizeInteger } from './sanitize.js';

/** @import { CartEntry, CartLine, CartState, MenuItem } from '../types' */

export const CART_STORAGE_KEY = 'maydarwe-cart-v1';
export const MAX_QUANTITY = 20;
/** At most this many rows are read back from storage (guards against a huge tampered value). */
const MAX_ENTRIES = 50;

/** @type {Map<string, MenuItem>} */
const CATALOG = new Map(MENU_ITEMS.map((item) => [item.id, /** @type {MenuItem} */ (item)]));

/**
 * The in-stock menu item with this id, or undefined.
 * @param {unknown} id
 */
export function findOrderable(id) {
  const item = CATALOG.get(sanitizeId(id));
  return item?.inStock ? item : undefined;
}

/**
 * Accept only known, in-stock dishes with a sane quantity; merge duplicates.
 * @param {unknown} raw Anything (usually parsed JSON from storage).
 * @returns {CartEntry[]}
 */
export function normalizeEntries(raw) {
  if (!Array.isArray(raw)) return [];
  /** @type {Map<string, number>} */
  const merged = new Map();
  for (const entry of raw.slice(0, MAX_ENTRIES)) {
    const item = findOrderable(entry?.id);
    if (!item) continue;
    const quantity = sanitizeInteger(entry?.quantity, { min: 0, max: MAX_QUANTITY });
    if (quantity < 1) continue;
    merged.set(item.id, Math.min(MAX_QUANTITY, (merged.get(item.id) ?? 0) + quantity));
  }
  return Array.from(merged, ([id, quantity]) => ({ id, quantity }));
}

/** @returns {CartEntry[]} */
export function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? normalizeEntries(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/** @param {CartEntry[]} entries */
export function writeStoredCart(entries) {
  try {
    if (entries.length === 0) window.localStorage.removeItem(CART_STORAGE_KEY);
    else window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full or blocked (private mode): the cart still works for this visit.
  }
}

/**
 * One more of `id` (capped at MAX_QUANTITY).
 * @param {CartEntry[]} entries
 * @param {string} id Must already be validated with findOrderable().
 * @returns {CartEntry[]}
 */
export function addOne(entries, id) {
  const existing = entries.find((entry) => entry.id === id);
  if (!existing) return [...entries, { id, quantity: 1 }];
  return entries.map((entry) =>
    entry.id === id ? { ...entry, quantity: Math.min(MAX_QUANTITY, entry.quantity + 1) } : entry
  );
}

/**
 * Set a quantity; 0 (or anything invalid) removes the row.
 * @param {CartEntry[]} entries
 * @param {unknown} id
 * @param {unknown} quantity
 * @returns {CartEntry[]}
 */
export function setQuantity(entries, id, quantity) {
  const safeId = sanitizeId(id);
  const next = sanitizeInteger(quantity, { min: 0, max: MAX_QUANTITY });
  return next < 1
    ? entries.filter((entry) => entry.id !== safeId)
    : entries.map((entry) => (entry.id === safeId ? { ...entry, quantity: next } : entry));
}

/**
 * @param {CartEntry[]} entries
 * @param {unknown} id
 * @returns {CartEntry[]}
 */
export function removeEntry(entries, id) {
  const safeId = sanitizeId(id);
  return entries.filter((entry) => entry.id !== safeId);
}

/**
 * Rows ready to render, plus totals.
 * @param {CartEntry[]} entries
 * @returns {CartState}
 */
export function toCartState(entries) {
  /** @type {CartLine[]} */
  const lines = [];
  for (const { id, quantity } of entries) {
    const item = CATALOG.get(id);
    if (item) lines.push({ id, quantity, name: item.name, price: item.price, photo: item.photo });
  }
  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
  };
}
