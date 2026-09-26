import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { CONTACT_PHONES } from '../../constants/site';
import DumplingScene from './DumplingScene';

export default function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const orderPhone = CONTACT_PHONES[0];

  return (
    <section className="relative overflow-hidden border-b border-secondary-400/25">
      <div className="bg-brand-yellow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] sm:h-[26rem]"
          style={{
            backgroundImage: 'radial-gradient(circle at 12% 8%, rgb(200 16 46 / 0.08), transparent 32%)',
          }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-6 pt-10 text-center sm:px-6 sm:pb-8 sm:pt-12 lg:px-8 lg:pt-14">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary-700"
          >
            {t('pages.home.kicker')}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="mt-4 flex flex-col items-center"
          >
            <span className="max-w-full font-display text-[clamp(2.4rem,14vw,3.15rem)] font-extrabold text-primary-600 antialiased [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-shadow:0_1px_0_#8B0A1A,0_0_4px_#C8102E,0_0_1px_#C8102E] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              မေဓာဝီ
            </span>
            <span className="mt-2 max-w-full font-display text-[clamp(1.35rem,8vw,1.85rem)] font-extrabold text-ink-950 antialiased [-webkit-font-smoothing:antialiased] sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
              ဖက်ထုပ်အိုးကပ်
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 font-display text-lg font-semibold text-secondary-700 sm:text-2xl"
          >
            {t('brand.english')}
          </motion.p>
          <p className="mt-3 max-w-2xl text-base text-ink-600 sm:text-lg">{t('pages.home.sub')}</p>
        </div>
      </div>

      <div className="bg-brand-pearl">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-10 pt-2 text-center sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
          <div className="w-full">
            <DumplingScene />
          </div>
          <p className="mt-1 text-xs font-medium text-ink-500 sm:text-sm">{t('pages.home.tapSpin')}</p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:justify-center">
            <Link
              to="/menu"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 sm:text-base"
            >
              {t('pages.home.viewMenu')}
            </Link>
            <a
              href={orderPhone.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-secondary-500 bg-white px-7 py-3.5 text-sm font-semibold text-secondary-800 transition-colors hover:bg-secondary-50 sm:text-base"
            >
              {t('pages.home.orderNow')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
