import { createContext, useContext } from 'react';

/** @import { CartActions, CartState } from '../types' */

/**
 * Cart state for the whole app. The rules (validation, storage, quantities)
 * live in src/lib/cart.js; this file only connects them to React.
 *
 * State and actions live in separate contexts: "Add to cart" buttons use
 * only the stable actions and do not re-render when the cart changes.
 */
export const CartStateContext = createContext(/** @type {CartState | null} */ (null));
export const CartActionsContext = createContext(/** @type {CartActions | null} */ (null));

/**
 * { lines, count, subtotal }: re-renders when the cart changes.
 * @returns {CartState}
 */
export function useCart() {
  const context = useContext(CartStateContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

/**
 * { addItem, updateQuantity, removeItem, clearCart }: stable, never re-renders.
 * @returns {CartActions}
 */
export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context) throw new Error('useCartActions must be used within CartProvider');
  return context;
}
