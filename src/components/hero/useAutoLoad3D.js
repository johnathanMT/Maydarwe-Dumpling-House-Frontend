import { useEffect } from 'react';

/**
 * Auto-load 3D only where it is cheap: a wide screen, no Save-Data,
 * no reduced motion, at least 4 CPU cores.
 * @param {boolean} reduceMotion
 */
function canAutoLoad3D(reduceMotion) {
  if (reduceMotion) return false;
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  const connection = /** @type {{ connection?: { saveData?: boolean } }} */ (navigator).connection;
  if (connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 4) < 4) return false;
  return true;
}

/**
 * Run `callback` when the browser is idle (or after 1.2 s where
 * requestIdleCallback is missing, e.g. Safari). Returns a cancel function.
 * @param {() => void} callback
 * @returns {() => void}
 */
function whenIdle(callback) {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  // The DOM types always declare requestIdleCallback, so TypeScript narrows `window` to `never` here.
  const id = /** @type {Window} */ (window).setTimeout(callback, 1200);
  return () => /** @type {Window} */ (window).clearTimeout(id);
}

/**
 * On capable desktops, start loading the 3D scene by itself once the hero is
 * a quarter visible and the browser is idle. The observer and any pending
 * idle callback are cleaned up on unmount or when `enabled` turns false.
 * @param {import('react').RefObject<HTMLElement | null>} ref The hero frame.
 * @param {{ enabled: boolean, reduceMotion: boolean, onLoad: () => void }} options
 */
export function useAutoLoad3D(ref, { enabled, reduceMotion, onLoad }) {
  useEffect(() => {
    if (!enabled || !canAutoLoad3D(reduceMotion)) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    /** @type {(() => void) | null} */
    let cancelIdle = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cancelIdle = whenIdle(onLoad);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelIdle?.();
    };
  }, [ref, enabled, reduceMotion, onLoad]);
}
