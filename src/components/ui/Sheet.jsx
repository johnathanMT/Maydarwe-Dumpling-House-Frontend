import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

/* ---------- scroll lock (shared, counted, so overlays never fight) ---------- */

let lockCount = 0;
let savedOverflow = '';

function lockScroll() {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) document.body.style.overflow = savedOverflow;
}

export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lockScroll();
    return unlockScroll;
  }, [active]);
}

/* ---------- focus management ---------- */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function focusables(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.getClientRects().length > 0
  );
}

/**
 * Accessible modal panel: slides in from the right ("drawer") or up from
 * the bottom ("sheet", centred card on larger screens).
 *
 * - `inert` while closed: nothing inside can be tabbed to or read out.
 * - On open: focus moves into the panel and is trapped there.
 * - Escape, the backdrop and the close button all call `onClose`.
 * - On close: focus returns to whatever opened it.
 * - Scroll lock is shared with every other Sheet.
 */
export default function Sheet({
  open,
  onClose,
  labelledBy,
  describedBy,
  variant = 'drawer',
  initialFocusRef,
  className = '',
  children,
}) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    returnFocusRef.current = document.activeElement;

    const target = initialFocusRef?.current ?? focusables(panel)[0] ?? panel;
    // Wait one frame so the panel is visible (not `inert`) before focusing.
    const frame = window.requestAnimationFrame(() => target.focus({ preventScroll: true }));

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
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
      if (back && typeof back.focus === 'function' && document.contains(back)) {
        back.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, initialFocusRef]);

  const isDrawer = variant === 'drawer';

  const panelPosition = isDrawer
    ? 'inset-y-0 right-0 h-full w-full max-w-md'
    : 'inset-x-0 bottom-0 mx-auto max-h-[92dvh] w-full max-w-lg rounded-t-[1.75rem] sm:bottom-6 sm:rounded-[1.75rem]';

  const panelMotion = isDrawer
    ? open
      ? 'translate-x-0'
      : 'translate-x-full'
    : open
      ? 'translate-y-0 opacity-100'
      : 'translate-y-full opacity-0 sm:translate-y-8';

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`}
      inert={!open}
      aria-hidden={!open}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-ink-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={`absolute flex flex-col overflow-hidden bg-white shadow-2xl outline-none transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${panelPosition} ${panelMotion} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/** Round close button used in every Sheet header. */
export function SheetCloseButton({ onClick, label }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? t('order.close')}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-50"
    >
      <X className="h-5 w-5" />
    </button>
  );
}
