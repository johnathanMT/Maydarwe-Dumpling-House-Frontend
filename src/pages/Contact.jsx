import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Phone } from 'lucide-react';
import { CONTACT_PHONES } from '../constants/site';

export default function Contact() {
  const { t } = useTranslation();
  const primaryPhone = CONTACT_PHONES[0];

  return (
    <div className="bg-white">
      <section className="border-b border-secondary-400/25 bg-[linear-gradient(180deg,#fff8e8_0%,#ffffff_72%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase text-secondary-700">{t('pages.contact.kicker')}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl lg:text-6xl">
            {t('pages.contact.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{t('pages.contact.sub')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-ink-100 bg-white p-6 shadow-[0_18px_40px_-28px_rgb(34_30_27_/_0.45)] lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.phonesTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {CONTACT_PHONES.map(({ display, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-ink-100 px-5 py-4 text-ink-900 transition-colors hover:border-secondary-400 hover:bg-secondary-50"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-50 text-primary-700">
                        <Phone className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="font-display text-xl font-semibold tabular-nums">{display}</span>
                    </span>
                    <span className="text-sm font-semibold text-primary-700">{t('pages.home.call')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-ink-100 bg-white p-6">
            <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.hoursTitle')}</h2>
            <p className="mt-4 inline-flex items-start gap-3 text-ink-700">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary-700" strokeWidth={1.75} />
              <span>{t('footer.hoursValue')}</span>
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold text-ink-900">{t('pages.contact.cityTitle')}</h3>
            <p className="mt-3 inline-flex items-start gap-3 text-ink-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary-700" strokeWidth={1.75} />
              <span>
                <span className="block font-semibold text-ink-900">{t('pages.contact.city')}</span>
                <span className="mt-1 block text-sm text-ink-600">{t('pages.contact.cityNote')}</span>
              </span>
            </p>
          </article>
        </div>

        <article className="mt-6 rounded-3xl border border-ink-100 bg-ink-50/70 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900">{t('pages.contact.orderTitle')}</h2>
          <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {['pages.contact.order1', 'pages.contact.order2', 'pages.contact.order3'].map((key, index) => (
              <li key={key} className="rounded-2xl bg-white p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 text-ink-700">{t(key)}</p>
              </li>
            ))}
          </ol>
        </article>

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-primary-600 px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold">{t('brand.official')}</p>
            <p className="mt-2 text-primary-50">{t('pages.contact.sub')}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link
              to="/menu"
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-secondary-50"
            >
              {t('pages.home.viewMenu')}
            </Link>
            <a
              href={primaryPhone.href}
              className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              {t('pages.home.orderNow')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
