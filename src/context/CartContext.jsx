import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CART_STORAGE_KEY,
  addOne,
  findOrderable,
  readStoredCart,
  removeEntry,
  setQuantity,
  toCartState,
  writeStoredCart,
} from '../lib/cart';
import { useUiActions } from './UiContext';

/** @import { CartActions, CartEntry, CartState } from '../types' */

/**
 * Cart state for the whole app. The rules (validation, storage, quantities)
 * live in src/lib/cart.js; this file only connects them to React.
 *
 * State and actions live in separate contexts: "Add to cart" buttons use
 * only the stable actions and do not re-render when the cart changes.
 */
const CartStateContext = createContext(/** @type {CartState | null} */ (null));
const CartActionsContext = createContext(/** @type {CartActions | null} */ (null));

/** @param {{ children: import('react').ReactNode }} props */
export function CartProvider({ children }) {
  const { showToast } = useUiActions();
  const [entries, setEntries] = useState(/** @type {() => CartEntry[]} */ (readStoredCart));

  useEffect(() => {
    writeStoredCart(entries);
  }, [entries]);

  // Keep several open tabs in sync. The listener is removed on unmount.
  useEffect(() => {
    /** @param {StorageEvent} event */
    const onStorage = (event) => {
      if (event.key === CART_STORAGE_KEY) setEntries(readStoredCart());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback(
    /** @type {CartActions['addItem']} */ (item) => {
      const dish = findOrderable(item?.id);
      if (!dish) return;
      setEntries((prev) => addOne(prev, dish.id));
      showToast({ id: dish.id, name: dish.name });
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    /** @type {CartActions['updateQuantity']} */ (id, quantity) => setEntries((prev) => setQuantity(prev, id, quantity)),
    []
  );
  const removeItem = useCallback(/** @type {CartActions['removeItem']} */ (id) => setEntries((prev) => removeEntry(prev, id)), []);
  const clearCart = useCallback(() => setEntries([]), []);

  const state = useMemo(() => toCartState(entries), [entries]);
  /** @type {CartActions} */
  const actions = useMemo(
    () => ({ addItem, updateQuantity, removeItem, clearCart }),
    [addItem, updateQuantity, removeItem, clearCart]
  );

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

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
