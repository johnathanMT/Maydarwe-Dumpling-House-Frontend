import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '../../constants/site';
import { NAV_ICONS } from './NavIcons';

/**
 * Phone and small-tablet navigation (hidden from `md`, where the header shows the links).
 * Ivory bar with the shop's cartoon dumpling icons; the active tab sits on a butter-yellow pill.
 */
export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('nav.bottom')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
    >
      <ul className="pointer-events-auto mx-auto flex max-w-md items-center justify-around gap-1 rounded-[1.75rem] bg-ivory/95 p-1.5 shadow-lift ring-1 ring-butter-400/50 backdrop-blur-md">
        {NAV_LINKS.map(({ to, labelKey, end }) => {
          const Icon = NAV_ICONS[to];
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'group flex min-h-14 w-full min-w-12 flex-col items-center justify-center gap-0.5 rounded-[1.35rem] px-1 py-1.5 text-[11px] font-semibold transition-colors duration-200',
                    isActive
                      ? 'bg-butter text-ink-950 shadow-[0_3px_0_theme(colors.secondary.500)]'
                      : 'text-ink-500 hover:bg-butter-100 hover:text-ink-900',
                  ].join(' ')
                }
              >
                {Icon ? (
                  <Icon className="h-7 w-7 transition-transform duration-200 ease-out-soft group-hover:-translate-y-0.5" />
                ) : null}
                <span className="max-w-full truncate">{t(labelKey)}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
