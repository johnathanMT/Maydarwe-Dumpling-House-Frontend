import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, House, MapPin, UtensilsCrossed } from 'lucide-react';
import { NAV_LINKS } from '../constants/site';

const ICONS = {
  '/': House,
  '/menu': UtensilsCrossed,
  '/about': BookOpen,
  '/contact': MapPin,
};

/** Phone and small-tablet navigation (hidden from `md`, where the header shows the links). */
export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('nav.bottom')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
    >
      <ul className="pointer-events-auto mx-auto flex max-w-md items-center justify-around gap-1 rounded-[1.75rem] bg-lacquer/95 p-1.5 shadow-lift ring-1 ring-secondary-400/30 backdrop-blur-md">
        {NAV_LINKS.map(({ to, labelKey, end }) => {
          const Icon = ICONS[to];
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex min-h-14 w-full min-w-12 flex-col items-center justify-center gap-1 rounded-[1.35rem] px-1 py-1.5 text-[11px] font-semibold transition-colors duration-200',
                    isActive
                      ? 'bg-secondary-400/15 text-secondary-200 ring-1 ring-inset ring-secondary-400/40'
                      : 'text-brand-pearl/60 hover:text-brand-pearl',
                  ].join(' ')
                }
              >
                {Icon ? <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> : null}
                <span className="max-w-full truncate">{t(labelKey)}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
