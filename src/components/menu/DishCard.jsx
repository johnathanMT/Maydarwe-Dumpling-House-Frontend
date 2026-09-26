import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Plus } from 'lucide-react';
import DishPhoto from './DishPhoto';
import { formatPrice, pickLocale } from '../../data/menu';

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
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-ink-900/5 transition-[transform,box-shadow] duration-300 ease-out-soft ${
        available ? 'hover:-translate-y-1 hover:shadow-lift hover:ring-secondary-400/40' : 'opacity-80'
      }`}
    >
      <div className="relative">
        <DishPhoto item={item} alt={name} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-lacquer/60 to-transparent" />
        {available ? (
          <span className="absolute bottom-3 left-4 rounded-full bg-lacquer/85 px-3 py-1 text-sm font-semibold tabular-nums text-secondary-200 ring-1 ring-secondary-400/40 backdrop-blur">
            {formatPrice(item.price)}
          </span>
        ) : (
          <span className="absolute bottom-3 left-4 rounded-full bg-lacquer/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-300 ring-1 ring-secondary-400/40">
            {t('pages.menu.outOfStock')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink-900">{name}</h3>
        <p className="mt-1 text-sm text-secondary-700">{otherName}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{pickLocale(item.blurb, language)}</p>

        <div aria-hidden="true" className="gold-rule mt-5 opacity-60" />

        <button
          type="button"
          disabled={!available}
          onClick={() => onAdd(item)}
          className={`mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
            !available
              ? 'cursor-not-allowed bg-ink-100 text-ink-400'
              : added
                ? 'bg-lacquer text-secondary-200'
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
