import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Overlay + toast state (cart drawer, order sheet, "Added to cart" toast).
 *
 * Split in two contexts so components that only OPEN things (navbar
 * buttons, menu cards) subscribe to the stable actions and never
 * re-render when a toast appears or a panel opens.
 */
const UiStateContext = createContext(null);
const UiActionsContext = createContext(null);

const TOAST_MS = 2800;

export function UiProvider({ children }) {
  const [panel, setPanel] = useState(null); // null | 'cart' | 'order'
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const showToast = useCallback((payload) => {
    window.clearTimeout(toastTimer.current);
    setToast({ ...payload, at: Date.now() });
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

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

export function useUiState() {
  const context = useContext(UiStateContext);
  if (!context) throw new Error('useUiState must be used within UiProvider');
  return context;
}

export function useUiActions() {
  const context = useContext(UiActionsContext);
  if (!context) throw new Error('useUiActions must be used within UiProvider');
  return context;
}
