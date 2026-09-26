import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Flame, Hand, Soup } from 'lucide-react';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';
import PageHeader from '../components/ui/PageHeader';
import Eyebrow from '../components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { HERO_PHOTO } from '../assets/photos';
import { LOGO } from '../assets/brand';
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
    <div className="bg-ivory">
      <PageHeader kicker={t('pages.about.kicker')} title={t('pages.about.title')} subtitle={t('pages.about.lead')}>
        <p className="mt-6 font-display text-xl font-semibold text-primary-600 sm:text-2xl">{t('brand.official')}</p>
        <p className="mt-1 font-display text-lg italic text-secondary-800">{t('brand.english')}</p>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-10 md:py-20 lg:gap-20 lg:px-8 lg:py-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="rounded-[2.5rem] bg-white p-2 shadow-warm ring-1 ring-butter-400/60">
            <OptimizedImage
              image={HERO_PHOTO}
              alt={t('pages.home.heroPhotoAlt')}
              sizes="(min-width: 768px) 448px, 92vw"
              pictureClassName="block"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4">
            <OptimizedImage
              image={LOGO}
              alt=""
              sizes="(min-width: 640px) 112px, 96px"
              className="h-24 w-24 rounded-3xl object-cover shadow-lift ring-4 ring-ivory sm:h-28 sm:w-28"
            />
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow rule>{t('pages.about.kicker')}</Eyebrow>
          <p className="mt-5 font-display text-2xl leading-relaxed text-ink-900 sm:text-[1.7rem]">{t('pages.about.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/menu" className="group">
              {t('pages.home.viewMenu')}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button as={Link} to="/contact" variant="outline">
              {t('nav.contact')}
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-butter-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {VALUES.map(({ icon: Icon, titleKey, bodyKey }) => (
              <RevealItem key={titleKey} className="rounded-[1.75rem] bg-butter-50 p-6 ring-1 ring-inset ring-butter-200 lg:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-600 text-white ring-4 ring-primary-100">
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
