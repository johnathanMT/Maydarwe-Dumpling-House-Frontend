import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UiActionsContext, UiStateContext } from './useUi';

/** @import { Toast, UiActions, UiState } from './useUi' */

/** @typedef {null | 'cart' | 'order'} Panel Which overlay is open, if any. */

const TOAST_MS = 2800;

/**
 * Provides overlay + toast state (see ./useUi.js for the hooks that read it).
 * @param {{ children: import('react').ReactNode }} props
 */
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
