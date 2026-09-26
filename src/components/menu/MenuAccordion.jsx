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
  const [active, setActive] = useState(null);

  return (
    <ul
      aria-label={t('pages.menu.galleryLabel')}
      className="flex h-[60vh] w-full gap-1 bg-ink-950"
    >
      {MENU_GALLERY.map((dish, index) => {
        const open = active === index;
        return (
          <li
            key={dish.src}
            className={`group min-w-0 flex-1 transition-all duration-500 ease-in-out hover:flex-[4] ${open ? 'flex-[4]' : ''}`}
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
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(min-width: 1024px) 40vw, 80vw"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span
                className={`pointer-events-none absolute bottom-4 z-10 rounded-full font-display font-semibold tracking-wide ${GLASS} ${
                  open
                    ? 'inset-x-3 px-4 py-2 text-center text-sm sm:text-base'
                    : 'left-1/2 -translate-x-1/2 px-2 py-3 text-[11px] [writing-mode:vertical-rl] rotate-180 group-hover:inset-x-3 group-hover:left-auto group-hover:translate-x-0 group-hover:px-4 group-hover:py-2 group-hover:text-center group-hover:text-sm group-hover:[writing-mode:horizontal-tb] group-hover:rotate-0'
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
