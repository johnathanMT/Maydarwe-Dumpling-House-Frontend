import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Phone } from 'lucide-react';
import {
  BUSINESS,
  FOODPANDA_LOGO_SRC,
  GRAB_LOGO_SRC,
  PRIMARY_PHONE,
  telHref,
} from '../../constants/site';
import { useBusinessCopy } from '../../lib/businessHours';
import Eyebrow from '../ui/Eyebrow';
import OpenStatusBadge from '../ui/OpenStatusBadge';
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
      className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-brand-pearl px-5 ring-2 ring-inset transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift sm:flex-none ${ring}`}
    >
      <PartnerLabel logoSrc={logoSrc} />
    </a>
  );
}

/**
 * Home hero on dark lacquer: the brand in gold foil, the story in one
 * paragraph, one primary action (call), the delivery apps, and a real
 * food photo that can turn into the interactive 3D dumpling.
 *
 * The entrance is pure CSS (animate-rise) so it starts with the first
 * paint and never waits for JavaScript. The title only moves, it never
 * fades, so it counts as painted immediately (good for LCP).
 */
export default function Hero() {
  const { t } = useTranslation();
  const copy = useBusinessCopy();

  return (
    <section className="relative overflow-hidden bg-lacquer text-brand-pearl">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pb-20 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="text-center md:text-left">
          <div className="animate-rise">
            <Eyebrow tone="dark" rule>
              {t('pages.home.kicker', copy)}
            </Eyebrow>
          </div>

          <h1 className="mt-5 animate-rise-still font-display [animation-delay:60ms]">
            <span className="text-gold-foil block pb-1 text-[clamp(3.25rem,13vw,6.75rem)] font-extrabold leading-[1.05]">
              မေဓာဝီ
            </span>
            <span className="mt-1 block text-[clamp(1.6rem,6.2vw,3.1rem)] font-bold leading-tight text-brand-pearl">
              ဖက်ထုပ်အိုးကပ်
            </span>
          </h1>

          <p className="mt-4 animate-rise font-display text-lg font-medium italic text-secondary-200/90 [animation-delay:120ms] sm:text-xl">
            {t('brand.english')}
          </p>

          <div aria-hidden="true" className="gold-rule mx-auto mt-6 w-40 animate-rise [animation-delay:160ms] md:mx-0" />

          <p className="mx-auto mt-6 max-w-xl animate-rise text-pretty text-base leading-relaxed text-brand-pearl/80 [animation-delay:200ms] sm:text-lg md:mx-0">
            {t('pages.home.sub')}
          </p>

          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:260ms] sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            <a
              href={telHref(PRIMARY_PHONE)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-6 font-semibold text-white shadow-cta transition-[transform,background-color] duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-primary-700"
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} />
              {t('pages.home.orderByPhone')}
              <span className="tabular-nums text-primary-100">· {PRIMARY_PHONE.display}</span>
            </a>
            <Link
              to="/menu"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-secondary-200 ring-1 ring-inset ring-secondary-400/50 transition-colors hover:bg-secondary-400/10 hover:text-secondary-100"
            >
              {t('pages.home.viewMenu')}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-3 flex animate-rise gap-3 [animation-delay:320ms] sm:justify-center md:justify-start">
            <PartnerLink href={BUSINESS.links.grab} label={t('order.grab')} logoSrc={GRAB_LOGO_SRC} ring="ring-partner-grab/60" />
            <PartnerLink
              href={BUSINESS.links.foodpanda}
              label={t('order.foodpanda')}
              logoSrc={FOODPANDA_LOGO_SRC}
              ring="ring-partner-foodpanda/50"
            />
          </div>

          <OpenStatusBadge tone="dark" className="mt-6 animate-rise [animation-delay:380ms]" />
        </div>

        {/* Moves but never fades: the photo is likely the largest paint on wide screens. */}
        <div className="animate-rise-still [animation-delay:120ms]">
          <HeroShowcase />
        </div>
      </div>
      <div aria-hidden="true" className="gold-rule" />
    </section>
  );
}
