import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { pickLocale } from '../../data/menu';

export default function CartToast() {
  const { t, i18n } = useTranslation();
  const { toast, openCart, dismissToast } = useCart();
  const reduce = useReducedMotion();
  const language = i18n.resolvedLanguage === 'my' ? 'my' : 'en';

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[65] flex justify-center px-4 sm:top-24">
      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            initial={reduce ? false : { opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full border border-secondary-400/40 bg-white/95 px-3 py-2 shadow-[0_16px_40px_-20px_rgb(34_30_27_/_0.55)] backdrop-blur-md"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-yellow text-ink-950">
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
              className="shrink-0 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
            >
              {t('ui.toastView')}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
