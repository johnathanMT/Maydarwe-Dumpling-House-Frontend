import { useEffect } from 'react';
import { pauseLenis, resumeLenis } from '../lib/lenisControl';

/*
 * Page scroll lock shared by every overlay (drawers, sheets, the loading
 * curtain). It is counted, so two overlays open at once never fight: the page
 * only unlocks when the last one closes. Lenis is paused while locked.
 */
let lockCount = 0;
let savedOverflow = '';

function lockScroll() {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseLenis();
  }
  lockCount += 1;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    resumeLenis();
  }
}

/**
 * Locks page scrolling while `active` is true; always releases on unmount.
 * @param {boolean} active
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
