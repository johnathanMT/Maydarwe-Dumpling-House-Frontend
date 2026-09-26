import { useCallback, useEffect, useRef, useState } from 'react';

/** Briefly marks a card as "Added" after its button is pressed. */
export function useAddedFlash(addItem) {
  const [addedId, setAddedId] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onAdd = useCallback(
    (item) => {
      addItem(item);
      setAddedId(item.id);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setAddedId(null), 1400);
    },
    [addItem]
  );
  return [addedId, onAdd];
}
