import { useCallback, useEffect, useRef, useState } from 'react';

/** @import { CartActions } from '../types' */

/**
 * Briefly marks a card as "Added" after its button is pressed.
 * @param {CartActions['addItem']} addItem
 * @returns {[addedId: string | null, onAdd: CartActions['addItem']]} The id shown as "Added" (or null) and a
 *   wrapped addItem that sets it.
 */
export function useAddedFlash(addItem) {
  const [addedId, setAddedId] = useState(/** @type {string | null} */ (null));
  /** @type {import('react').RefObject<number | undefined>} */
  const timer = useRef(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onAdd = useCallback(
    /** @type {CartActions['addItem']} */ (item) => {
      addItem(item);
      setAddedId(item.id);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setAddedId(null), 1400);
    },
    [addItem]
  );
  return [addedId, onAdd];
}
