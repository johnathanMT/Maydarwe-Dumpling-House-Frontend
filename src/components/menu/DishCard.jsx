import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Check, Plus, Utensils } from 'lucide-react';
import DishPhoto from './DishPhoto';
import { MEAT_TYPES } from './meatIcons';
import { formatPrice, pickLocale } from '../../data/menu';

/**
 * Frosted-glass badge in the photo's top-right corner showing the dish's main
 * meat, with a slow, continuous float. Screen readers hear the meat's name.
 */
function MeatBadge({ type }) {
  const { t } = useTranslation();
  const meat = MEAT_TYPES[type];
  if (!meat) return null;
  const { Icon, color, labelKey } = meat;
  const label = t(labelKey);

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-full bg-white/80 p-2 shadow-sm ring-1 ring-white/60 backdrop-blur-md"
    >
      <m.span
        className={`block ${color}`}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <Icon className="h-6 w-6" />
      </m.span>
    </span>
  );
}

/**
 * One dish, used on the home page (house favourites) and the menu.
 * Memoised: with a stable `onAdd`, adding one dish re-renders only that card.
 */
function DishCard({ item, language, added = false, onAdd }) {
  const { t } = useTranslation();
  const available = item.inStock;
  const name = pickLocale(item.name, language);
  const otherName = language === 'my' ? item.name.en : item.name.my;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-butter-200 transition-[transform,box-shadow] duration-300 ease-out-soft ${
        available ? 'hover:-translate-y-1 hover:shadow-lift hover:ring-butter-400' : 'opacity-80'
      }`}
    >
      <div className="relative">
        <DishPhoto item={item} alt={name} />
        <MeatBadge type={item.meatType} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/30 to-transparent" />
        {available ? (
          <span className="absolute bottom-3 left-4 rounded-full bg-butter px-3 py-1 text-sm font-bold tabular-nums text-ink-950 shadow-sm ring-2 ring-white">
            {formatPrice(item.price, language)}
          </span>
        ) : (
          <span className="absolute bottom-3 left-4 rounded-full bg-ink-950/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-2 ring-white/70">
            {t('pages.menu.outOfStock')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink-900">{name}</h3>
        <p className="mt-1 text-sm text-primary-600">{otherName}</p>
        {item.note ? (
          <p className="mt-3 self-start rounded-2xl bg-secondary-50 px-3 py-1.5 text-xs font-medium leading-relaxed text-secondary-900 ring-1 ring-secondary-200">
            {pickLocale(item.note, language)}
          </p>
        ) : null}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{pickLocale(item.blurb, language)}</p>
        <span className="mt-3 inline-flex items-center gap-1 self-start rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600">
          <Utensils className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
          {t('pages.menu.portion')}
        </span>

        <div aria-hidden="true" className="gold-rule mt-5 opacity-60" />

        <button
          type="button"
          disabled={!available}
          onClick={() => onAdd(item)}
          className={`mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
            !available
              ? 'cursor-not-allowed bg-ink-100 text-ink-400'
              : added
                ? 'bg-butter text-ink-950'
                : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {available ? (
            added ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.25} />
            )
          ) : null}
          {!available ? t('pages.menu.outOfStock') : added ? t('pages.menu.added') : t('pages.menu.addToCart')}
          {available ? <span className="sr-only">: {name}</span> : null}
        </button>
      </div>
    </article>
  );
}

export default memo(DishCard);
