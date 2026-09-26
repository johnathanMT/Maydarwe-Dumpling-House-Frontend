/**
 * Allow-list validators for the only untrusted input this site reads:
 * values from localStorage (language choice, saved cart).
 *
 * There is deliberately no HTML/SQL "sanitizer" here: the site renders no
 * HTML strings (React escapes all text) and talks to no database. If you
 * ever render HTML from a CMS or a form, use DOMPurify, never regexes.
 */

/** @import { Language } from '../types' */

const SAFE_ID = /^[a-z0-9-]{1,64}$/;
const SUPPORTED_LANGUAGES = new Set(['en', 'my']);

/**
 * A menu item id: lowercase letters, digits and hyphens only; anything else → ''.
 * @param {unknown} value
 * @returns {string}
 */
export function sanitizeId(value) {
  const id = String(value ?? '').trim().toLowerCase();
  return SAFE_ID.test(id) ? id : '';
}

/**
 * An integer clamped to [min, max]; anything non-numeric → min.
 * @param {unknown} value
 * @param {{ min?: number, max?: number }} [range]
 * @returns {number}
 */
export function sanitizeInteger(value, { min = 0, max = 20 } = {}) {
  const numeric = Number.parseInt(String(value), 10);
  if (!Number.isFinite(numeric)) return min;
  return Math.min(max, Math.max(min, numeric));
}

/**
 * 'en' or 'my'; anything else falls back to Burmese.
 * @param {unknown} value
 * @returns {Language}
 */
export function sanitizeLanguage(value) {
  const language = String(value ?? '').trim().toLowerCase();
  // The Set check above guarantees `language` is 'en' or 'my'.
  return SUPPORTED_LANGUAGES.has(language) ? /** @type {Language} */ (language) : 'my';
}
