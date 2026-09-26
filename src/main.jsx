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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
