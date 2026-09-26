import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useReducedMotion } from 'framer-motion';
import DumplingPlush from '../mascot/DumplingPlush';
import { EASE_OUT } from '../../lib/motion';
import { useScrollLock } from './Sheet';

/**
 * First-paint curtain: the plush dumpling holds the ivory screen for a
 * moment, then the curtain fades and the site is there underneath.
 */
export default function LoadingScreen({ onDone }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const fade = reduceMotion ? 0.01 : 0.75;
  const [phase, setPhase] = useState('show');
  useScrollLock(phase !== 'done');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setPhase('exit'), reduce ? 400 : 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'exit') return undefined;
    const backup = window.setTimeout(() => setPhase('done'), fade * 1000 + 200);
    return () => window.clearTimeout(backup);
  }, [phase, fade]);

  useEffect(() => {
    if (phase === 'done') onDone?.();
  }, [phase, onDone]);

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
        if (phase === 'exit') setPhase('done');
      }}
    >
      <span className="sr-only">{t('ui.loading')}</span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(200_16_46_/_0.08),transparent_46%)]"
      />
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <m.div
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
