import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 420;
      setVisible((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('ui.backToTop')}
      className={`fixed right-4 z-[46] grid h-12 w-12 place-items-center rounded-full border border-secondary-400/40 bg-white/95 text-ink-900 shadow-[0_12px_28px_-16px_rgb(34_30_27_/_0.55)] backdrop-blur-md transition-all duration-300 hover:bg-secondary-100 bottom-[5.6rem] md:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}
