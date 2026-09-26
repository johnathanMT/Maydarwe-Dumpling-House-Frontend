import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChefHat, Phone, X } from 'lucide-react';
import { FACEBOOK_ORDER_URL } from '../../constants/site';

const STORAGE_KEY = 'maydarwe-construction-dismissed';
const CALL_HREF = 'tel:09788167047';

function FacebookMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 22v-8.2h2.76l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56H16.8V4.14A21.3 21.3 0 0 0 14.16 4C11.6 4 9.86 5.56 9.86 8.23v2.37H7.2v3.2h2.66V22h3.64Z" />
    </svg>
  );
}

export default function ConstructionPopup() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    setOpen(true);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label={t('ui.construction.close')}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="relative z-10 max-h-[min(92dvh,40rem)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-[1.75rem] border border-secondary-400/50 bg-white shadow-[0_28px_64px_-24px_rgb(34_30_27_/_0.55)]"
          >
            <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500" />

            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-4 grid h-12 w-12 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
              aria-label={t('ui.construction.close')}
            >
              <X className="h-4 w-4" strokeWidth={2.25} />
            </button>

            <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-600 text-secondary-300 shadow-[0_10px_24px_-12px_rgb(200_16_46_/_0.9)] sm:h-16 sm:w-16">
                <ChefHat className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
              </div>

              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-700">
                {t('ui.construction.kicker')}
              </p>
              <h2 id={titleId} className="mt-2 text-center">
                <span className="block font-display text-[1.55rem] font-extrabold leading-tight text-ink-950 sm:text-[1.7rem]">
                  {t('ui.construction.titleEn')}
                </span>
                <span className="mt-1.5 block font-display text-base font-bold leading-snug text-primary-600 sm:text-lg">
                  {t('ui.construction.titleMy')}
                </span>
              </h2>

              <div id={descId} className="mt-3 space-y-2 text-center text-sm leading-relaxed text-ink-600">
                <p>{t('ui.construction.bodyEn')}</p>
                <p>{t('ui.construction.bodyMy')}</p>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={FACEBOOK_ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#166FE5]"
                >
                  <FacebookMark className="h-4 w-4" />
                  {t('ui.construction.facebook')}
                </a>
                <a
                  href={CALL_HREF}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-secondary-500 bg-white px-5 py-3 text-sm font-semibold text-secondary-800 transition-colors hover:bg-secondary-50"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {t('ui.construction.call')}
                </a>
                <button
                  type="button"
                  onClick={dismiss}
                  className="min-h-12 text-sm font-medium text-ink-500 underline-offset-4 transition-colors hover:text-ink-900 hover:underline"
                >
                  {t('ui.construction.browse')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
