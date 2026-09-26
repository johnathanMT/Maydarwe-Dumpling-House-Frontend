import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { MAPS_URL, mapsEmbedUrl } from '../../constants/site';

/**
 * The shop pin, shown in full so a visitor can see the street before they leave.
 * The Google Maps frame is sandboxed: it may run its own scripts and open
 * links in a new tab, but can never navigate or script this page.
 * @param {{ title: string, address: string }} props
 */
export default function ShopMap({ title, address }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-ink-900/5">
      <div className="flex flex-col gap-4 border-b border-butter-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.addressTitle')}</h2>
          <p className="mt-1 flex items-start gap-2 text-sm leading-relaxed text-ink-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600" strokeWidth={2} aria-hidden="true" />
            <span>{address}</span>
          </p>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-800 underline decoration-secondary-400 underline-offset-[6px] transition-colors duration-200 hover:text-primary-600 hover:decoration-secondary-500"
        >
          {t('pages.contact.viewOnMaps')}
          <span className="sr-only">({t('order.newTab')})</span>
        </a>
      </div>
      <iframe
        title={title}
        src={mapsEmbedUrl()}
        className="h-80 w-full border-0 sm:h-[28rem]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        allowFullScreen
      />
    </div>
  );
}
