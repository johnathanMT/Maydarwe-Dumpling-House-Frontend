import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import {
  BUSINESS,
  PRIMARY_PHONE,
  telHref,
} from '../../constants/site';
import { FOODPANDA_LOGO_SRC, GRAB_LOGO_SRC } from '../../constants/partnerLogos';
import { useBusinessCopy } from '../../lib/businessHours';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import OpenStatusBadge from '../ui/OpenStatusBadge';
import { Reveal } from '../ui/Reveal';
import { DURATION, EASE_OUT } from '../../lib/motion';
import HeroShowcase from './HeroShowcase';

/** "Order on [logo]" in English, "[logo] မှ မှာယူရန်" in Burmese. The link carries the full aria-label. */
function PartnerLabel({ logoSrc }) {
  const { t } = useTranslation();
  const before = t('pages.home.orderOnBefore');
  const after = t('pages.home.orderOnAfter');
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
      {before ? <span>{before}</span> : null}
      <img src={logoSrc} alt="" className="h-[18px] w-auto" loading="lazy" decoding="async" />
      {after ? <span>{after}</span> : null}
    </span>
  );
}

function PartnerLink({ href, label, logoSrc, ring }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white px-5 shadow-sm ring-2 ring-inset transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift sm:flex-none ${ring}`}
    >
      <PartnerLabel logoSrc={logoSrc} />
    </a>
  );
}

/**
 * Home hero on a sunny butter-yellow surface: the brand in red and ink, the story in one
 * paragraph, one primary action (call), the delivery apps, and a real
 * food photo that can turn into the interactive 3D dumpling.
 *
 * The title only rises, it never fades, so it counts as painted immediately
 * (good for LCP). The rest of the copy fades up as it enters the view.
 */
export default function Hero() {
  const { t } = useTranslation();
  const copy = useBusinessCopy();

  return (
    <section className="relative overflow-hidden bg-sunny text-ink-900">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pb-28 lg:gap-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="text-center md:text-left">
          <Reveal distance={40}>
            <Eyebrow rule>{t('pages.home.kicker', copy)}</Eyebrow>
          </Reveal>

          {/* Stays opaque so the title can paint immediately. It only rises. */}
          <m.h1
            className="mt-5 font-display"
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
          >
            <span className="block pb-1 text-[clamp(3.75rem,15.5vw,8rem)] font-extrabold leading-[1.05] text-primary-600">
              မေဓါဝီ
            </span>
            <span className="mt-1 block text-[clamp(1.6rem,6.2vw,3.1rem)] font-bold leading-tight text-ink-950">
              ဖက်ထုပ်အိုးကပ်
            </span>
          </m.h1>

          <Reveal distance={40} className="mt-4">
            <p className="font-display text-lg font-medium italic leading-relaxed text-secondary-800 sm:text-xl">
              {t('brand.english')}
            </p>

            <div aria-hidden="true" className="gold-rule mx-auto mt-6 w-40 md:mx-0" />

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-loose text-ink-700 sm:text-lg md:mx-0">
              {t('pages.home.sub')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <Button as="a" href={telHref(PRIMARY_PHONE)} magnetic>
                <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                {t('pages.home.orderByPhone')}
                <span className="tabular-nums text-primary-100">· {PRIMARY_PHONE.display}</span>
              </Button>
              <Button as={Link} to="/menu" variant="secondary" className="group" magnetic>
                {t('pages.home.viewMenu')}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </Reveal>

          <div className="mt-3 flex gap-3 sm:justify-center md:justify-start">
            <PartnerLink href={BUSINESS.links.grab} label={t('order.grab')} logoSrc={GRAB_LOGO_SRC} ring="ring-partner-grab/60" />
            <PartnerLink
              href={BUSINESS.links.foodpanda}
              label={t('order.foodpanda')}
              logoSrc={FOODPANDA_LOGO_SRC}
              ring="ring-partner-foodpanda/50"
            />
          </div>

          <OpenStatusBadge className="mt-6" />
        </div>

        {/* Moves but never fades: the photo is likely the largest paint on wide screens. */}
        <div className="animate-rise-still [animation-delay:120ms]">
          <HeroShowcase />
        </div>
      </div>
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-butter-400 to-transparent" />
    </section>
  );
}
