import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX } from 'lucide-react';
import { HOME_REEL_SRC } from '../../assets/photos/remote';

/**
 * Full-bleed kitchen film between the hero and the signature dishes.
 * Starts muted so browsers will autoplay; the glass button turns sound on.
 */
export default function HomeReel() {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

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
    <section className="relative w-full overflow-hidden bg-ink-950" aria-label={t('pages.home.videoLabel')}>
      <video
        ref={videoRef}
        className="mx-auto block h-auto w-full max-h-[calc(100dvh-8rem)] object-contain object-center"
        src={HOME_REEL_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? t('pages.home.videoUnmute') : t('pages.home.videoMute')}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/45 bg-white/15 text-white shadow-lift backdrop-blur-md backdrop-saturate-150 ring-1 ring-white/30 transition-[background-color,transform] duration-200 ease-out-soft hover:bg-white/25 max-md:bottom-20 sm:right-5 md:bottom-5"
      >
        {muted ? <VolumeX className="h-5 w-5" strokeWidth={2} aria-hidden="true" /> : <Volume2 className="h-5 w-5" strokeWidth={2} aria-hidden="true" />}
      </button>
    </section>
  );
}
