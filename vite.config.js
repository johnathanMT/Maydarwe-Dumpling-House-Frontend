import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { DEV_SECURITY_HEADERS, SECURITY_HEADERS } from './src/lib/securityHeaders.js';
import { defaultDescription } from './src/constants/site.js';
import { jsonLdScriptContent, restaurantJsonLd } from './src/lib/structuredData.js';

/** Escape a value for use inside an HTML attribute. */
const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fills {{TOKENS}} in index.html from src/constants/site.js and src/data/menu.js,
 * so the static tags crawlers read without running JS (description, Restaurant
 * JSON-LD) always match what the site itself says.
 */
function businessMetaPlugin(env) {
  const verification = env.MAYDARWE_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
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
        return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => (key in tokens ? tokens[key] : match));
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'MAYDARWE_PUBLIC_');
  return {
    // imagetools: `import photo from './x.jpg?w=…&format=…&as=picture'` → responsive, hashed images.
    plugins: [react(), imagetools(), businessMetaPlugin(env)],
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
