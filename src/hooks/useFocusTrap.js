import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Visible, focusable elements inside `root`, in tab order.
 * @param {HTMLElement} root
 * @returns {HTMLElement[]}
 */
function focusables(root) {
  return Array.from(root.querySelectorAll(/** @type {'a'} */ (FOCUSABLE))).filter(
    (el) => !el.hasAttribute('inert') && el.getClientRects().length > 0
  );
}

/**
 * @typedef {object} FocusTrapOptions
 * @property {boolean} active Trap focus while true.
 * @property {() => void} onEscape Called when Escape is pressed.
 * @property {import('react').RefObject<HTMLElement | null>} [initialFocusRef] Element to focus first.
 */

/**
 * Keyboard handling for a modal panel:
 * - on activate: focus moves into the panel (after one frame, once it is visible);
 * - Tab / Shift+Tab cycle inside it; Escape calls `onEscape`;
 * - on deactivate: focus returns to whatever was focused before.
 * The keydown listener and the pending animation frame are always cleaned up.
 * @param {import('react').RefObject<HTMLElement | null>} panelRef
 * @param {FocusTrapOptions} options
 */
export function useFocusTrap(panelRef, { active, onEscape, initialFocusRef }) {
  /** @type {import('react').RefObject<Element | null>} */
  const returnFocusRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!active || !panel) return undefined;
    returnFocusRef.current = document.activeElement;

    const target = initialFocusRef?.current ?? focusables(panel)[0] ?? panel;
    const frame = window.requestAnimationFrame(() => target.focus({ preventScroll: true }));

    /** @param {KeyboardEvent} event */
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables(panel);
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      const back = returnFocusRef.current;
      if (back instanceof HTMLElement && document.contains(back)) back.focus({ preventScroll: true });
    };
  }, [active, onEscape, initialFocusRef, panelRef]);
}
