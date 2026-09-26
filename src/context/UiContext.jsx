import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/** @import { ToastPayload } from '../types' */

/** @typedef {null | 'cart' | 'order'} Panel Which overlay is open, if any. */

/** @typedef {ToastPayload & { at: number }} Toast The toast on screen; `at` makes each one unique. */

/**
 * @typedef {object} UiState
 * @property {boolean} isCartOpen
 * @property {boolean} isOrderOpen
 * @property {Toast | null} toast
 */

/**
 * @typedef {object} UiActions
 * @property {() => void} openCart
 * @property {() => void} openOrder Also hides any toast.
 * @property {() => void} closePanel
 * @property {(payload: ToastPayload) => void} showToast
 * @property {() => void} dismissToast
 */

/**
 * Overlay + toast state (cart drawer, order sheet, "Added to cart" toast).
 *
 * Split in two contexts so components that only OPEN things (navbar
 * buttons, menu cards) subscribe to the stable actions and never
 * re-render when a toast appears or a panel opens.
 */
const UiStateContext = createContext(/** @type {UiState | null} */ (null));
const UiActionsContext = createContext(/** @type {UiActions | null} */ (null));

const TOAST_MS = 2800;

/** @param {{ children: import('react').ReactNode }} props */
export function UiProvider({ children }) {
  const [panel, setPanel] = useState(/** @type {Panel} */ (null)); // null | 'cart' | 'order'
  const [toast, setToast] = useState(/** @type {Toast | null} */ (null));
  /** @type {import('react').RefObject<number | undefined>} */
  const toastTimer = useRef(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const showToast = useCallback(
    /** @type {UiActions['showToast']} */ (payload) => {
      window.clearTimeout(toastTimer.current);
      setToast({ ...payload, at: Date.now() });
      toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
    },
    []
  );

  /** @type {UiActions} */
  const actions = useMemo(
    () => ({
      openCart: () => setPanel('cart'),
      openOrder: () => {
        window.clearTimeout(toastTimer.current);
        setToast(null);
        setPanel('order');
      },
      closePanel: () => setPanel(null),
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast]
  );

  /** @type {UiState} */
  const state = useMemo(
    () => ({ isCartOpen: panel === 'cart', isOrderOpen: panel === 'order', toast }),
    [panel, toast]
  );

  return (
    <UiActionsContext.Provider value={actions}>
      <UiStateContext.Provider value={state}>{children}</UiStateContext.Provider>
    </UiActionsContext.Provider>
  );
}

/**
 * { isCartOpen, isOrderOpen, toast }: re-renders when a panel or toast changes.
 * @returns {UiState}
 */
export function useUiState() {
  const context = useContext(UiStateContext);
  if (!context) throw new Error('useUiState must be used within UiProvider');
  return context;
}

/**
 * { openCart, openOrder, closePanel, showToast, dismissToast }: stable, never re-renders.
 * @returns {UiActions}
 */
export function useUiActions() {
  const context = useContext(UiActionsContext);
  if (!context) throw new Error('useUiActions must be used within UiProvider');
  return context;
}
