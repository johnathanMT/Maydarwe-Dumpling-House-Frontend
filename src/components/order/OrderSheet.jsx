import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Phone } from 'lucide-react';
import Sheet, { SheetCloseButton } from '../ui/Sheet';
import OpenStatusBadge from '../ui/OpenStatusBadge';
import { useUiActions, useUiState } from '../../context/UiContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/menu';
import {
  BUSINESS,
  FOODPANDA_LOGO_SRC,
  GRAB_LOGO_SRC,
  PRIMARY_PHONE,
  telHref,
} from '../../constants/site';

function FacebookMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 22v-8.2h2.76l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56H16.8V4.14A21.3 21.3 0 0 0 14.16 4C11.6 4 9.86 5.56 9.86 8.23v2.37H7.2v3.2h2.66V22h3.64Z" />
    </svg>
  );
}

function PartnerLink({ href, label, logoSrc, logoAlt, accent }) {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex min-h-14 items-center justify-between gap-3 rounded-2xl border-2 bg-white px-4 py-3 transition-colors ${accent}`}
    >
      <span className="flex items-center gap-3">
        <img src={logoSrc} alt={logoAlt} className="h-5 w-auto" loading="lazy" decoding="async" />
        <span className="text-sm font-semibold text-ink-800">{label}</span>
        <span className="sr-only">({t('order.newTab')})</span>
      </span>
      <ChevronRight className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/**
 * The one place every "Order" button leads to: phone, Grab, foodpanda
 * (and Facebook as a quieter fallback). Opened from the navbar, the hero,
 * the cart and the page CTAs via useUiActions().openOrder().
 */
export default function OrderSheet() {
  const { t } = useTranslation();
  const { isOrderOpen } = useUiState();
  const { closePanel } = useUiActions();
  const { count, subtotal } = useCart();
  const titleId = useId();
  const callRef = useRef(null);
  const otherPhones = BUSINESS.phones.slice(1);

  return (
    <Sheet
      open={isOrderOpen}
      onClose={closePanel}
      labelledBy={titleId}
      variant="sheet"
      initialFocusRef={callRef}
    >
      <div aria-hidden="true" className="h-1.5 shrink-0 bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500" />
      <div aria-hidden="true" className="mx-auto mt-2 h-1 w-10 rounded-full bg-ink-200 sm:hidden" />

      <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-3 sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-700">{t('order.kicker')}</p>
          <h2 id={titleId} className="mt-1 font-display text-2xl font-semibold text-ink-900">
            {t('order.title')}
          </h2>
          <OpenStatusBadge className="mt-2" />
        </div>
        <SheetCloseButton onClick={closePanel} />
      </div>

      <div className="space-y-5 overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-6">
        <div>
          <a
            ref={callRef}
            href={telHref(PRIMARY_PHONE)}
            className="flex items-center gap-4 rounded-2xl bg-primary-600 px-4 py-4 text-white shadow-[0_14px_30px_-18px_rgb(200_16_46_/_0.9)] transition-colors hover:bg-primary-700"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Phone className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-primary-50">{t('order.callTitle')}</span>
              <span className="block font-display text-xl font-semibold tabular-nums">{PRIMARY_PHONE.display}</span>
              <span className="block text-xs text-primary-100">{t('order.callSub')}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-primary-100" />
          </a>
          {otherPhones.map((phone) => (
            <a
              key={phone.e164}
              href={telHref(phone)}
              className="mt-2 inline-flex min-h-12 items-center px-1 text-sm font-medium text-ink-600 underline-offset-4 hover:text-primary-700 hover:underline"
            >
              {t('order.altPhone', { phone: phone.display })}
            </a>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{t('order.deliveryTitle')}</p>
          <div className="mt-2 space-y-2.5">
            <PartnerLink
              href={BUSINESS.links.grab}
              label={t('order.grab')}
              logoSrc={GRAB_LOGO_SRC}
              logoAlt="Grab"
              accent="border-[#00B14F]/60 hover:border-[#00B14F] hover:bg-green-50"
            />
            <PartnerLink
              href={BUSINESS.links.foodpanda}
              label={t('order.foodpanda')}
              logoSrc={FOODPANDA_LOGO_SRC}
              logoAlt="foodpanda"
              accent="border-[#D70F64]/50 hover:border-[#D70F64] hover:bg-pink-50"
            />
          </div>
        </div>

        <a
          href={BUSINESS.links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 px-1 text-sm font-semibold text-[#1877F2] underline-offset-4 hover:underline"
        >
          <FacebookMark className="h-4 w-4" />
          {t('order.facebook')}
          <span className="sr-only">({t('order.newTab')})</span>
        </a>

        {count > 0 ? (
          <p className="rounded-2xl bg-brand-pearl px-4 py-3 text-sm text-ink-700 ring-1 ring-secondary-400/30">
            {t('nav.cartCount', { count })} · <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </p>
        ) : null}
      </div>
    </Sheet>
  );
}
