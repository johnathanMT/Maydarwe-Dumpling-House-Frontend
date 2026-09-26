/**
 * Shared handle for the root Lenis instance.
 * Overlays (the loader, cart, order sheet) pause it through the scroll lock
 * in Sheet.jsx, which can run before Lenis has finished mounting.
 */
/** @import Lenis from 'lenis' */

/** @type {Lenis | null} */
let lenis = null;
let pauses = 0;

/**
 * Register (or, with null, forget) the root Lenis instance.
 * @param {Lenis | null | undefined} instance
 */
export function bindLenis(instance) {
  lenis = instance ?? null;
  if (!lenis) return;
  if (pauses > 0) lenis.stop();
  else lenis.start();
}

/** Stop smooth scrolling; counted, so every pause needs a resume. */
export function pauseLenis() {
  pauses += 1;
  lenis?.stop();
}

/** Undo one pauseLenis(); scrolling restarts after the last one. */
export function resumeLenis() {
  pauses = Math.max(0, pauses - 1);
  if (pauses === 0) lenis?.start();
}

/** Scroll to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
