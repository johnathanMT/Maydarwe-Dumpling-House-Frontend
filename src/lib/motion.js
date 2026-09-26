/**
 * The site's motion vocabulary: one easing curve, two durations.
 * Reduced-motion users are handled globally by <MotionConfig reducedMotion="user">
 * (transforms are dropped, fades stay) and by the CSS rule in index.css.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DURATION = {
  ui: 0.2, // buttons, badges, toasts, tabs
  reveal: 0.6, // content entering the viewport
};

export const fadeUp = (distance = 18) => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
});

export const stagger = (step = 0.08, delay = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

// Loaded lazily by <LazyMotion> in App.jsx so animation code stays out of the first download.
export const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);
