import { Link, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS, PRIMARY_PHONE, telHref } from '../../constants/site';
import { FOODPANDA_LOGO_SRC, GRAB_LOGO_SRC } from '../../constants/partnerLogos';
import { useBusinessCopy } from '../../lib/businessHours';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import OpenStatusBadge from '../ui/OpenStatusBadge';
import { DURATION, EASE_OUT, fadeUp, slideUp, stagger } from '../../lib/motion';
import HeroShowcase from './HeroShowcase';
import PartnerLink from './PartnerLink';

/**
 * Home hero: a large maroon wordmark, a short tagline, one phone action,
 * and the food photo. Copy rises in sequence after the opening curtain
 * (fading in), or slides in already visible when the curtain was skipped.
 */
export default function Hero() {
  const { t } = useTranslation();
  const copy = useBusinessCopy();
  const { introReady = true, introSkipped = true } =
    /** @type {{ introReady?: boolean, introSkipped?: boolean } | undefined} */ (useOutletContext()) ?? {};
  // After the curtain (first visit) the copy fades up; when the curtain is
  // skipped it is visible at once and only slides, so it is readable immediately.
  const item = introSkipped ? slideUp(20) : fadeUp(20);
  const showcaseHidden = introSkipped ? { opacity: 1, y: 24 } : { opacity: 0, y: 24 };

  return (
    <section className="bg-sunny relative text-ink-900">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16 lg:px-8 lg:py-28">
        <m.div
          className="text-center md:text-left"
          variants={stagger(0.2, 0.05)}
          initial="hidden"
          animate={introReady ? 'show' : 'hidden'}
        >
          <m.div variants={item}>
            <Eyebrow rule>{t('pages.home.kicker', copy)}</Eyebrow>
          </m.div>

          <m.h1 className="mt-5 font-display" variants={item}>
            <span className="block bg-gradient-to-b from-primary-400 via-primary-600 to-primary-900 bg-clip-text py-4 text-[clamp(3.75rem,10vw,8rem)] font-extrabold leading-relaxed text-transparent drop-shadow-[0_12px_24px_rgba(64,4,14,0.22)]">
              မေဓါဝီ
            </span>
            <span
              className="mt-4 block text-[clamp(1.35rem,3.2vw,2.15rem)] font-medium text-secondary-800"
              style={{ lineHeight: 1.35 }}
            >
              ဖက်ထုပ်အိုးကပ်
            </span>
          </m.h1>

          <m.p
            className="mt-3 font-sans text-xs font-semibold uppercase text-ink-500 sm:text-sm"
            style={{ letterSpacing: '0.32em' }}
            variants={item}
          >
            {t('brand.english')}
          </m.p>

          <m.div variants={item} aria-hidden="true" className="gold-rule mx-auto mt-6 w-28 md:mx-0" />

          <m.p
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg md:mx-0"
            variants={item}
          >
            {t('pages.home.sub')}
          </m.p>

          <m.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
            variants={item}
          >
            <Button
              as="a"
              href={telHref(PRIMARY_PHONE)}
              magnetic
              className="!bg-primary-900 px-8 !shadow-[0_18px_40px_-16px_rgba(64,4,14,0.75)] hover:!bg-primary-800"
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {t('pages.home.orderByPhone')}
            </Button>
            <Button as={Link} to="/menu" variant="secondary" className="group" magnetic>
              {t('pages.home.viewMenu')}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </m.div>

          <m.div className="mt-4 flex gap-3 sm:justify-center md:justify-start" variants={item}>
            <PartnerLink
              href={BUSINESS.links.grab}
              label={t('order.grab')}
              logoSrc={GRAB_LOGO_SRC}
              ring="ring-partner-grab/60"
            />
            <PartnerLink
              href={BUSINESS.links.foodpanda}
              label={t('order.foodpanda')}
              logoSrc={FOODPANDA_LOGO_SRC}
              ring="ring-partner-foodpanda/50"
            />
          </m.div>

          <m.div className="mt-8" variants={item}>
            <OpenStatusBadge />
          </m.div>
        </m.div>

        <m.div
          initial={showcaseHidden}
          animate={introReady ? { opacity: 1, y: 0 } : showcaseHidden}
          transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay: introReady ? 0.2 : 0 }}
        >
          <HeroShowcase />
        </m.div>
      </div>
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-butter-400 to-transparent" />
    </section>
  );
}
