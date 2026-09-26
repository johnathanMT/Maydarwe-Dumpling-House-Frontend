/**
 * The site's motion vocabulary: one easing curve, two durations.
 * Reduced-motion users are handled globally by <MotionConfig reducedMotion="user">
 * (transforms are dropped, fades stay) and by the CSS rule in index.css.
 */
/** @type {[number, number, number, number]} cubic-bezier control points */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DURATION = {
  ui: 0.2, // buttons, badges, toasts, tabs
  reveal: 0.6, // content entering the viewport
};

/**
 * Scroll reveals play once, when an element is 50px inside the bottom of the
 * screen. `once` means scrolling back up never replays them, and a margin
 * (rather than "20% visible") also works for very tall sections.
 */
/** @type {{ once: boolean, margin: import('framer-motion').UseInViewOptions['margin'] }} */
export const REVEAL_VIEWPORT = { once: true, margin: '0px 0px -50px 0px' };

/**
 * Looping animations (floating sticker, steam, meat badges) run only while
 * they are on screen, with 100px of slack so they are already moving when
 * they scroll into view. Off screen they pause and cost nothing.
 */
/** @type {import('framer-motion').UseInViewOptions} */
export const LOOP_VIEWPORT = { margin: '100px 0px 100px 0px' };

// Variant objects are cached so every component gets the same object back:
// stable references mean framer-motion never sees "new" variants on re-render.
/** @type {Map<string, import('framer-motion').Variants>} */
const cache = new Map();
/**
 * @param {string} key
 * @param {() => import('framer-motion').Variants} make
 * @returns {import('framer-motion').Variants}
 */
const cached = (key, make) => {
  let variants = cache.get(key);
  if (!variants) {
    variants = make();
    cache.set(key, variants);
  }
  return variants;
};

export const fadeUp = (distance = 18) =>
  cached(`fadeUp:${distance}`, () => ({
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
  }));

/**
 * Slide only, no fade: the content is readable from the very first frame.
 * Used when the first-load curtain was skipped, so text counts as painted
 * immediately (Largest Contentful Paint) instead of after a fade.
 */
export const slideUp = (distance = 18) =>
  cached(`slideUp:${distance}`, () => ({
    hidden: { opacity: 1, y: distance },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
  }));

export const stagger = (step = 0.08, delay = 0.05) =>
  cached(`stagger:${step}:${delay}`, () => ({
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  }));

// Loaded lazily by <LazyMotion> in App.jsx so animation code stays out of the first download.
export const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);
