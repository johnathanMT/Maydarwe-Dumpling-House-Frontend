import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '../constants/site';

function DumplingHomeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <ellipse cx="24" cy="30" rx="16" ry="11" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M10 27 C14 14, 34 14, 38 27" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <path d="M16 24 C20 20, 28 20, 32 24" fill="none" stroke="#C77A02" strokeWidth="1.6" />
      <circle cx="19" cy="29" r="1.5" fill="#141110" />
      <circle cx="29" cy="29" r="1.5" fill="#141110" />
      <path d="M20 33 C22 35, 26 35, 28 33" fill="none" stroke="#141110" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.5" cy="32" r="1.4" fill="#F4A7B9" />
      <circle cx="31.5" cy="32" r="1.4" fill="#F4A7B9" />
    </svg>
  );
}

function DumplingMenuIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <ellipse cx="24" cy="32" rx="15" ry="10" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M11 29 C15 17, 33 17, 37 29" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <path d="M18 22 C19 12, 21 8, 21 6" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 20 C24 11, 26 7, 26 5" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M30 22 C31 13, 32 9, 33 7" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="17" y="28" width="14" height="9" rx="2" fill="#FFF8E6" stroke="#141110" strokeWidth="1.6" />
      <path d="M20 31 H28 M20 34 H26" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DumplingAboutIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <ellipse cx="24" cy="33" rx="15" ry="9.5" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M11 30 C15 19, 33 19, 37 30" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <ellipse cx="24" cy="16" rx="11" ry="4" fill="#fff" stroke="#141110" strokeWidth="2" />
      <path d="M15 16 C15 8, 20 5, 24 4 C28 5, 33 8, 33 16" fill="#fff" stroke="#141110" strokeWidth="2" />
      <ellipse cx="24" cy="4.5" rx="4" ry="2.6" fill="#fff" stroke="#141110" strokeWidth="1.8" />
      <circle cx="19.5" cy="30" r="1.4" fill="#141110" />
      <circle cx="28.5" cy="30" r="1.4" fill="#141110" />
      <path d="M21 34 C22.5 35.5, 25.5 35.5, 27 34" fill="none" stroke="#141110" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DumplingContactIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <ellipse cx="22" cy="31" rx="14" ry="10" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M10 28 C14 16, 30 16, 34 28" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <circle cx="18" cy="29" r="1.4" fill="#141110" />
      <circle cx="26" cy="29" r="1.4" fill="#141110" />
      <path d="M19 33 C21 35, 24 35, 26 33" fill="none" stroke="#141110" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M34 18 C34 14, 40 14, 40 18 C40 23, 34 26, 34 26 C34 26, 28 23, 28 18 C28 14, 34 14, 34 18 Z"
        fill="#C8102E"
        stroke="#141110"
        strokeWidth="1.7"
      />
      <circle cx="34" cy="18.5" r="1.3" fill="#FFE588" />
    </svg>
  );
}

const ICONS = {
  '/': DumplingHomeIcon,
  '/menu': DumplingMenuIcon,
  '/about': DumplingAboutIcon,
  '/contact': DumplingContactIcon,
};

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('nav.bottom')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2"
    >
      <ul className="pointer-events-auto mx-auto flex max-w-md items-center justify-around rounded-[1.75rem] border border-secondary-400/40 bg-white/95 px-2 py-2 shadow-[0_12px_32px_-16px_rgb(34_30_27_/_0.5)] backdrop-blur-md">
        {NAV_LINKS.map(({ to, labelKey, end }) => {
          const Icon = ICONS[to];
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-[11px] font-semibold transition-all',
                    isActive ? 'bg-brand-yellow text-ink-950 shadow-[0_3px_0_#E8A006]' : 'text-ink-500 hover:bg-brand-pearl hover:text-ink-900',
                  ].join(' ')
                }
              >
                {Icon ? <Icon /> : null}
                <span>{t(labelKey)}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
