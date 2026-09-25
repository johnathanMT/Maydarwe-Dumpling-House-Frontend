import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Hero from '../components/hero/Hero';
import DishPhoto from '../components/menu/DishPhoto';
import { CATEGORIES, FEATURED_ITEMS, formatPrice, pickLocale } from '../data/menu';

function FeaturedCard({ item, language, onAdd }) {
  const { t } = useTranslation();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-secondary-400/25 bg-white shadow-[0_18px_40px_-28px_rgb(34_30_27_/_0.45)] transition duration-300 hover:-translate-y-1 hover:border-brand-yellow hover:shadow-[0_24px_50px_-24px_rgb(34_30_27_/_0.5)]">
      <div className="relative">
        <DishPhoto item={item} alt={pickLocale(item.name, language)} />
        <span className="absolute left-4 top-4 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-ink-950 shadow-sm">
          {formatPrice(item.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="font-display text-xl font-semibold text-ink-900">{pickLocale(item.name, language)}</h3>
        <p className="mt-1 text-sm text-ink-500">{language === 'my' ? item.name.en : item.name.my}</p>
        <p className="mt-3 flex-1 text-sm text-ink-600">{pickLocale(item.blurb, language)}</p>
        <button
          type="button"
          onClick={() => onAdd(item)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
          {t('pages.menu.addToCart')}
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const language = i18n.resolvedLanguage === 'my' ? 'my' : 'en';

  return (
    <div className="bg-brand-pearl">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-secondary-700">{t('pages.home.featuredKicker')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              {t('pages.home.featuredTitle')}
            </h2>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
            {t('pages.home.featuredCta')}
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_ITEMS.map((item) => (
            <li key={item.id}>
              <FeaturedCard item={item} language={language} onAdd={addItem} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-secondary-400/20 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase text-secondary-700">{t('pages.home.pillarsKicker')}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            {t('pages.home.pillarsTitle')}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CATEGORIES.map(({ id, icon: Icon, title, caption }) => (
              <li key={id} className="rounded-3xl border border-secondary-400/25 bg-brand-pearl p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-yellow text-ink-950">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink-900">
                  {pickLocale(title, language)}
                </h3>
                <p className="mt-2 text-ink-600">{pickLocale(caption, language)}</p>
                <Link
                  to="/menu"
                  className="mt-5 inline-block text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                  {t('pages.home.featuredCta')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2rem] bg-primary-600 px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-secondary-200">{t('pages.home.visitKicker')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{t('pages.home.visitTitle')}</h2>
            <p className="mt-3 max-w-xl text-primary-50">{t('pages.home.visitSub')}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link
              to="/menu"
              className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-secondary-50"
            >
              {t('pages.home.viewMenu')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
