import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useReducedMotion } from 'framer-motion';
import DumplingPlush from '../mascot/DumplingPlush';
import { EASE_OUT } from '../../lib/motion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { markIntroSeen } from '../../lib/introSession';

/** Keep the curtain long enough to read as intentional, never long enough to annoy. */
const MIN_MS = 500;
const MAX_MS = 1500;

/**
 * First-load curtain: the plush dumpling holds the ivory screen while the page
 * mounts underneath, then fades away. It leaves as soon as `appReady` is true
 * (page mounted and fonts loaded) after at least MIN_MS, and never later than
 * MAX_MS even on a slow connection. Layout shows it only once per session.
 * @param {object} props
 * @param {boolean} [props.appReady] Page mounted and fonts loaded.
 * @param {() => void} [props.onDone] Called once the curtain has fully gone.
 */
export default function LoadingScreen({ appReady = false, onDone }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const fade = reduceMotion ? 0.01 : 0.45;
  const [minElapsed, setMinElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [done, setDone] = useState(false);
  const exiting = (minElapsed && appReady) || timedOut;
  const phase = done ? 'done' : exiting ? 'exit' : 'show';
  useScrollLock(!done);

  useEffect(() => {
    const min = window.setTimeout(() => setMinElapsed(true), reduceMotion ? 150 : MIN_MS);
    const max = window.setTimeout(() => setTimedOut(true), MAX_MS);
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(max);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!exiting) return undefined;
    markIntroSeen();
    // Backup in case the fade's completion event never fires (e.g. a hidden tab).
    const backup = window.setTimeout(() => setDone(true), fade * 1000 + 200);
    return () => window.clearTimeout(backup);
  }, [exiting, fade]);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  if (phase === 'done') return null;

  return (
    <m.div
      role="status"
      aria-live="polite"
      aria-hidden={phase === 'exit'}
      className="fixed inset-0 z-[80] grid place-items-center bg-ivory"
      initial={false}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: phase === 'exit' ? fade : 0, ease: EASE_OUT }}
      onAnimationComplete={() => {
        if (phase === 'exit') setDone(true);
      }}
    >
      <span className="sr-only">{t('ui.loading')}</span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(200_16_46_/_0.08),transparent_46%)]"
      />
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <m.div
          className="will-change-transform"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <DumplingPlush className="h-32 w-32 sm:h-40 sm:w-40" />
        </m.div>
        <p className="mt-8 font-display text-lg font-semibold text-primary-700">{t('brand.official')}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-secondary-700">{t('brand.english')}</p>
      </div>
    </m.div>
  );
}
