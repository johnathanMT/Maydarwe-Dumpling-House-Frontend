import { useScrolledPast } from '../../hooks/useScroll';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../../lib/lenisControl';

/** Round "back to top" button that appears once the page is scrolled a little way down. */
export default function BackToTop() {
  const { t } = useTranslation();
  const visible = useScrolledPast(420);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('ui.backToTop')}
      className={`fixed bottom-[5.6rem] right-4 z-[46] grid h-12 w-12 place-items-center rounded-full border border-secondary-400/40 bg-white/95 text-ink-900 shadow-lift backdrop-blur-md transition-all duration-300 hover:bg-secondary-100 md:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
}
