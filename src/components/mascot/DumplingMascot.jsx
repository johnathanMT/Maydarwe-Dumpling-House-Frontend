import { m, useReducedMotion } from 'framer-motion';
import { PlushBody, PLUSH_COLORS } from './DumplingPlush';

/** One curl of steam that rises, stretches and fades on a loop. */
function SteamWisp({ d, delay }) {
  const reduce = useReducedMotion();

  return (
    <m.path
      d={d}
      fill="none"
      stroke={PLUSH_COLORS.steam}
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ opacity: 0.2, pathLength: 0.35 }}
      animate={
        reduce ? { opacity: 0.4 } : { opacity: [0.15, 0.85, 0.15], y: [2, -4, -7], pathLength: [0.3, 1, 0.35] }
      }
      transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/**
 * Large animated mascot (404 page): springs in, then bobs gently while its
 * shadow breathes underneath and steam curls off the top.
 */
export default function DumplingMascot({ className = '' }) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={`relative mx-auto w-[min(100%,18rem)] sm:w-[22rem] lg:w-[24rem] ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.68, y: 44 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, mass: 0.8 }}
    >
      <svg viewBox="4 0 112 118" className="relative mx-auto h-auto w-full overflow-visible" aria-hidden="true">
        {/* Shadow stays on the ground while the dumpling bobs above it. */}
        <m.ellipse
          cx="60"
          cy="112"
          rx="36"
          ry="4.5"
          fill="#B8741A"
          animate={reduce ? { opacity: 0.18 } : { opacity: [0.12, 0.26, 0.12], rx: [30, 40, 30] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <m.g
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PlushBody strokeWidth={2.2} groundShadow={false} />
          <SteamWisp delay={0} d="M46 34 C42 28 50 24 46 16" />
          <SteamWisp delay={0.35} d="M60 31 C56 25 64 21 60 11" />
          <SteamWisp delay={0.7} d="M74 34 C70 28 78 24 74 16" />
        </m.g>
      </svg>
    </m.div>
  );
}
