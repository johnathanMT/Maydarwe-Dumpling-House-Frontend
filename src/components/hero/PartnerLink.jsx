import { useTranslation } from 'react-i18next';

/** "Order on [logo]" in English, "[logo] မှ မှာယူရန်" in Burmese. The link carries the full aria-label. */
/** @param {{ logoSrc: string }} props */
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

/**
 * Pill link to a delivery partner (Grab, foodpanda); opens in a new tab.
 * @param {object} props
 * @param {string} props.href
 * @param {string} props.label Full accessible name, e.g. "Order on Grab".
 * @param {string} props.logoSrc
 * @param {string} props.ring Tailwind ring colour class in the partner's colour.
 */
export default function PartnerLink({ href, label, logoSrc, ring }) {
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
