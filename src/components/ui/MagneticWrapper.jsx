import { useRef } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const MAX_PULL = 16;
const SPRING = { stiffness: 180, damping: 16, mass: 0.2 };

/**
 * Pulls its child a few pixels toward the pointer.
 * Meant for primary buttons; it stays still for reduced-motion and touch.
 * @param {object} props
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {number} [props.strength] Share of the pointer offset to follow (0–1).
 */
export default function MagneticWrapper({ children, className = 'inline-flex', strength = 0.35 }) {
  /** @type {import('react').RefObject<HTMLDivElement | null>} */
  const ref = useRef(null);
  /** @type {import('react').RefObject<DOMRect | null>} */
  const rect = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  if (reduce) return <div className={className}>{children}</div>;

  // Measure once when the pointer arrives (not on every move, which would force
  // a layout read per frame), and hint the GPU only while the button is live.
  const onMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    rect.current = el.getBoundingClientRect();
    el.style.willChange = 'transform';
  };

  /** @param {import('react').MouseEvent<HTMLDivElement>} event */
  const onMouseMove = (event) => {
    const box = rect.current;
    if (!box) return;
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * strength)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * strength)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    rect.current = null;
    if (ref.current) ref.current.style.willChange = 'auto';
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </m.div>
  );
}
