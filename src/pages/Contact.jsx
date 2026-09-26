import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import CtaBanner from '../components/ui/CtaBanner';
import OpenStatusBadge from '../components/ui/OpenStatusBadge';
import PageHeader from '../components/ui/PageHeader';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { useUiActions } from '../context/UiContext';
import {
  BUSINESS,
  hasAddress,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  telHref,
} from '../constants/site';
import { useBusinessCopy, useLang } from '../lib/businessHours';
import { usePageMeta } from '../lib/seo';

/**
 * Click-to-load map. The Google Maps iframe (~500 KB and third-party
 * cookies) is only requested when the visitor asks for it.
 */
function MapEmbed({ title }) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-3xl border border-ink-100 bg-ink-50 sm:aspect-[16/7]">
      {loaded ? (
        <iframe
          title={title}
          src={mapsEmbedUrl()}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_30%,rgb(232_160_6_/_0.14),transparent_45%),radial-gradient(circle_at_75%_70%,rgb(200_16_46_/_0.1),transparent_45%)] p-6 text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-primary-700 shadow-sm ring-1 ring-ink-100">
              <MapPin className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <Button variant="dark" className="mt-4" onClick={() => setLoaded(true)}>
              {t('pages.contact.mapShow')}
            </Button>
            <p className="mt-2 text-xs text-ink-500">{t('pages.contact.mapNote')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const lang = useLang();
  const copy = useBusinessCopy();
  const { openOrder } = useUiActions();
  const addressKnown = hasAddress();
  const address = BUSINESS.address[lang] || BUSINESS.address.en;
  usePageMeta('contact', { path: '/contact' });

  return (
    <div className="bg-ivory">
      <PageHeader kicker={t('pages.contact.kicker')} title={t('pages.contact.title')} subtitle={t('pages.contact.sub')} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <RevealGroup as="div" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RevealItem as="article" className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-ink-900/5 md:col-span-2 lg:col-span-1">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.phonesTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {BUSINESS.phones.map((phone) => (
                <li key={phone.e164}>
                  <a
                    href={telHref(phone)}
                    className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-ink-900 ring-1 ring-inset ring-ink-100 transition-colors hover:bg-secondary-50 hover:ring-secondary-400"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-50 text-primary-700">
                        <Phone className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="font-display text-xl font-semibold tabular-nums">{phone.display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem as="article" className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-ink-900/5">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.hoursTitle')}</h2>
            <p className="mt-4 inline-flex items-start gap-3 text-ink-700">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary-700" strokeWidth={1.75} />
              <span>{t('hours.daily', copy)}</span>
            </p>
            <OpenStatusBadge className="mt-4" />
          </RevealItem>

          <RevealItem as="article" className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-ink-900/5">
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              {addressKnown ? t('pages.contact.addressTitle') : t('pages.contact.cityTitle')}
            </h2>
            <p className="mt-4 inline-flex items-start gap-3 text-ink-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary-700" strokeWidth={1.75} />
              <span>
                <span className="block font-semibold text-ink-900">
                  {addressKnown ? address : copy.city}
                </span>
                <span className="mt-1 block text-sm text-ink-600">{t('pages.contact.cityNote')}</span>
              </span>
            </p>
            {addressKnown ? (
              <Button
                as="a"
                href={mapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="mt-5"
              >
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {t('pages.contact.directions')}
                <span className="sr-only">({t('order.newTab')})</span>
              </Button>
            ) : null}
          </RevealItem>
        </RevealGroup>

        {addressKnown ? <MapEmbed title={t('pages.contact.mapTitle', { name: BUSINESS.name[lang] })} /> : null}

        <Reveal as="article" className="mt-6 rounded-[1.75rem] bg-white p-6 ring-1 ring-inset ring-secondary-400/20 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.orderTitle')}</h2>
          <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {['pages.contact.order1', 'pages.contact.order2', 'pages.contact.order3'].map((key, index) => (
              <li key={key} className="rounded-2xl bg-butter-50 p-5 ring-1 ring-inset ring-butter-200">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-600 font-display text-sm font-semibold text-white ring-4 ring-primary-100">
                  {index + 1}
                </span>
                <p className="mt-3 leading-relaxed text-ink-700">{t(key)}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <CtaBanner className="mt-10" title={t('brand.official')} body={t('pages.contact.sub')}>
          <Button variant="light" onClick={openOrder} magnetic>
            {t('nav.order')}
          </Button>
          <Button as={Link} to="/menu" variant="ghostLight" magnetic>
            {t('pages.home.viewMenu')}
          </Button>
        </CtaBanner>
      </section>
    </div>
  );
}
