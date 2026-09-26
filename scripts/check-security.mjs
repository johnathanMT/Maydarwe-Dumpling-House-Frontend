/**
 * Security tripwires. Runs before every build and in CI (npm run check).
 * Fails loudly when a change would quietly weaken the site's defences:
 *
 *   1. The Content-Security-Policy loses a protection or gains a new origin.
 *   2. A business link in src/constants/site.js is not https or points to a
 *      host outside the approved list (a typo or bad edit could otherwise ship
 *      a phishing or javascript: link on every Order button).
 *   3. robots.txt stops blocking AI training crawlers or loses the bot trap.
 *
 * To add a new third-party origin on purpose: add it in securityHeaders.js
 * AND in ALLOWED_ORIGINS below, so the change is always a conscious one.
 */
import { readFileSync } from 'node:fs';
import { CONTENT_SECURITY_POLICY, PRODUCTION_HEADERS } from '../src/lib/securityHeaders.js';
import { BUSINESS, MAPS_URL, SITE_URL } from '../src/constants/site.js';

/** @type {string[]} */
const errors = [];
/** @type {(message: string) => void} */
const fail = (message) => errors.push(message);

// ---------------------------------------------------------------- 1. CSP
/** @type {Map<string, string[]>} */
const directives = new Map(
  CONTENT_SECURITY_POLICY.split(';')
    .map((part) => part.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...values]) => [name, values])
);
/** @param {string} name */
const csp = (name) => directives.get(name) ?? null;

const REQUIRED = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  'script-src-attr': ["'none'"],
  'style-src': ["'self'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'none'"],
  'frame-ancestors': ["'none'"],
  'require-trusted-types-for': ["'script'"],
  'trusted-types': ['default'],
};
for (const [name, expected] of Object.entries(REQUIRED)) {
  const actual = csp(name);
  if (!actual) fail(`CSP is missing "${name}".`);
  else if (actual.join(' ') !== expected.join(' ')) {
    fail(`CSP "${name}" must be exactly "${expected.join(' ')}" (found "${actual.join(' ')}").`);
  }
}
if (!directives.has('upgrade-insecure-requests')) fail('CSP is missing "upgrade-insecure-requests".');

const FORBIDDEN_TOKENS = [
  "'unsafe-eval'",
  "'unsafe-hashes'",
  "'wasm-unsafe-eval'",
  '*',
  'http:',
  'https:',
  'data:',
  'blob:',
];
for (const name of ['script-src', 'script-src-attr', 'default-src', 'object-src', 'base-uri']) {
  for (const token of csp(name) ?? []) {
    if (FORBIDDEN_TOKENS.includes(token) || token === "'unsafe-inline'")
      fail(`CSP "${name}" must not contain ${token}.`);
  }
}
for (const [name, values] of directives) {
  if (values.includes('*')) fail(`CSP "${name}" must not use the * wildcard.`);
  if (values.includes("'unsafe-eval'")) fail(`CSP "${name}" must not allow 'unsafe-eval'.`);
  if (values.some((v) => v.startsWith('http://'))) fail(`CSP "${name}" must not allow plain http:// origins.`);
}

// Every external origin anywhere in the policy must be on this list.
const ALLOWED_ORIGINS = new Set([
  'https://res.cloudinary.com', // hero photo, reel video, 3D model
  'https://www.google.com', // Google Maps embed (frame-src)
]);
for (const [name, values] of directives) {
  for (const value of values) {
    if (/^https:\/\//.test(value) && !ALLOWED_ORIGINS.has(value)) {
      fail(`CSP "${name}" allows ${value}, which is not in ALLOWED_ORIGINS (scripts/check-security.mjs).`);
    }
  }
}

const hsts = PRODUCTION_HEADERS['Strict-Transport-Security'] ?? '';
const maxAge = Number(/max-age=(\d+)/.exec(hsts)?.[1] ?? 0);
if (maxAge < 31536000 || !hsts.includes('includeSubDomains'))
  fail('HSTS must be at least one year with includeSubDomains.');
for (const header of [
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
]) {
  if (!PRODUCTION_HEADERS[header]) fail(`Missing response header: ${header}.`);
}

// ------------------------------------------------------ 2. Business links
/** @typedef {'grab' | 'foodpanda' | 'facebook'} LinkKey */

/** @type {Record<LinkKey, string[]>} */
const LINK_HOSTS = {
  grab: ['app.grab.com', 'grab.onelink.me', 'r.grab.com'],
  foodpanda: ['foodpanda.go.link', 'www.foodpanda.com.mm', 'foodpanda.com.mm'],
  facebook: ['www.facebook.com', 'facebook.com', 'm.facebook.com', 'fb.me'],
};

/**
 * Fails unless `value` is an https URL on one of `hosts`, with no credentials.
 * @param {string} label
 * @param {string} value
 * @param {string[]} hosts
 * @returns {void}
 */
function checkUrl(label, value, hosts) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return fail(`${label} is not a valid URL: ${value}`);
  }
  if (url.protocol !== 'https:') fail(`${label} must use https: (found ${url.protocol}).`);
  if (url.username || url.password) fail(`${label} must not contain a username or password.`);
  if (!hosts.includes(url.hostname))
    fail(`${label} points to ${url.hostname}, which is not an approved host (${hosts.join(', ')}).`);
}

for (const [key, hosts] of Object.entries(LINK_HOSTS)) {
  checkUrl(`BUSINESS.links.${key}`, BUSINESS.links[/** @type {LinkKey} */ (key)], hosts);
}
checkUrl('MAPS_URL', MAPS_URL, ['maps.app.goo.gl', 'goo.gl', 'www.google.com', 'maps.google.com']);
checkUrl('SITE_URL', SITE_URL, [new URL(SITE_URL).hostname]);

const pageId = BUSINESS.links.messengerPageId.trim();
if (pageId && !/^[A-Za-z0-9.]{1,64}$/.test(pageId))
  fail(`BUSINESS.links.messengerPageId has unexpected characters: "${pageId}".`);

for (const phone of BUSINESS.phones) {
  if (!/^\+959\d{7,9}$/.test(phone.e164)) fail(`Phone ${phone.display} has an invalid E.164 number: ${phone.e164}.`);
}

// ------------------------------------------------------------ 3. robots.txt
const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
const groups = robots
  .split(/\n\s*\n/)
  .map((block) =>
    block
      .split('\n')
      .map((line) => line.replace(/#.*/, '').trim())
      .filter(Boolean)
  )
  .filter((lines) => lines.length);
/**
 * The robots.txt group (its lines) that names this user agent.
 * @param {string} agent
 */
const groupFor = (agent) =>
  groups.find((lines) => lines.some((line) => line.toLowerCase() === `user-agent: ${agent.toLowerCase()}`));

for (const bot of [
  'GPTBot',
  'ClaudeBot',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Bytespider',
]) {
  if (!groupFor(bot)?.includes('Disallow: /')) fail(`robots.txt must disallow the AI training crawler ${bot}.`);
}
for (const bot of ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot']) {
  const group = groupFor(bot);
  if (!group || group.includes('Disallow: /')) fail(`robots.txt must allow the AI search/assistant fetcher ${bot}.`);
}
if (!groupFor('*')?.includes('Disallow: /api/internal/'))
  fail('robots.txt lost the bot trap (Disallow: /api/internal/).');

// ----------------------------------------------------------------- report
if (errors.length) {
  console.error(`✗ Security checks failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('✓ Security checks passed: CSP, headers, business links and robots.txt.');
