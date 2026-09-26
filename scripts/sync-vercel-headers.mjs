/**
 * Writes the "headers" section of vercel.json from src/lib/securityHeaders.js,
 * so there is exactly one place to edit the CSP and caching rules.
 *
 *   node scripts/sync-vercel-headers.mjs          # update vercel.json
 *   node scripts/sync-vercel-headers.mjs --check  # exit 1 if it is out of date (CI)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { CACHE_RULES, PRODUCTION_HEADERS } from '../src/lib/securityHeaders.js';

const file = new URL('../vercel.json', import.meta.url);
const current = readFileSync(file, 'utf8');
/** @type {Record<string, unknown>} */
const config = JSON.parse(current);

config.headers = [
  {
    source: '/(.*)',
    headers: Object.entries(PRODUCTION_HEADERS).map(([key, value]) => ({ key, value })),
  },
  ...CACHE_RULES.map(({ source, value }) => ({
    source,
    headers: [{ key: 'Cache-Control', value }],
  })),
];

const next = `${JSON.stringify(config, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (next !== current) {
    console.error('vercel.json headers are out of date. Run: npm run headers');
    process.exit(1);
  }
  console.log('vercel.json headers are in sync.');
} else if (next !== current) {
  writeFileSync(file, next);
  console.log('vercel.json headers updated.');
} else {
  console.log('vercel.json headers already up to date.');
}
