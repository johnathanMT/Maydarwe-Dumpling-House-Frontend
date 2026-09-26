import { useEffect, useState } from 'react';

/**
 * React Three Fiber render mode: 'always' while the scene is on screen and
 * the tab is visible, 'never' otherwise, so the GPU is idle when nobody is looking.
 * Both listeners are removed on unmount.
 * @param {import('react').RefObject<HTMLElement | null>} ref The scene's wrapper element.
 * @returns {'always' | 'never'}
 */
export function useFrameloop(ref) {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return inView && visible ? 'always' : 'never';
}
