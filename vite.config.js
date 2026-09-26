import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { DEV_SECURITY_HEADERS, SECURITY_HEADERS } from './src/lib/securityHeaders.js';
import { defaultDescription } from './src/constants/site.js';

/** Escape a value for use inside an HTML attribute. */
const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fills {{TOKENS}} in index.html from src/constants/site.js so the static
 * meta tags (what Google, Facebook and Messenger read without running JS)
 * always match what the site itself says.
 */
function businessMetaPlugin() {
  const tokens = {
    SITE_DESCRIPTION: defaultDescription(),
  };
  return {
    name: 'maydarwe-business-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) =>
          key in tokens ? escapeAttr(tokens[key]) : match
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), businessMetaPlugin()],
  assetsInclude: ['**/*.glb'],
  envPrefix: 'MAYDARWE_PUBLIC_',
  server: {
    headers: DEV_SECURITY_HEADERS,
  },
  preview: {
    headers: SECURITY_HEADERS,
  },
});
