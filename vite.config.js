import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { DEV_SECURITY_HEADERS, SECURITY_HEADERS } from './src/lib/securityHeaders.js';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  envPrefix: 'MAYDARWE_PUBLIC_',
  server: {
    headers: DEV_SECURITY_HEADERS,
  },
  preview: {
    headers: SECURITY_HEADERS,
  },
});
