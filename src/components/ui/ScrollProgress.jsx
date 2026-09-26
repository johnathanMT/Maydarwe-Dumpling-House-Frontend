import { useScrollProgress } from '../../hooks/useScroll';
import { useTranslation } from 'react-i18next';

/** Thin gold bar across the top of the page showing how far you have scrolled (desktop). */
export default function ScrollProgress() {
  const { t } = useTranslation();
  const progress = useScrollProgress();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-ink-100/40"
      role="progressbar"
      aria-label={t('ui.scrollProgress')}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary-600 via-secondary-400 to-butter transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
