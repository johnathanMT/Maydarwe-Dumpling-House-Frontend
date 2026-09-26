import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { HOME_REEL_SRC } from '../../assets/photos/remote';

/**
 * Full-bleed kitchen film between the hero and the signature dishes.
 * Starts muted so browsers will autoplay; the glass button turns sound on.
 *
 * Performance:
 * - The video file is only requested after the page has finished loading and
 *   the reel is within half a screen, so it never competes with the hero photo.
 * - It plays only while at least a quarter of it is visible, and pauses when
 *   scrolled away (no decoding, battery or data spent off screen).
 * - Visitors who ask for reduced motion get native controls instead of autoplay.
 */
/**
 * True once the window's load event has fired (hero photo, fonts and scripts done).
 * @returns {boolean}
 */
function usePageLoaded() {
  const [loaded, setLoaded] = useState(() => document.readyState === 'complete');
  useEffect(() => {
    if (loaded) return undefined;
    const onLoad = () => setLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, [loaded]);
  return loaded;
}

export default function HomeReel() {
  const { t } = useTranslation();
  const reduce = Boolean(useReducedMotion());
  /** @type {import('react').RefObject<HTMLElement | null>} */
  const sectionRef = useRef(null);
  /** @type {import('react').RefObject<HTMLVideoElement | null>} */
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const pageLoaded = usePageLoaded();
  const inRange = useInView(sectionRef, { margin: '50% 0px 50% 0px' });
  const visible = useInView(sectionRef, { amount: 0.25 });
  // Start the download only after the page itself has loaded and the reel is
  // within half a screen; once started, keep the source.
  const [near, setNear] = useState(false);
  if (!near && pageLoaded && inRange) setNear(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    if (visible) video.play().catch(() => {});
    else video.pause();
  }, [visible, near, reduce]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setMuted(nextMuted);
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-ink-950" aria-label={t('pages.home.videoLabel')}>
      <video
        ref={videoRef}
        className="mx-auto block aspect-video h-auto w-full max-h-[calc(100dvh-8rem)] object-contain object-center"
        src={near ? HOME_REEL_SRC : undefined}
        loop
        muted
        playsInline
        controls={reduce}
        preload={near ? 'auto' : 'none'}
      />
      {reduce ? null : (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? t('pages.home.videoUnmute') : t('pages.home.videoMute')}
          aria-pressed={!muted}
          className="absolute bottom-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/45 bg-white/15 text-white shadow-lift backdrop-blur-md backdrop-saturate-150 ring-1 ring-white/30 transition-[background-color,transform] duration-200 ease-out-soft hover:bg-white/25 max-md:bottom-20 sm:right-5 md:bottom-5"
        >
          {muted ? <VolumeX className="h-5 w-5" strokeWidth={2} aria-hidden="true" /> : <Volume2 className="h-5 w-5" strokeWidth={2} aria-hidden="true" />}
        </button>
      )}
    </section>
  );
}
