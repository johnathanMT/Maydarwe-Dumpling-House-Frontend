import { Component, Fragment, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useReducedMotion } from 'framer-motion';
import { Box, Loader2 } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import { DumplingHomeIcon } from '../layout/NavIcons';
import { HERO_PHOTO_REMOTE } from '../../assets/photos/remote';

// three.js + React Three Fiber live in this chunk. It is never part of the first load.
const DumplingScene = lazy(() => import('./DumplingScene'));


/** Any failure (chunk, model download, WebGL) → quietly keep the photo. */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Burmese has no reliable word breaks, so the browser may split a word in two.
 * Break only at the spaces in the copy, and keep punctuation (၊ ? !) on the
 * same line as the word before it.
 */
const toPhrases = (text) => text.replace(/ ([?!၊။])/g, '\u00A0$1').split(' ');

/**
 * The dumpling mascot says hello: a small frosted-glass cloud that springs in
 * one second after the page loads. It sits on the top edge of the frame, so
 * the food photo stays visible, and the photo shows through the sky-blue glass.
 * Its tighter top-left corner points back at the mascot.
 * Visitors who prefer reduced motion get a plain fade (MotionConfig in App.jsx).
 */
function MascotGreeting() {
  const { t } = useTranslation();
  return (
    <m.p
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      style={{ transformOrigin: 'top left' }}
      className="absolute -top-3 left-[3.4rem] z-20 max-w-[11.5rem] rounded-[1.75rem] rounded-tl-lg border border-white/60 bg-gradient-to-br from-sky-100/75 via-sky-200/65 to-sky-300/55 px-3.5 py-2.5 text-xs font-semibold leading-[1.65] text-ink-950 shadow-lg shadow-sky-900/15 backdrop-blur-md backdrop-saturate-150 text-balance [text-shadow:0_1px_0_rgb(255_255_255/0.55)] sm:-top-4 sm:left-[4.5rem] sm:max-w-[13.5rem] sm:px-4 sm:py-3 sm:text-sm"
    >
      {toPhrases(t('pages.home.mascotGreeting')).map((phrase, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="whitespace-nowrap">{phrase}</span>
        </Fragment>
      ))}
    </m.p>
  );
}

/** Three soft wisps of steam rising off the pan (CSS only; frozen for reduced-motion users). */
function Steam() {
  const wisps = [
    { left: '38%', delay: '0s' },
    { left: '50%', delay: '1.1s' },
    { left: '62%', delay: '2.2s' },
  ];
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[6%] h-1/3 w-full motion-reduce:hidden" viewBox="0 0 100 40" preserveAspectRatio="none">
      {wisps.map(({ left, delay }) => (
        // The <g> positions the wisp; the path itself animates (a CSS transform would override an SVG one).
        <g key={left} transform={`translate(${parseFloat(left)} 0)`}>
          <path
            d="M0 40 C -4 30, 4 24, 0 16 C -4 8, 4 4, 0 0"
            fill="none"
            stroke="rgb(253 250 246 / 0.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-0 animate-steam [transform-box:fill-box] [transform-origin:bottom]"
            style={{ animationDelay: delay, filter: 'blur(1.5px)' }}
          />
        </g>
      ))}
    </svg>
  );
}

/** Auto-load 3D only where it is cheap: a wide screen, no Save-Data, no reduced motion, ≥4 cores. */
function canAutoLoad3D(reduceMotion) {
  if (reduceMotion) return false;
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (navigator.connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 4) < 4) return false;
  return true;
}

const whenIdle = (callback) =>
  'requestIdleCallback' in window
    ? window.requestIdleCallback(callback, { timeout: 2500 })
    : window.setTimeout(callback, 1200);

const cancelIdle = (id) =>
  'cancelIdleCallback' in window ? window.cancelIdleCallback(id) : window.clearTimeout(id);

/**
 * Hero visual. First paint is a real food photo (fast, appetising, LCP-friendly).
 * The interactive 3D dumpling loads on demand ("View in 3D"), or by itself on
 * capable desktops once the hero is on screen and the browser is idle.
 */
export default function HeroShowcase() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (want3D || failed || !canAutoLoad3D(reduce)) return undefined;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    let idleId = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        idleId = whenIdle(() => setWant3D(true));
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idleId !== null) cancelIdle(idleId);
    };
  }, [want3D, failed, reduce]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => {
    setFailed(true);
    setWant3D(false);
    setReady(false);
  }, []);

  const loading = want3D && !ready;
  const show3D = want3D && ready;

  return (
    <div className="mx-auto w-full max-w-sm sm:max-w-md md:mr-0">
      {/* White-framed photo with a soft warm shadow. aspect-ratio keeps it proportional at every width. */}
      <div className="relative rounded-[2.5rem] bg-white p-2 shadow-warm ring-1 ring-butter-400/60">
        {/* Cartoon dumpling "sticker" peeking over the frame. */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-4 -top-5 z-10 rotate-[-10deg] sm:-left-6 sm:-top-6">
          <div className="grid h-16 w-16 animate-float place-items-center rounded-full bg-butter shadow-warm ring-4 ring-white sm:h-20 sm:w-20">
            <DumplingHomeIcon className="h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem]" />
          </div>
        </div>

        <MascotGreeting />
        <div
          ref={containerRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-butter-100"
        >
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out-soft ${
              show3D ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <OptimizedImage
              image={HERO_PHOTO_REMOTE}
              alt={t('pages.home.heroPhotoAlt')}
              sizes="(min-width: 640px) 448px, 92vw"
              priority
              pictureClassName="block h-full w-full"
              className="h-full w-full animate-settle object-cover"
            />
            {/* Gentle bottom shade so the "View in 3D" button stays readable, plus rising steam. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/35 to-transparent"
            />
            <Steam />
          </div>

          {want3D ? (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-out-soft ${show3D ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={!show3D}
            >
              <SceneBoundary onError={handleError}>
                <Suspense fallback={null}>
                  <DumplingScene onReady={handleReady} />
                </Suspense>
              </SceneBoundary>
            </div>
          ) : null}

          {!show3D && !failed ? (
            <button
              type="button"
              onClick={() => setWant3D(true)}
              disabled={loading}
              className="absolute bottom-4 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/95 px-5 text-sm font-semibold text-ink-900 shadow-lift ring-1 ring-butter-400 backdrop-blur transition-colors hover:bg-butter-100 disabled:cursor-wait sm:bottom-5"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Box className="h-4 w-4 text-primary-600" aria-hidden="true" />
              )}
              {loading ? t('pages.home.loading3d') : t('pages.home.view3d')}
            </button>
          ) : null}
        </div>
      </div>

      {show3D ? (
        <p className="mt-3 text-center text-xs font-medium text-ink-500 sm:text-sm">{t('pages.home.tapSpin')}</p>
      ) : null}
    </div>
  );
}
