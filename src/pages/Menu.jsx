import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import DishPhoto from '../components/menu/DishPhoto';
import { CATEGORIES, MENU_ITEMS, formatPrice, pickLocale } from '../data/menu';

const FILTERS = [
  { id: 'all', labelKey: 'pages.menu.all' },
  { id: 'dumplings', labelKey: 'pages.menu.dumplings' },
  { id: 'mala', labelKey: 'pages.menu.mala' },
  { id: 'noodles', labelKey: 'pages.menu.noodles' },
];

function MenuCard({ item, language, added, onAdd }) {
  const { t } = useTranslation();
  const available = item.inStock;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-[0_18px_40px_-28px_rgb(34_30_27_/_0.45)] transition duration-300 ${
        available
          ? 'border-ink-100 hover:-translate-y-1 hover:border-secondary-300/70 hover:shadow-[0_24px_50px_-24px_rgb(34_30_27_/_0.5)]'
          : 'border-ink-100 opacity-80'
      }`}
    >
      <div className="relative">
        <DishPhoto item={item} alt={pickLocale(item.name, language)} />
        {!available ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-300 ring-1 ring-secondary-400/40">
            {t('pages.menu.outOfStock')}
          </span>
        ) : (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
            {formatPrice(item.price)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="font-display text-xl font-semibold text-ink-900">{pickLocale(item.name, language)}</h3>
        <p className="mt-1 text-sm text-ink-500">
          {language === 'my' ? item.name.en : item.name.my}
        </p>
        <p className="mt-3 flex-1 text-sm text-ink-600">{pickLocale(item.blurb, language)}</p>

        <div className="mt-6 flex items-end justify-between gap-3">
          <p className="font-display text-lg font-semibold text-primary-700">{formatPrice(item.price)}</p>
          <button
            type="button"
            disabled={!available}
            onClick={() => onAdd(item)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              available
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'cursor-not-allowed bg-ink-100 text-ink-400'
            }`}
          >
            {available ? <Plus className="h-4 w-4" strokeWidth={2.25} /> : null}
            {!available
              ? t('pages.menu.outOfStock')
              : added
                ? t('pages.menu.added')
                : t('pages.menu.addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}

function MenuGrid({ items, language, addedId, onAdd }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <MenuCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
        </li>
      ))}
    </ul>
  );
}

export default function Menu() {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const [filter, setFilter] = useState('all');
  const [addedId, setAddedId] = useState(null);
  const addedTimer = useRef(null);
  const language = i18n.resolvedLanguage === 'my' ? 'my' : 'en';

  const visibleItems = useMemo(
    () => (filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === filter)),
    [filter]
  );

  useEffect(
    () => () => {
      if (addedTimer.current) window.clearTimeout(addedTimer.current);
    },
    []
  );

  const handleAdd = (item) => {
    addItem(item);
    setAddedId(item.id);
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => {
      setAddedId((current) => (current === item.id ? null : current));
    }, 1400);
  };

  return (
    <section className="bg-white">
      <div className="border-b border-secondary-400/25 bg-[linear-gradient(180deg,#fff8e8_0%,#ffffff_72%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase text-secondary-700">{t('pages.menu.kicker')}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl lg:text-6xl">
            {t('pages.menu.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{t('pages.menu.subtitle')}</p>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-ink-100 bg-white/90 backdrop-blur-md sm:top-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div
            role="radiogroup"
            aria-label={t('pages.menu.filter')}
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {FILTERS.map(({ id, labelKey }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFilter(id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'border border-ink-200 bg-white text-ink-700 hover:border-secondary-400 hover:text-ink-950'
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-ink-500" aria-live="polite">
            {t('pages.menu.showing', { count: visibleItems.length })}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {visibleItems.length === 0 ? (
          <p className="py-20 text-center text-ink-500">{t('pages.menu.empty')}</p>
        ) : filter === 'all' ? (
          <div className="space-y-16">
            {CATEGORIES.map(({ id, icon: Icon, title, caption }) => {
              const items = MENU_ITEMS.filter((item) => item.category === id);
              return (
                <section key={id} aria-labelledby={`menu-${id}`}>
                  <div className="mb-7 flex items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-50 text-primary-700">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <h2 id={`menu-${id}`} className="font-display text-3xl font-semibold text-ink-900">
                          {pickLocale(title, language)}
                        </h2>
                      </div>
                      <p className="mt-2 text-ink-500">{pickLocale(caption, language)}</p>
                    </div>
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-secondary-400/70 to-transparent md:block" />
                  </div>
                  <MenuGrid items={items} language={language} addedId={addedId} onAdd={handleAdd} />
                </section>
              );
            })}
          </div>
        ) : (
          <MenuGrid items={visibleItems} language={language} addedId={addedId} onAdd={handleAdd} />
        )}
      </div>
    </section>
  );
}
