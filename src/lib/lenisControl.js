/**
 * Shared handle for the root Lenis instance.
 * Overlays (the loader, cart, order sheet) pause it through the scroll lock
 * in Sheet.jsx, which can run before Lenis has finished mounting.
 */
let lenis = null;
let pauses = 0;

export function bindLenis(instance) {
  lenis = instance ?? null;
  if (!lenis) return;
  if (pauses > 0) lenis.stop();
  else lenis.start();
}

export function pauseLenis() {
  pauses += 1;
  lenis?.stop();
}

export function resumeLenis() {
  pauses = Math.max(0, pauses - 1);
  if (pauses === 0) lenis?.start();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
