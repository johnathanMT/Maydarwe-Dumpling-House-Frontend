// Security first: the Trusted Types policy must exist before any other code runs.
import './lib/trustedTypes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './styles/fonts';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App';
import { reloadOnce } from './lib/chunkReload';

// Vite fires this when a lazy route's chunk fails to load (usually a stale tab after a deploy).
window.addEventListener('vite:preloadError', (event) => {
  if (reloadOnce()) event.preventDefault();
});

const root = document.getElementById('root');
if (!root) throw new Error('index.html is missing <div id="root">');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
