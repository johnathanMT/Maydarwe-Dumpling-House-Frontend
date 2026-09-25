import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import CuteDumpling from './CuteDumpling';
import { CONTACT_PHONES } from '../../constants/site';

export default function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const orderPhone = CONTACT_PHONES[0];

  return (
    <section className="relative overflow-hidden border-b border-secondary-400/25 bg-[linear-gradient(180deg,#fff8e6_0%,#ffffff_78%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgb(200 16 46 / 0.08), transparent 34%), radial-gradient(circle at 86% 18%, rgb(232 160 6 / 0.16), transparent 32%)',
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary-700"
        >
          {t('pages.home.kicker')}
        </motion.p>

        <div className="mt-6 w-full">
          <CuteDumpling />
        </div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-4xl font-display text-[1.65rem] font-semibold leading-snug text-primary-600 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t('brand.official')}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-3 font-display text-xl font-semibold text-secondary-700 sm:text-2xl"
        >
          {t('brand.english')}
        </motion.p>
        <p className="mt-4 max-w-2xl text-base text-ink-600 sm:text-lg">{t('pages.home.sub')}</p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 sm:text-base"
          >
            {t('pages.home.viewMenu')}
          </Link>
          <a
            href={orderPhone.href}
            className="inline-flex items-center justify-center rounded-full border-2 border-secondary-500 bg-white px-7 py-3.5 text-sm font-semibold text-secondary-800 transition-colors hover:bg-secondary-50 sm:text-base"
          >
            {t('pages.home.orderNow')}
          </a>
        </div>
      </div>
    </section>
  );
}
