import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { Box, Loader2 } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

// three.js + React Three Fiber live in this chunk. It is never part of the first load.
const DumplingScene = lazy(() => import('./DumplingScene'));

const HERO_PHOTO = '/IMG_7928.JPG';

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
      {/* Gold-framed stage. aspect-ratio (not fixed heights) keeps it proportional at every width. */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-secondary-200 via-secondary-600 to-secondary-900 p-[2px] shadow-gold">
        <div
          ref={containerRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(2.5rem-2px)] bg-lacquer-800"
        >
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out-soft ${
              show3D ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <OptimizedImage
              src={HERO_PHOTO}
              alt={t('pages.home.heroPhotoAlt')}
              width={1080}
              height={1145}
              priority
              pictureClassName="block h-full w-full"
              className="h-full w-full animate-settle object-cover"
            />
            {/* Warm vignette so the photo sits in the lacquer, plus rising steam. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_45%,rgb(18_14_12_/_0.55)_100%)]"
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
              className="absolute bottom-4 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-lacquer/80 px-5 text-sm font-semibold text-brand-pearl ring-1 ring-secondary-400/50 backdrop-blur transition-colors hover:bg-lacquer disabled:cursor-wait sm:bottom-5"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Box className="h-4 w-4 text-secondary-300" aria-hidden="true" />
              )}
              {loading ? t('pages.home.loading3d') : t('pages.home.view3d')}
            </button>
          ) : null}
        </div>
      </div>

      {show3D ? (
        <p className="mt-3 text-center text-xs font-medium text-brand-pearl/60 sm:text-sm">{t('pages.home.tapSpin')}</p>
      ) : null}
    </div>
  );
}
