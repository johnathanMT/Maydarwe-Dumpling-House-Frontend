/**
 * Grab and foodpanda logos.
 *
 * Put the official SVGs in src/assets/partners/ as `grab.svg` and
 * `foodpanda.svg` and they are used (bundled, hashed, cached) automatically.
 * Until then the site falls back to the Wikimedia copies, and the build keeps
 * upload.wikimedia.org in the CSP (see scripts/sync-vercel-headers.mjs).
 */
// `?url` + `import: 'default'` makes each value the file's public URL (a string).
const local = /** @type {Record<string, string>} */ (
  import.meta.glob('../assets/partners/*.svg', { eager: true, query: '?url', import: 'default' })
);

/**
 * URL of the self-hosted logo if present, otherwise `fallback`.
 * @param {string} name File name without `.svg`.
 * @param {string} fallback
 * @returns {string}
 */
const pick = (name, fallback) => local[`../assets/partners/${name}.svg`] ?? fallback;

export const GRAB_LOGO_SRC = pick('grab', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Grab_Logo.svg');
export const FOODPANDA_LOGO_SRC = pick(
  'foodpanda',
  'https://upload.wikimedia.org/wikipedia/commons/7/74/Foodpanda_wordmark.svg'
);
