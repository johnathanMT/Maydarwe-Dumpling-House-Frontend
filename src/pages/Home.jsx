import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartActions } from '../context/CartContext';
import { useUiActions } from '../context/UiContext';
import { useLang } from '../lib/businessHours';
import { usePageMeta } from '../lib/seo';
import { useAddedFlash } from '../hooks/useAddedFlash';
import Hero from '../components/hero/Hero';
import HomeReel from '../components/hero/HomeReel';
import DishCard from '../components/menu/DishCard';
import { CATEGORY_ICONS } from '../components/menu/categoryIcons';
import ArrowLink from '../components/ui/ArrowLink';
import Button from '../components/ui/Button';
import CtaBanner from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import { CATEGORIES, FEATURED_ITEMS, pickLocale } from '../data/menu';
import { FEATURED_SECTION_PHOTO } from '../assets/photos/remote';

export default function Home() {
  const { t } = useTranslation();
  const { addItem } = useCartActions();
  const { openOrder } = useUiActions();
  const language = useLang();
  const [addedId, onAdd] = useAddedFlash(addItem);
  usePageMeta('home', { path: '/' });

  return (
    <div className="bg-ivory">
      <Hero />

      <HomeReel />

      {/* House favourites — photo band */}
      <section className="parallax-band relative isolate overflow-hidden py-20 text-ivory md:py-32">
        <div
          aria-hidden="true"
          className="parallax-layer z-0"
          style={{ backgroundImage: `url('${FEATURED_SECTION_PHOTO}')` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-primary-950/85 via-ink-950/72 to-ink-950/92"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="dark"
            eyebrow={t('pages.home.featuredKicker')}
            title={t('pages.home.featuredTitle')}
            action={
              <ArrowLink to="/menu" tone="dark">
                {t('pages.home.featuredCta')}
              </ArrowLink>
            }
          />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {FEATURED_ITEMS.map((item) => (
              <RevealItem
                key={item.id}
                className="h-full [&_article]:bg-white/80 [&_article]:shadow-lift [&_article]:ring-white/55 [&_article]:backdrop-blur-md"
              >
                <DishCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Three ways to eat — butter-yellow band */}
      <section className="bg-sunny">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
          <SectionHeading eyebrow={t('pages.home.pillarsKicker')} title={t('pages.home.pillarsTitle')} />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16 lg:gap-8">
            {CATEGORIES.map(({ id, title, caption }) => {
              const Icon = CATEGORY_ICONS[id];
              const cardTitle = id === 'dumplings' ? t('pages.home.pillarDumplingsTitle') : pickLocale(title, language);
              const cardCaption = id === 'dumplings' ? t('pages.home.pillarDumplingsCaption') : pickLocale(caption, language);
              return (
                <RevealItem
                  key={id}
                  distance={40}
                  className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-butter-200 transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift lg:p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-butter text-ink-950 ring-4 ring-butter-100">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink-950">{cardTitle}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{cardCaption}</p>
                  <ArrowLink to="/menu" className="mt-5">
                    {t('pages.home.featuredCta')}
                  </ArrowLink>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Visit / order */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
        <CtaBanner
          title={t('pages.home.visitTitle')}
          body={t('pages.home.visitSub')}
        >
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
