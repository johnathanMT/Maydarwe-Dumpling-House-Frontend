import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { sanitizeId, sanitizeInteger } from '../lib/sanitize';
import { useUiActions } from './UiContext';

/**
 * Cart = a list of { id, quantity } persisted in localStorage.
 *
 * Names, prices and photos are always looked up from MENU_ITEMS at render
 * time, so a saved cart can never show a stale or tampered price, and a
 * dish that goes out of stock drops out on the next load.
 *
 * State and actions live in separate contexts: "Add to cart" buttons use
 * only the stable actions and do not re-render when the cart changes.
 */
const CartStateContext = createContext(null);
const CartActionsContext = createContext(null);

const STORAGE_KEY = 'maydarwe-cart-v1';
const MAX_QUANTITY = 20;
const CATALOG = new Map(MENU_ITEMS.map((item) => [item.id, item]));

/** Accept only known, in-stock dishes with a sane quantity; merge duplicates. */
function normalizeEntries(raw) {
  if (!Array.isArray(raw)) return [];
  const merged = new Map();
  for (const entry of raw.slice(0, 50)) {
    const id = sanitizeId(entry?.id);
    const item = CATALOG.get(id);
    if (!item?.inStock) continue;
    const quantity = sanitizeInteger(entry?.quantity, { min: 0, max: MAX_QUANTITY });
    if (quantity < 1) continue;
    merged.set(id, Math.min(MAX_QUANTITY, (merged.get(id) ?? 0) + quantity));
  }
  return Array.from(merged, ([id, quantity]) => ({ id, quantity }));
}

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeEntries(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function writeStoredCart(entries) {
  try {
    if (entries.length === 0) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full or blocked (private mode): the cart still works for this visit.
  }
}

export function CartProvider({ children }) {
  const { showToast } = useUiActions();
  const [entries, setEntries] = useState(readStoredCart);

  useEffect(() => {
    writeStoredCart(entries);
  }, [entries]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setEntries(readStoredCart());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback(
    (item) => {
      const catalogItem = CATALOG.get(sanitizeId(item?.id));
      if (!catalogItem?.inStock) return;
      setEntries((prev) => {
        const existing = prev.find((entry) => entry.id === catalogItem.id);
        if (!existing) return [...prev, { id: catalogItem.id, quantity: 1 }];
        return prev.map((entry) =>
          entry.id === catalogItem.id
            ? { ...entry, quantity: Math.min(MAX_QUANTITY, entry.quantity + 1) }
            : entry
        );
      });
      showToast({ id: catalogItem.id, name: catalogItem.name });
    },
    [showToast]
  );

  const updateQuantity = useCallback((id, quantity) => {
    const safeId = sanitizeId(id);
    const next = sanitizeInteger(quantity, { min: 0, max: MAX_QUANTITY });
    setEntries((prev) =>
      next < 1
        ? prev.filter((entry) => entry.id !== safeId)
        : prev.map((entry) => (entry.id === safeId ? { ...entry, quantity: next } : entry))
    );
  }, []);

  const removeItem = useCallback((id) => {
    const safeId = sanitizeId(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== safeId));
  }, []);

  const clearCart = useCallback(() => setEntries([]), []);

  const state = useMemo(() => {
    const lines = entries
      .map(({ id, quantity }) => {
        const item = CATALOG.get(id);
        return item ? { id, quantity, name: item.name, price: item.price, image: item.image } : null;
      })
      .filter(Boolean);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    };
  }, [entries]);

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

/** { lines, count, subtotal } — re-renders when the cart changes. */
export function useCart() {
  const context = useContext(CartStateContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

/** { addItem, updateQuantity, removeItem, clearCart } — stable, never re-renders. */
export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context) throw new Error('useCartActions must be used within CartProvider');
  return context;
}
