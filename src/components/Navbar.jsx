import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/menu', labelKey: 'nav.menu' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
];

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

function BrandMark() {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      aria-label={`${t('brand.official')} ${t('brand.english')}`}
      className="group inline-flex min-w-0 max-w-[13.5rem] shrink items-center gap-2.5 rounded-full sm:max-w-md sm:gap-3"
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-600 ring-2 ring-secondary-400 ring-offset-2 ring-offset-white transition-transform duration-500 group-hover:rotate-12 sm:h-11 sm:w-11"
      >
        <span className="font-display text-xl font-semibold leading-none text-secondary-300">M</span>
      </span>
      <span className="flex min-w-0 flex-col text-left">
        <span className="font-display text-[0.95rem] font-semibold leading-tight text-ink-900 sm:text-lg">
          {t('brand.name')}
        </span>
        <span className="mt-0.5 text-[0.7rem] font-medium leading-tight text-secondary-700 sm:text-sm">
          {t('brand.tagline')}
        </span>
      </span>
    </Link>
  );
}

function LanguageToggle({ className = '' }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === 'my' ? 'my' : 'en';

  return (
    <div
      role="radiogroup"
      aria-label={t('nav.language')}
      className={`relative inline-flex items-center rounded-full border border-secondary-400/50 bg-ink-50 p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1 left-1 top-1 w-11 rounded-full bg-gradient-to-b from-secondary-300 to-secondary-500 shadow-sm transition-transform duration-300 ease-out ${
          current === 'my' ? 'translate-x-11' : 'translate-x-0'
        }`}
      />
      {[
        { code: 'en', label: 'EN', name: 'English' },
        { code: 'my', label: 'MM', name: 'မြန်မာ' },
      ].map(({ code, label, name }) => {
        const isActive = current === code;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={name}
            onClick={() => i18n.changeLanguage(code)}
            className={`relative z-10 w-11 rounded-full py-1 text-xs font-bold transition-colors ${
              isActive ? 'text-ink-950' : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

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
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </button>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { count: cartCount, openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => {
      if (e.matches) setIsOpen(false);
    };
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
          <BrandMark />

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map(({ to, labelKey, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={desktopLinkClass}>
                  {t(labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <CartButton count={cartCount} onClick={openCart} />
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
                          {isActive ? (
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-secondary-500" />
                          ) : null}
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
