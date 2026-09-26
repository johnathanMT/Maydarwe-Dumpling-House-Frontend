import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Flame, Hand, Soup } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import PageHeader from '../components/ui/PageHeader';
import Eyebrow from '../components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { BRAND_LOGO_SRC } from '../constants/site';
import { usePageMeta } from '../lib/seo';

const VALUES = [
  { icon: Hand, titleKey: 'pages.about.value1Title', bodyKey: 'pages.about.value1Body' },
  { icon: Soup, titleKey: 'pages.about.value2Title', bodyKey: 'pages.about.value2Body' },
  { icon: Flame, titleKey: 'pages.about.value3Title', bodyKey: 'pages.about.value3Body' },
];

export default function About() {
  const { t } = useTranslation();
  usePageMeta('about', { path: '/about' });

  return (
    <div className="bg-brand-pearl">
      <PageHeader kicker={t('pages.about.kicker')} title={t('pages.about.title')} subtitle={t('pages.about.lead')}>
        <p className="mt-6 font-display text-xl font-semibold text-secondary-200 sm:text-2xl">{t('brand.official')}</p>
        <p className="mt-1 font-display text-lg italic text-brand-pearl/70">{t('brand.english')}</p>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-10 md:py-20 lg:gap-20 lg:px-8 lg:py-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-secondary-200 via-secondary-600 to-secondary-900 p-[2px] shadow-gold">
            <OptimizedImage
              src="/IMG_7928.JPG"
              alt={t('pages.home.heroPhotoAlt')}
              width={1080}
              height={1145}
              pictureClassName="block"
              className="aspect-[4/5] w-full rounded-[calc(2.5rem-2px)] object-cover"
            />
          </div>
          <img
            src={BRAND_LOGO_SRC}
            alt=""
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="absolute -bottom-6 -left-4 h-24 w-24 rounded-3xl object-cover shadow-lift ring-4 ring-brand-pearl sm:h-28 sm:w-28"
          />
        </Reveal>

        <Reveal>
          <Eyebrow rule>{t('pages.about.kicker')}</Eyebrow>
          <p className="mt-5 font-display text-2xl leading-relaxed text-ink-900 sm:text-[1.7rem]">{t('pages.about.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary-600 px-6 font-semibold text-white shadow-cta transition-colors hover:bg-primary-700"
            >
              {t('pages.home.viewMenu')}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 transition-colors hover:ring-secondary-400"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-secondary-400/20 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {VALUES.map(({ icon: Icon, titleKey, bodyKey }) => (
              <RevealItem key={titleKey} className="rounded-[1.75rem] bg-brand-pearl p-6 ring-1 ring-inset ring-secondary-400/20 lg:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-lacquer text-secondary-300 ring-1 ring-secondary-400/40">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink-900">{t(titleKey)}</h2>
                <p className="mt-2 leading-relaxed text-ink-600">{t(bodyKey)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
