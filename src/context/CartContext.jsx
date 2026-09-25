import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { sanitizeId, sanitizeInteger } from '../lib/sanitize';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const dismissToast = useCallback(() => {
    setToast(null);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    []
  );

  const addItem = useCallback((item) => {
    const id = sanitizeId(item?.id);
    const catalogItem = MENU_ITEMS.find((row) => row.id === id);
    if (!catalogItem?.inStock) return;
    setLines((prev) => {
      const existing = prev.find((line) => line.id === catalogItem.id);
      if (existing) {
        return prev.map((line) =>
          line.id === catalogItem.id
            ? { ...line, quantity: sanitizeInteger(line.quantity + 1, { min: 1, max: 20 }) }
            : line
        );
      }
      return [
        ...prev,
        {
          id: catalogItem.id,
          name: catalogItem.name,
          price: catalogItem.price,
          image: catalogItem.image,
          quantity: 1,
        },
      ];
    });
    setToast({ id: catalogItem.id, name: catalogItem.name, at: Date.now() });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    const safeId = sanitizeId(id);
    const nextQuantity = sanitizeInteger(quantity, { min: 0, max: 20 });
    setLines((prev) => {
      if (nextQuantity < 1) return prev.filter((line) => line.id !== safeId);
      return prev.map((line) => (line.id === safeId ? { ...line, quantity: nextQuantity } : line));
    });
  }, []);

  const removeItem = useCallback((id) => {
    const safeId = sanitizeId(id);
    setLines((prev) => prev.filter((line) => line.id !== safeId));
  }, []);

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      toast,
      dismissToast,
    }),
    [lines, count, subtotal, isOpen, openCart, closeCart, addItem, updateQuantity, removeItem, toast, dismissToast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
