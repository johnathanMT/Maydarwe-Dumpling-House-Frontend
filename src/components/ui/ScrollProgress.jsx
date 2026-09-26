import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ScrollProgress() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const next = max > 0 ? doc.scrollTop / max : 0;
        setProgress((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
        className="h-full origin-left bg-gradient-to-r from-primary-600 via-secondary-400 to-brand-yellow transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
