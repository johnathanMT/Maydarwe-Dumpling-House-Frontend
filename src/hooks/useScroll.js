import { useSyncExternalStore } from 'react';

/*
 * One shared, passive window scroll listener for the whole app, throttled to
 * one update per animation frame. It is attached when the first component
 * subscribes and removed when the last one unmounts, so nothing leaks.
 * Components re-render only when *their* value changes (React compares the
 * snapshot), not on every scroll event.
 */

/** @type {Set<() => void>} */
const listeners = new Set();
let frame = 0;

function notify() {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    listeners.forEach((listener) => listener());
  });
}

/** @param {() => void} listener */
function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener('scroll', notify, { passive: true });
    window.addEventListener('resize', notify, { passive: true });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', notify);
      window.removeEventListener('resize', notify);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/**
 * True once the page is scrolled more than `threshold` px.
 * @param {number} threshold
 * @returns {boolean}
 */
export function useScrolledPast(threshold) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}

/**
 * How far down the page is scrolled, 0–1, in steps of 0.2% (finer changes
 * would not be visible and would only cause extra renders).
 * @returns {number}
 */
export function useScrollProgress() {
  return useSyncExternalStore(
    subscribe,
    () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      return max > 0 ? Math.round((doc.scrollTop / max) * 500) / 500 : 0;
    },
    () => 0
  );
}
