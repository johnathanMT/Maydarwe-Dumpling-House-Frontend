/**
 * Zero-trust check on the files that actually get deployed (dist/).
 * Runs automatically after `npm run build` (the "postbuild" script) and in CI.
 *
 * Everything in dist/ is public: anyone can download it. So this fails the
 * build if dist/ contains:
 *   - anything that looks like a secret (API keys, tokens, private keys),
 *   - source maps (they would publish the original source code),
 *   - an inline <script> in index.html other than the JSON-LD data block
 *     (it would be blocked by the CSP anyway, but it means something is wrong),
 *   - an unfilled {{TOKEN}} placeholder.
 * It also confirms /.well-known/security.txt was generated.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

/** @type {[label: string, pattern: RegExp][]} */
const SECRET_PATTERNS = [
  ['Private key', /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/],
  ['AWS access key', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b/],
  ['Stripe secret key', /\b(?:sk|rk)_live_[0-9A-Za-z]{20,}\b/],
  ['Slack token', /\bxox[abposr]-[0-9A-Za-z-]{10,}\b/],
  ['OpenAI / Anthropic key', /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}\b/],
  ['Vercel token', /\bvercel_[A-Za-z0-9]{24,}\b/i],
  ['JSON Web Token', /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/],
  ['Database URL with password', /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s:@/]+:[^\s@/]+@/],
  [
    'Server env var name',
    /\b(?:DATABASE_URL|SECRET_KEY|PRIVATE_KEY|API_SECRET|CLIENT_SECRET|SUPABASE_SERVICE_ROLE_KEY)\b/,
  ],
];

const TEXT_EXTENSIONS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.txt',
  '.xml',
  '.svg',
  '.webmanifest',
  '.map',
]);

/**
 * Every file path under `dir`, recursively.
 * @param {string} dir
 * @returns {Generator<string>}
 */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** @type {string[]} */
const errors = [];
let scanned = 0;

for (const file of walk(DIST)) {
  const rel = relative(DIST, file);
  if (rel.endsWith('.map')) {
    errors.push(`${rel}: source map in the deploy output (it would publish the original source).`);
    continue;
  }
  if (!TEXT_EXTENSIONS.has(extname(file))) continue;
  scanned += 1;
  const text = readFileSync(file, 'utf8');
  for (const [label, pattern] of SECRET_PATTERNS) {
    const match = pattern.exec(text);
    if (match) errors.push(`${rel}: looks like a ${label} ("${match[0].slice(0, 12)}…").`);
  }
}

const html = readFileSync(join(DIST, 'index.html'), 'utf8');
for (const [, attrs] of html.matchAll(/<script\b([^>]*)>/g)) {
  const external = /\bsrc=/.test(attrs);
  const dataBlock = /type="application\/ld\+json"/.test(attrs);
  if (!external && !dataBlock)
    errors.push(`index.html: inline <script${attrs}> found (the CSP forbids inline scripts).`);
}
const placeholder = /\{\{[A-Z_]+\}\}/.exec(html.replace(/<!--[\s\S]*?-->/g, ''));
if (placeholder) errors.push(`index.html: unfilled placeholder ${placeholder[0]}.`);

try {
  const txt = readFileSync(join(DIST, '.well-known', 'security.txt'), 'utf8');
  if (!/^Contact: /m.test(txt) || !/^Expires: /m.test(txt)) errors.push('security.txt is missing Contact or Expires.');
} catch {
  errors.push('dist/.well-known/security.txt was not generated.');
}

if (errors.length) {
  console.error(`✗ Deploy output scan failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Deploy output clean: ${scanned} files scanned, no secrets, no source maps, no inline scripts.`);
