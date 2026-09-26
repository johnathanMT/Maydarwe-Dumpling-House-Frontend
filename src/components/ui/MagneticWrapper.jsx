import { useRef } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const MAX_PULL = 16;
const SPRING = { stiffness: 180, damping: 16, mass: 0.2 };

/**
 * Pulls its child a few pixels toward the pointer.
 * Meant for primary buttons; it stays still for reduced-motion and touch.
 */
export default function MagneticWrapper({ children, className = 'inline-flex', strength = 0.35 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  if (reduce) return <div className={className}>{children}</div>;

  const onMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * strength)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * strength)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </m.div>
  );
}
