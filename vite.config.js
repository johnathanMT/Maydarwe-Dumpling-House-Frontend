import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { DEV_SECURITY_HEADERS, SECURITY_HEADERS } from './src/lib/securityHeaders.js';
import { BUSINESS, PRIMARY_PHONE, SITE_URL, defaultDescription } from './src/constants/site.js';
import { jsonLdScriptContent, restaurantJsonLd } from './src/lib/structuredData.js';

/**
 * Escape a value for use inside an HTML attribute.
 * @param {string} value
 * @returns {string}
 */
const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fills {{TOKENS}} in index.html from src/constants/site.js and src/data/menu.js,
 * so the static tags crawlers read without running JS (description, Restaurant
 * JSON-LD) always match what the site itself says.
 * @param {Record<string, string>} env Variables from loadEnv().
 * @returns {import('vite').Plugin}
 */
function businessMetaPlugin(env) {
  const verification = env.MAYDARWE_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  /** @type {Record<string, string>} */
  const tokens = {
    SITE_DESCRIPTION: escapeAttr(defaultDescription()),
    RESTAURANT_JSON_LD: jsonLdScriptContent(restaurantJsonLd()),
    // Only emitted when the env var is set (Vercel → Settings → Environment Variables).
    GOOGLE_SITE_VERIFICATION: verification
      ? `<meta name="google-site-verification" content="${escapeAttr(verification)}" />`
      : '',
  };
  return {
    name: 'maydarwe-business-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, /** @type {string} */ key) => (key in tokens ? tokens[key] : match));
      },
    },
  };
}

/**
 * Emits /.well-known/security.txt (RFC 9116): how to report a security problem.
 * Built from site.js on every deploy, so the contacts stay current and the
 * required Expires date is always about six months ahead.
 * @returns {import('vite').Plugin}
 */
function securityTxtPlugin() {
  const EXPIRES_IN_DAYS = 180;
  return {
    name: 'maydarwe-security-txt',
    apply: 'build',
    generateBundle() {
      const expires = new Date(Date.now() + EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);
      const pageId = BUSINESS.links.messengerPageId.trim();
      const lines = [
        `# Security contact for ${BUSINESS.name.en} (${SITE_URL}).`,
        '# Please report security problems privately. Do not test against real orders.',
        ...(pageId ? [`Contact: https://m.me/${encodeURIComponent(pageId)}`] : []),
        `Contact: tel:${PRIMARY_PHONE.e164}`,
        `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, 'Z')}`,
        'Preferred-Languages: en, my',
        `Canonical: ${SITE_URL}/.well-known/security.txt`,
        '',
      ];
      this.emitFile({ type: 'asset', fileName: '.well-known/security.txt', source: lines.join('\n') });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'MAYDARWE_PUBLIC_');
  return {
    // imagetools: `import photo from './x.jpg?w=…&format=…&as=picture'` → responsive, hashed images.
    plugins: [react(), imagetools(), businessMetaPlugin(env), securityTxtPlugin()],
    assetsInclude: ['**/*.glb'],
    envPrefix: 'MAYDARWE_PUBLIC_',
    server: {
      headers: DEV_SECURITY_HEADERS,
    },
    preview: {
      headers: SECURITY_HEADERS,
    },
    build: {
      // The lazy 3D chunk (three.js) is ~1 MB on purpose; it never loads on first paint.
      chunkSizeWarningLimit: 1100,
    },
  };
});
