/**
 * Single source of truth for HTTP response headers (Node-only: used by
 * vite.config.js and scripts/sync-vercel-headers.mjs, never shipped to browsers).
 *
 * vercel.json's "headers" are GENERATED from this file:
 *   npm run headers        → rewrite vercel.json
 *   npm run headers:check  → fail (CI) if vercel.json has drifted
 *
 * Every origin below is here for a reason; remove it when the reason goes.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * True when src/assets/partners/<name>.svg exists.
 * @param {string} name
 * @returns {boolean}
 */
const partnerLogo = (name) => existsSync(fileURLToPath(new URL(`../assets/partners/${name}.svg`, import.meta.url)));

/** True once grab.svg and foodpanda.svg are self-hosted (src/assets/partners). */
const PARTNER_LOGOS_SELF_HOSTED = partnerLogo('grab') && partnerLogo('foodpanda');

const IMG_ORIGINS = [
  "'self'",
  'data:',
  'blob:',
  // Home hero photo, resized and converted on the fly by Cloudinary (src/assets/photos/remote.js).
  'https://res.cloudinary.com',
  // Grab / foodpanda logos, only until they are self-hosted (see src/constants/partnerLogos.js).
  ...(PARTNER_LOGOS_SELF_HOSTED ? [] : ['https://upload.wikimedia.org']),
];

/** @type {Record<string, string[]>} */
const PRODUCTION_DIRECTIVES = {
  'default-src': ["'self'"],
  'base-uri': ["'self'"],
  // The site has no forms: nothing may be submitted anywhere.
  'form-action': ["'none'"],
  'frame-ancestors': ["'none'"],
  'object-src': ["'none'"],
  'manifest-src': ["'self'"],
  // Google Maps embed on the contact page.
  'frame-src': ['https://www.google.com'],
  'script-src': ["'self'"],
  // No inline event-handler attributes anywhere (React never needs them).
  'script-src-attr': ["'none'"],
  // Stylesheets only from our own files. React `style={}` props and framer-motion
  // set styles through the CSSOM (element.style), which CSP does not restrict,
  // so no 'unsafe-inline' is needed.
  'style-src': ["'self'"],
  'font-src': ["'self'", 'data:'],
  'img-src': IMG_ORIGINS,
  // Home cinematic reel (src/components/hero/HomeReel.jsx).
  'media-src': ["'self'", 'https://res.cloudinary.com'],
  // three.js loads textures and the Draco decoder in workers created from blob: URLs.
  'worker-src': ["'self'", 'blob:'],
  'child-src': ["'self'", 'blob:'],
  // The 3D dumpling model (.glb) is hosted on Cloudinary. Its embedded textures
  // are unpacked into blob: URLs that three.js then fetch()es.
  'connect-src': ["'self'", 'blob:', 'https://res.cloudinary.com'],
  // Trusted Types: the browser refuses to turn strings into HTML or script
  // (innerHTML, eval-like sinks, worker URLs) unless they pass the one "default"
  // policy in src/lib/trustedTypes.js. This closes DOM-based XSS even if a
  // future change or dependency tries to inject markup.
  'require-trusted-types-for': ["'script'"],
  'trusted-types': ['default'],
  'upgrade-insecure-requests': [],
};

/**
 * `{ 'img-src': ["'self'"] }` → "img-src 'self'".
 * @param {Record<string, string[]>} directives
 * @returns {string}
 */
const serialize = (directives) =>
  Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(' '))
    .join('; ');

export const CONTENT_SECURITY_POLICY = serialize(PRODUCTION_DIRECTIVES);

/** @type {Record<string, string>} */
const COMMON_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Turn off every powerful browser feature the site never uses.
  'Permissions-Policy': [
    'accelerometer=()',
    'browsing-topics=()',
    'camera=()',
    'display-capture=()',
    'geolocation=()',
    'gyroscope=()',
    'hid=()',
    'idle-detection=()',
    'magnetometer=()',
    'microphone=()',
    'payment=()',
    'serial=()',
    'usb=()',
  ].join(', '),
  'X-DNS-Prefetch-Control': 'off',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

/**
 * Headers for `vite preview` (production build served locally).
 * @type {Record<string, string>}
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  ...COMMON_HEADERS,
};

/**
 * Production (Vercel) adds HSTS. Submit to the preload list only once every subdomain is HTTPS for good.
 * @type {Record<string, string>}
 */
export const PRODUCTION_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  ...COMMON_HEADERS,
};

/** Vite dev server: HMR needs inline/eval scripts, <style> tags and a websocket. Never used in production. */
const DEV_ONLY_OMIT = new Set([
  'upgrade-insecure-requests',
  // Vite's error overlay and HMR write markup with innerHTML.
  'require-trusted-types-for',
  'trusted-types',
]);

/** @type {Record<string, string>} */
export const DEV_SECURITY_HEADERS = {
  ...COMMON_HEADERS,
  'Content-Security-Policy': serialize({
    ...Object.fromEntries(Object.entries(PRODUCTION_DIRECTIVES).filter(([name]) => !DEV_ONLY_OMIT.has(name))),
    // Vite injects its CSS as <style> tags in development.
    'style-src': ["'self'", "'unsafe-inline'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'connect-src': ["'self'", 'ws:', 'wss:', 'http:', 'https:'],
  }),
};

const YEAR = 'public, max-age=31536000, immutable';
const WEEK = 'public, max-age=604800, stale-while-revalidate=86400';

/**
 * Browser caching. Vite's output in /assets is content-hashed (a changed file
 * gets a new name), so it can be cached for a year. Files in /public keep
 * their names, so they get a week.
 * @type {{ source: string, value: string }[]}
 */
export const CACHE_RULES = [
  { source: '/assets/(.*)', value: YEAR },
  { source: '/draco/(.*)', value: WEEK },
  { source: '/(og-image\\.jpg|favicon-32\\.png|icon-192\\.png|apple-touch-icon\\.png)', value: WEEK },
];
