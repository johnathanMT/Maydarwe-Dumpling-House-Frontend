import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';

/**
 * Accessible modal panel: slides in from the right ("drawer") or up from
 * the bottom ("sheet", centred card on larger screens).
 *
 * - `inert` while closed: nothing inside can be tabbed to or read out.
 * - On open: focus moves into the panel and is trapped there.
 * - Escape, the backdrop and the close button all call `onClose`.
 * - On close: focus returns to whatever opened it.
 * - Scroll lock is shared with every other Sheet (hooks/useScrollLock).
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} [props.labelledBy] id of the panel's heading.
 * @param {string} [props.describedBy] id of the panel's description.
 * @param {'drawer' | 'sheet'} [props.variant]
 * @param {import('react').RefObject<HTMLElement | null>} [props.initialFocusRef]
 * @param {string} [props.className]
 * @param {import('react').ReactNode} props.children
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
  /** @type {import('react').RefObject<HTMLDivElement | null>} */
  const panelRef = useRef(null);

  useScrollLock(open);
  useFocusTrap(panelRef, { active: open, onEscape: onClose, initialFocusRef });

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

/**
 * Round close button used in every Sheet header.
 * @param {{ onClick: () => void, label?: string }} props
 */
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
