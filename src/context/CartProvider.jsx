import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useUiActions } from './useUi';
import { CartActionsContext, CartStateContext } from './useCart';

/** @import { CartActions, CartEntry } from '../types' */

/**
 * Provides the cart (see ./useCart.js for the hooks that read it).
 * The rules (validation, storage, quantities) live in src/lib/cart.js; this
 * file only connects them to React.
 * @param {{ children: import('react').ReactNode }} props
 */
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
    /** @type {CartActions['updateQuantity']} */ (id, quantity) =>
      setEntries((prev) => setQuantity(prev, id, quantity)),
    []
  );
  const removeItem = useCallback(
    /** @type {CartActions['removeItem']} */ (id) => setEntries((prev) => removeEntry(prev, id)),
    []
  );
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
