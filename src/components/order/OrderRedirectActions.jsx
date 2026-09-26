import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { BUSINESS, messengerOrderHref } from '../../constants/site';
import { FOODPANDA_LOGO_SRC, GRAB_LOGO_SRC } from '../../constants/partnerLogos';
import { useCart } from '../../context/useCart';
import { useLang } from '../../lib/businessHours';
import { formatOrderItems } from '../../lib/orderMessage';
import Button from '../ui/Button';

/** @import { CartLine, Language } from '../../types' */

/**
 * Pre-filled Messenger message for the current cart (a short greeting when it is empty).
 * @param {import('i18next').TFunction} t
 * @param {CartLine[]} lines
 * @param {Language} language
 * @returns {string}
 */
function messengerText(t, lines, language) {
  const items = formatOrderItems(lines, language);
  return items ? t('cart.messengerBody', { items }) : t('cart.messengerEmpty');
}

/**
 * Messenger (pre-filled cart text) plus Grab / foodpanda — shared by the
 * cart drawer and the header Order sheet so both stay identical.
 * @param {object} props
 * @param {string} [props.className]
 */
export default function OrderRedirectActions({ className = '' }) {
  const { t } = useTranslation();
  const language = useLang();
  const { lines } = useCart();
  const messengerHref = messengerOrderHref(messengerText(t, lines, language));

  return (
    <div className={className}>
      <p className="text-sm text-ink-500">{t('cart.note')}</p>
      <Button
        as="a"
        href={messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        block
        magnetic
        className="mt-4"
        aria-label={`${t('cart.messenger')} (${t('order.newTab')})`}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        {t('cart.messenger')}
      </Button>
      <p className="mt-5 text-xs font-medium tracking-wide text-ink-500">{t('cart.orderViaApps')}</p>
      <a
        href={BUSINESS.links.grab}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink-800 shadow-sm ring-2 ring-inset ring-partner-grab/60 transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift"
      >
        <img src={GRAB_LOGO_SRC} alt="" className="h-[18px] w-auto" loading="lazy" decoding="async" />
        {t('cart.grab')}
        <span className="sr-only">({t('order.newTab')})</span>
      </a>
      <a
        href={BUSINESS.links.foodpanda}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink-800 shadow-sm ring-2 ring-inset ring-partner-foodpanda/50 transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift"
      >
        <img src={FOODPANDA_LOGO_SRC} alt="" className="h-[18px] w-auto" loading="lazy" decoding="async" />
        {t('cart.foodpanda')}
        <span className="sr-only">({t('order.newTab')})</span>
      </a>
    </div>
  );
}
