import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flame, Hand, Soup } from 'lucide-react';
import BrandLogo from '../components/ui/BrandLogo';
import OptimizedImage from '../components/ui/OptimizedImage';

const VALUES = [
  { icon: Hand, titleKey: 'pages.about.value1Title', bodyKey: 'pages.about.value1Body' },
  { icon: Soup, titleKey: 'pages.about.value2Title', bodyKey: 'pages.about.value2Body' },
  { icon: Flame, titleKey: 'pages.about.value3Title', bodyKey: 'pages.about.value3Body' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <section className="border-b border-secondary-400/25 bg-[linear-gradient(180deg,#fff8e8_0%,#ffffff_72%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase text-secondary-700">{t('pages.about.kicker')}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl lg:text-6xl">
            {t('pages.about.title')}
          </h1>
          <p className="mt-3 font-display text-xl font-semibold text-primary-600 sm:text-2xl">
            {t('brand.official')}
          </p>
          <p className="mt-1 text-lg text-secondary-700">{t('brand.english')}</p>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{t('pages.about.lead')}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-ink-50 p-8 sm:p-10">
            <BrandLogo size="footer" />
            <OptimizedImage
              src="/IMG_7928.JPG"
              alt={t('pages.menu.dumplings')}
              width={800}
              height={600}
              className="mt-8 h-64 w-full rounded-3xl object-cover sm:h-80"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink-700">{t('pages.about.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="inline-flex min-h-12 items-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 sm:text-base"
            >
              {t('pages.home.viewMenu')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-secondary-500 bg-white px-6 py-3 text-sm font-semibold text-secondary-800 hover:bg-secondary-50 sm:text-base"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, titleKey, bodyKey }) => (
              <li key={titleKey} className="rounded-3xl border border-ink-100 bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900">{t(titleKey)}</h2>
                <p className="mt-2 text-ink-600">{t(bodyKey)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
