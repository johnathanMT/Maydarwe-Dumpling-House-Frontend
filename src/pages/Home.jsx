import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useCartActions } from '../context/CartContext';
import { useUiActions } from '../context/UiContext';
import { useLang } from '../lib/businessHours';
import { usePageMeta } from '../lib/seo';
import { useAddedFlash } from '../hooks/useAddedFlash';
import Hero from '../components/hero/Hero';
import DishCard from '../components/menu/DishCard';
import Eyebrow from '../components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { CATEGORIES, FEATURED_ITEMS, pickLocale } from '../data/menu';

export default function Home() {
  const { t } = useTranslation();
  const { addItem } = useCartActions();
  const { openOrder } = useUiActions();
  const language = useLang();
  const [addedId, onAdd] = useAddedFlash(addItem);
  usePageMeta('home', { path: '/' });

  return (
    <div className="bg-brand-pearl">
      <Hero />

      {/* House favourites */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow rule>{t('pages.home.featuredKicker')}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl lg:text-5xl">
              {t('pages.home.featuredTitle')}
            </h2>
          </div>
          <Link
            to="/menu"
            className="group inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            {t('pages.home.featuredCta')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURED_ITEMS.map((item) => (
            <RevealItem key={item.id}>
              <DishCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Three ways to eat — dark lacquer band */}
      <section className="bg-lacquer text-brand-pearl">
        <div aria-hidden="true" className="gold-rule" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <Reveal>
            <Eyebrow tone="dark" rule>
              {t('pages.home.pillarsKicker')}
            </Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">{t('pages.home.pillarsTitle')}</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
            {CATEGORIES.map(({ id, icon: Icon, title, caption }) => (
              <RevealItem
                key={id}
                className="group rounded-[1.75rem] bg-white/[0.03] p-6 ring-1 ring-inset ring-secondary-400/20 transition-colors duration-300 hover:bg-white/[0.06] hover:ring-secondary-400/40 lg:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary-400/10 text-secondary-300 ring-1 ring-secondary-400/40">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{pickLocale(title, language)}</h3>
                <p className="mt-2 text-brand-pearl/70">{pickLocale(caption, language)}</p>
                <Link
                  to="/menu"
                  className="mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-secondary-300 hover:text-secondary-200"
                >
                  {t('pages.home.featuredCta')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <div aria-hidden="true" className="gold-rule" />
      </section>

      {/* Visit / order */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-6 py-10 text-white shadow-lift sm:px-10 md:flex md:items-center md:justify-between md:gap-8 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary-400/20 blur-3xl"
          />
          <div className="relative">
            <Eyebrow className="!text-secondary-200">{t('pages.home.visitKicker')}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t('pages.home.visitTitle')}</h2>
            <p className="mt-3 max-w-xl text-primary-50/90">{t('pages.home.visitSub')}</p>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            <button
              type="button"
              onClick={openOrder}
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-primary-700 transition-colors hover:bg-secondary-50"
            >
              {t('nav.order')}
            </button>
            <Link
              to="/menu"
              className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10"
            >
              {t('pages.home.viewMenu')}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
