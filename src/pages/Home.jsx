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

      {/* House favourites */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={t('pages.home.featuredKicker')}
          title={t('pages.home.featuredTitle')}
          action={<ArrowLink to="/menu">{t('pages.home.featuredCta')}</ArrowLink>}
        />
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURED_ITEMS.map((item) => (
            <RevealItem key={item.id}>
              <DishCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Three ways to eat — butter-yellow band */}
      <section className="bg-sunny">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <SectionHeading eyebrow={t('pages.home.pillarsKicker')} title={t('pages.home.pillarsTitle')} />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
            {CATEGORIES.map(({ id, title, caption }) => {
              const Icon = CATEGORY_ICONS[id];
              return (
                <RevealItem
                  key={id}
                  className="rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-butter-200 transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift lg:p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-butter text-ink-950 ring-4 ring-butter-100">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink-950">{pickLocale(title, language)}</h3>
                  <p className="mt-2 text-ink-600">{pickLocale(caption, language)}</p>
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <CtaBanner
          eyebrow={t('pages.home.visitKicker')}
          title={t('pages.home.visitTitle')}
          body={t('pages.home.visitSub')}
        >
          <Button variant="light" onClick={openOrder}>
            {t('nav.order')}
          </Button>
          <Button as={Link} to="/menu" variant="ghostLight">
            {t('pages.home.viewMenu')}
          </Button>
        </CtaBanner>
      </section>
    </div>
  );
}
