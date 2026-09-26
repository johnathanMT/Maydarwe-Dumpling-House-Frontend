import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, useReducedMotion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';
import { DumplingHomeIcon } from '../layout/NavIcons';
import { HERO_PHOTO_REMOTE } from '../../assets/photos/remote';
import { LOOP_VIEWPORT } from '../../lib/motion';
import MascotGreeting from './MascotGreeting';
import SceneBoundary from './SceneBoundary';
import Steam from './Steam';
import View3DButton from './View3DButton';
import { useAutoLoad3D } from './useAutoLoad3D';

// three.js + React Three Fiber live in this chunk. It is never part of the first load.
const DumplingScene = lazy(() => import('./DumplingScene'));

/**
 * Hero visual. First paint is a real food photo (fast, appetising, LCP-friendly).
 * The interactive 3D dumpling loads on demand ("View in 3D"), or by itself on
 * capable desktops once the hero is on screen and the browser is idle.
 */
export default function HeroShowcase() {
  const { t } = useTranslation();
  const reduce = Boolean(useReducedMotion());
  /** @type {import('react').RefObject<HTMLDivElement | null>} */
  const frameRef = useRef(null);
  /** @type {import('react').RefObject<HTMLDivElement | null>} */
  const showcaseRef = useRef(null);
  const onScreen = useInView(showcaseRef, LOOP_VIEWPORT);
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const load3D = useCallback(() => setWant3D(true), []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => {
    setFailed(true);
    setWant3D(false);
    setReady(false);
  }, []);
  useAutoLoad3D(frameRef, { enabled: !want3D && !failed, reduceMotion: reduce, onLoad: load3D });

  const loading = want3D && !ready;
  const show3D = want3D && ready;

  return (
    <div ref={showcaseRef} className="mx-auto w-full max-w-sm sm:max-w-md md:mr-0">
      {/* White-framed photo with a soft warm shadow. aspect-ratio keeps it proportional at every width.
          Off screen, the floating sticker and the steam pause (.loop-paused). */}
      <div
        className={`relative rounded-[2.5rem] bg-white p-2 shadow-warm ring-1 ring-butter-400/60 ${onScreen ? '' : 'loop-paused'}`}
      >
        {/* Cartoon dumpling "sticker" peeking over the frame. */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-4 -top-5 z-10 rotate-[-10deg] sm:-left-6 sm:-top-6">
          <div
            className={`grid h-16 w-16 animate-float place-items-center rounded-full bg-butter shadow-warm ring-4 ring-white sm:h-20 sm:w-20 ${onScreen ? 'will-change-transform' : ''}`}
          >
            <DumplingHomeIcon className="h-12 w-12 sm:h-[3.75rem] sm:w-[3.75rem]" />
          </div>
        </div>

        <MascotGreeting />
        <div ref={frameRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-butter-100">
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
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/35 to-transparent" />
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

          {!show3D && !failed ? <View3DButton loading={loading} onClick={load3D} /> : null}
        </div>
      </div>

      {show3D ? <p className="mt-3 text-center text-xs font-medium text-ink-500 sm:text-sm">{t('pages.home.tapSpin')}</p> : null}
    </div>
  );
}
