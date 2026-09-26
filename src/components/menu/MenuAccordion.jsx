import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MENU_GALLERY } from '../../assets/photos/remote';

const GLASS =
  'bg-rose-900/40 text-white backdrop-blur-md border border-rose-500/30 shadow-[0_0_15px_rgba(159,18,57,0.5)]';

/**
 * Full-width photo accordion under the Menu title.
 * Hover (desktop) or tap (phone) expands one panel; the rest stay slim.
 */
export default function MenuAccordion() {
  const { t } = useTranslation();
  const [active, setActive] = useState(/** @type {number | null} */ (null));

  return (
    <ul
      aria-label={t('pages.menu.galleryLabel')}
      className="flex h-[60vh] w-full gap-1 bg-ink-950 [contain:layout_paint]"
    >
      {MENU_GALLERY.map((dish, index) => {
        const open = active === index;
        return (
          <li
            key={dish.src}
            className={`group min-w-0 flex-1 transition-[flex-grow] duration-500 ease-in-out hover:flex-[4] ${open ? 'flex-[4]' : ''}`}
          >
            <button
              type="button"
              aria-pressed={open}
              aria-label={dish.name}
              onClick={() => setActive((current) => (current === index ? null : index))}
              className="relative block h-full w-full overflow-hidden"
            >
              <img
                src={dish.src}
                srcSet={dish.srcSet}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 1024px) 50vw, 60vh"
                // The whole strip is on screen at load (and is the page's LCP), so no lazy loading.
                loading="eager"
                fetchPriority={index < 2 ? 'high' : 'auto'}
                decoding="async"
              />
              <span
                className={`pointer-events-none absolute bottom-4 z-10 rounded-full font-display font-semibold tracking-wide ${GLASS} ${
                  open
                    ? 'inset-x-3 px-4 py-2 text-center text-sm sm:text-base'
                    : 'left-1/2 -translate-x-1/2 rotate-180 px-2 py-3 text-[11px] [writing-mode:vertical-rl] group-hover:inset-x-3 group-hover:left-auto group-hover:translate-x-0 group-hover:rotate-0 group-hover:px-4 group-hover:py-2 group-hover:text-center group-hover:text-sm group-hover:[writing-mode:horizontal-tb]'
                }`}
              >
                {dish.name}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
