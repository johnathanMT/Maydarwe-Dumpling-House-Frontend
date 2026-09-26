import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import { useCartActions } from '../context/useCart';
import { useLang } from '../lib/businessHours';
import { usePageMeta } from '../lib/seo';
import { DURATION } from '../lib/motion';
import { useAddedFlash } from '../hooks/useAddedFlash';
import PageHeader from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import MenuGrid from '../components/menu/MenuGrid';
import MenuFilterBar from '../components/menu/MenuFilterBar';
import SpecialOrders from '../components/menu/SpecialOrders';
import MenuAccordion from '../components/menu/MenuAccordion';
import { CATEGORIES, MENU_ITEMS, pickLocale } from '../data/menu';
import { CATEGORY_ICONS } from '../components/menu/categoryIcons';

/** @import { CategoryId, MenuItem } from '../types' */
/** @import { MenuFilter, MenuFilterId } from '../components/menu/MenuFilterBar' */

const CATEGORY_LIST = CATEGORIES.map((category) => ({ ...category, icon: CATEGORY_ICONS[category.id] }));

/** @type {MenuFilter[]} */
const FILTERS = [
  { id: 'all', labelKey: 'pages.menu.all' },
  { id: 'dumplings', labelKey: 'pages.menu.dumplings' },
  { id: 'mala', labelKey: 'pages.menu.mala' },
  { id: 'noodles', labelKey: 'pages.menu.noodles' },
];

/** Dishes per category, computed once. */
const ITEMS_BY_CATEGORY = /** @type {Record<CategoryId, MenuItem[]>} */ (
  Object.fromEntries(CATEGORIES.map(({ id }) => [id, MENU_ITEMS.filter((item) => item.category === id)]))
);

export default function Menu() {
  const { t } = useTranslation();
  const { addItem } = useCartActions();
  const language = useLang();
  const [filter, setFilter] = useState(/** @type {MenuFilterId} */ ('all'));
  const [addedId, onAdd] = useAddedFlash(addItem);
  usePageMeta('menu', { path: '/menu' });

  const visibleCount = filter === 'all' ? MENU_ITEMS.length : ITEMS_BY_CATEGORY[filter].length;

  return (
    <section className="bg-ivory">
      <PageHeader kicker={t('pages.menu.kicker')} title={t('pages.menu.title')} subtitle={t('pages.menu.subtitle')} />

      <Reveal distance={40}>
        <MenuAccordion />
      </Reveal>

      <MenuFilterBar filters={FILTERS} active={filter} onChange={setFilter} count={visibleCount} />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={filter} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: DURATION.ui } }}>
            {filter === 'all' ? (
              <div className="space-y-20 md:space-y-28">
                {CATEGORY_LIST.map(({ id, icon: Icon, title, caption }) => (
                  <section key={id} aria-labelledby={`menu-${id}`}>
                    <div className="mb-8 flex items-end gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-butter text-ink-950 ring-4 ring-butter-100">
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </span>
                          <h2
                            id={`menu-${id}`}
                            className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl"
                          >
                            {pickLocale(title, language)}
                          </h2>
                        </div>
                        <p className="mt-2 leading-relaxed text-ink-500">{pickLocale(caption, language)}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-butter-400 to-transparent md:block"
                      />
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

      <SpecialOrders />
    </section>
  );
}
