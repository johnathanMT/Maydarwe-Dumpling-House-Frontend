import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import { useCartActions } from '../context/CartContext';
import { useLang } from '../lib/businessHours';
import { usePageMeta } from '../lib/seo';
import { DURATION, EASE_OUT, fadeUp, stagger } from '../lib/motion';
import { useAddedFlash } from '../hooks/useAddedFlash';
import PageHeader from '../components/ui/PageHeader';
import DishCard from '../components/menu/DishCard';
import MenuAccordion from '../components/menu/MenuAccordion';
import { CATEGORIES, MENU_ITEMS, pickLocale } from '../data/menu';
import { CATEGORY_ICONS } from '../components/menu/categoryIcons';

const CATEGORY_LIST = CATEGORIES.map((category) => ({ ...category, icon: CATEGORY_ICONS[category.id] }));

const FILTERS = [
  { id: 'all', labelKey: 'pages.menu.all' },
  { id: 'dumplings', labelKey: 'pages.menu.dumplings' },
  { id: 'mala', labelKey: 'pages.menu.mala' },
  { id: 'noodles', labelKey: 'pages.menu.noodles' },
];

const ITEMS_BY_CATEGORY = Object.fromEntries(
  CATEGORIES.map(({ id }) => [id, MENU_ITEMS.filter((item) => item.category === id)])
);

/** Grid whose cards stagger in each time it mounts (i.e. on every filter change). */
function MenuGrid({ items, language, addedId, onAdd }) {
  return (
    <m.ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((item) => (
        <m.li key={item.id} variants={fadeUp(14)}>
          <DishCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
        </m.li>
      ))}
    </m.ul>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const { addItem } = useCartActions();
  const language = useLang();
  const [filter, setFilter] = useState('all');
  const [addedId, onAdd] = useAddedFlash(addItem);
  usePageMeta('menu', { path: '/menu' });

  const visibleCount = filter === 'all' ? MENU_ITEMS.length : ITEMS_BY_CATEGORY[filter].length;

  return (
    <section className="bg-ivory">
      <PageHeader kicker={t('pages.menu.kicker')} title={t('pages.menu.title')} subtitle={t('pages.menu.subtitle')} />

      <MenuAccordion />

      <div className="sticky top-header z-30 border-b border-butter-200 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div
            role="group"
            aria-label={t('pages.menu.filter')}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none]"
          >
            {FILTERS.map(({ id, labelKey }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(id)}
                  className={`relative inline-flex min-h-12 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                    active ? 'text-white' : 'bg-white text-ink-700 ring-1 ring-inset ring-butter-200 hover:bg-butter-50 hover:ring-butter-400 hover:text-ink-950'
                  }`}
                >
                  {active ? (
                    <m.span
                      layoutId="menu-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-primary-600 shadow-cta"
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                  ) : null}
                  <span className="relative">{t(labelKey)}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-ink-500" aria-live="polite">
            {t('pages.menu.showing', { count: visibleCount })}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={filter}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: DURATION.ui } }}
          >
            {filter === 'all' ? (
              <div className="space-y-16 md:space-y-20">
                {CATEGORY_LIST.map(({ id, icon: Icon, title, caption }) => (
                  <section key={id} aria-labelledby={`menu-${id}`}>
                    <div className="mb-8 flex items-end gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-butter text-ink-950 ring-4 ring-butter-100">
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </span>
                          <h2 id={`menu-${id}`} className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
                            {pickLocale(title, language)}
                          </h2>
                        </div>
                        <p className="mt-2 text-ink-500">{pickLocale(caption, language)}</p>
                      </div>
                      <span aria-hidden="true" className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-butter-400 to-transparent md:block" />
                    </div>
                    <MenuGrid items={ITEMS_BY_CATEGORY[id]} language={language} addedId={addedId} onAdd={onAdd} />
                  </section>
                ))}
              </div>
            ) : ITEMS_BY_CATEGORY[filter].length === 0 ? (
              <p className="py-20 text-center text-ink-500">{t('pages.menu.empty')}</p>
            ) : (
              <MenuGrid items={ITEMS_BY_CATEGORY[filter]} language={language} addedId={addedId} onAdd={onAdd} />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
