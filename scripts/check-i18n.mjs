/**
 * Translation checks (run in CI and before builds):
 *  1. en and my have the same keys (plural forms aside: Burmese only needs *_other).
 *  2. Every key the code references exists.
 *  3. Keys nothing references are listed as warnings.
 *
 *   node scripts/check-i18n.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const load = (lang) => JSON.parse(readFileSync(join(root, `src/locales/${lang}/translation.json`), 'utf8'));

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`]
  );

const PLURAL = /_(zero|one|two|few|many|other)$/;
const base = (key) => key.replace(PLURAL, '');

const en = new Set(flatten(load('en')).map(base));
const my = new Set(flatten(load('my')).map(base));

let failed = false;
const report = (label, keys) => {
  if (keys.length === 0) return;
  failed = true;
  console.error(`✗ ${label}:\n  ${keys.join('\n  ')}`);
};

report('Keys missing in my/translation.json', [...en].filter((k) => !my.has(k)));
report('Keys missing in en/translation.json', [...my].filter((k) => !en.has(k)));

// Collect string literals in the code that look like translation keys.
const NAMESPACES = [...new Set([...en].map((k) => k.split('.')[0]))];
const KEY_LITERAL = new RegExp(`['"\`]((?:${NAMESPACES.join('|')})\\.[A-Za-z0-9_.]+)['"\`]`, 'g');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'locales' ? [] : walk(path);
    return /\.(jsx?|mjs)$/.test(name) ? [path] : [];
  });

const used = new Set();
for (const file of walk(join(root, 'src'))) {
  for (const [, key] of readFileSync(file, 'utf8').matchAll(KEY_LITERAL)) used.add(base(key));
}

report(
  'Keys used in code but missing from the translations',
  [...used].filter((k) => !en.has(k))
);

// meta.<page>.* keys are built dynamically in src/lib/seo.js.
const unused = [...en].filter((k) => !used.has(k) && !k.startsWith('meta.'));
if (unused.length) console.warn(`! Unused keys (safe to delete):\n  ${unused.join('\n  ')}`);

if (failed) process.exit(1);
console.log(`✓ Translations OK: ${en.size} keys in both languages, ${used.size} referenced.`);
