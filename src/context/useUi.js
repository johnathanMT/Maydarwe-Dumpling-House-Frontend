import { createContext, useContext } from 'react';

/** @import { ToastPayload } from '../types' */

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
export const UiStateContext = createContext(/** @type {UiState | null} */ (null));
export const UiActionsContext = createContext(/** @type {UiActions | null} */ (null));

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
