import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { EASE_OUT } from '../../lib/motion';
import { SWIPE_ROW } from './swipeRow';

/** @import { CategoryId } from '../../types' */

/** @typedef {'all' | CategoryId} MenuFilterId */

/**
 * @typedef {object} MenuFilter
 * @property {MenuFilterId} id 'all' or a category id.
 * @property {string} labelKey Translation key for the button text.
 */

/**
 * Sticky row of category filters under the header, with the "showing N dishes"
 * count (announced to screen readers when it changes). The red pill slides
 * between buttons (framer-motion layoutId). Swipes sideways on a phone.
 * @param {object} props
 * @param {MenuFilter[]} props.filters
 * @param {MenuFilterId} props.active Id of the selected filter.
 * @param {(id: MenuFilterId) => void} props.onChange
 * @param {number} props.count Number of dishes shown.
 */
export default function MenuFilterBar({ filters, active, onChange, count }) {
  const { t } = useTranslation();
  return (
    <div className="sticky top-header z-30 border-b border-butter-200 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div
          role="group"
          aria-label={t('pages.menu.filter')}
          data-lenis-prevent-horizontal
          className={`no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 ${SWIPE_ROW}`}
        >
          {filters.map(({ id, labelKey }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(id)}
                className={`relative inline-flex min-h-12 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white text-ink-700 ring-1 ring-inset ring-butter-200 hover:bg-butter-50 hover:text-ink-950 hover:ring-butter-400'
                }`}
              >
                {isActive ? (
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
          {t('pages.menu.showing', { count })}
        </p>
      </div>
    </div>
  );
}
