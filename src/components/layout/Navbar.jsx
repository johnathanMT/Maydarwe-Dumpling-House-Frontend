import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import LanguageToggle from '../ui/LanguageToggle';
import { NAV_LINKS } from '../../constants/site';

const desktopLinkClass = ({ isActive }) =>
  [
    'relative py-2 text-[0.95rem] font-medium transition-colors',
    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-primary-600 after:transition-transform after:duration-300',
    isActive
      ? 'text-primary-700 after:scale-x-100'
      : 'text-ink-700 after:scale-x-0 hover:text-ink-950 hover:after:scale-x-100',
  ].join(' ');

const mobileLinkClass = ({ isActive }) =>
  [
    'flex items-center justify-between py-4 font-display text-2xl transition-colors',
    isActive ? 'text-primary-700' : 'text-ink-900 hover:text-primary-700',
  ].join(' ');

function CartButton({ count, onClick }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('nav.cartCount', { count })}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-primary-50 hover:text-primary-700"
    >
      <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.75} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

export default function Navbar({ cartCount = 0, onCartClick }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close the drawer whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Elevate the bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + Escape to close while the drawer is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && setIsOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  // Auto-close if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setIsOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const elevated = isScrolled || isOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          elevated
            ? 'border-secondary-400/30 bg-white/90 shadow-nav backdrop-blur-md'
            : 'border-transparent bg-white'
        }`}
      >
        <nav
          aria-label={t('nav.main')}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8"
        >
          <BrandLogo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map(({ to, labelKey, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={desktopLinkClass}>
                  {t(labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <CartButton count={cartCount} onClick={onCartClick} />
            <Link
              to="/menu"
              className="hidden items-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 lg:inline-flex"
            >
              {t('nav.order')}
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-50 lg:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer — grid-rows trick animates height smoothly */}
        <div
          id="mobile-nav"
          className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out lg:hidden ${
            isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-ink-100 px-4 pb-8 pt-2 sm:px-6">
              <ul className="divide-y divide-ink-100">
                {NAV_LINKS.map(({ to, labelKey, end }) => (
                  <li key={to}>
                    <NavLink to={to} end={end} className={mobileLinkClass}>
                      {({ isActive }) => (
                        <>
                          {t(labelKey)}
                          {isActive && (
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-secondary-500" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-4">
                <LanguageToggle className="sm:hidden" />
                <Link
                  to="/menu"
                  className="ml-auto inline-flex flex-1 items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 sm:flex-none"
                >
                  {t('nav.order')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop — lives outside <header> because backdrop-blur traps fixed children */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-ink-950/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
    </>
  );
}
