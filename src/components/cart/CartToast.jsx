import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingBag } from 'lucide-react';
import { useUiActions, useUiState } from '../../context/useUi';
import { pickLocale } from '../../data/menu';
import { useLang } from '../../lib/businessHours';

export default function CartToast() {
  const { t } = useTranslation();
  const { toast } = useUiState();
  const { openCart, dismissToast } = useUiActions();
  const language = useLang();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[65] flex justify-center px-4 sm:top-24">
      <AnimatePresence>
        {toast ? (
          <m.div
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full border border-secondary-400/40 bg-white/95 px-3 py-2 shadow-lift backdrop-blur-md"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-butter text-ink-950">
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold text-ink-900">
              <span className="block truncate">{pickLocale(toast.name, language)}</span>
              <span className="block text-xs font-medium text-ink-500">{t('ui.toastAdded')}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                dismissToast();
                openCart();
              }}
              className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-primary-600 px-4 text-xs font-semibold text-white hover:bg-primary-700"
            >
              {t('ui.toastView')}
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
