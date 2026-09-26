import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag } from 'lucide-react';
import { m } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useUiActions } from '../../context/UiContext';
import { NAV_LINKS } from '../../constants/site';
import BrandLogo from '../ui/BrandLogo';
import LanguageToggle from '../ui/LanguageToggle';
import MagneticWrapper from '../ui/MagneticWrapper';

const desktopLinkClass = ({ isActive }) =>
  [
    'relative whitespace-nowrap py-2 text-sm font-medium transition-colors lg:text-[0.95rem]',
    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-primary-600 after:transition-transform after:duration-300',
    isActive
      ? 'text-primary-700 after:scale-x-100'
      : 'text-ink-700 after:scale-x-0 hover:text-ink-950 hover:after:scale-x-100',
  ].join(' ');

function CartButton() {
  const { t } = useTranslation();
  const { count } = useCart();
  const { openCart } = useUiActions();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={t('nav.cartCount', { count })}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-secondary-50 hover:text-primary-700 lg:h-11 lg:w-11"
    >
      <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.75} />
      {count > 0 ? (
        // key={count} re-mounts the badge on every change, so it "bumps" when a dish is added.
        <m.span
          key={count}
          initial={{ scale: 0.6 }}
          animate={{ scale: [1.3, 1] }}
          transition={{ duration: 0.35 }}
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white"
        >
          {count > 99 ? '99+' : count}
        </m.span>
      ) : null}
    </button>
  );
}

/**
 * Below `md`, page navigation lives in <BottomNav>; the header keeps only
 * the logo, language, cart and the one primary action: "Order".
 */
export default function Navbar() {
  const { t } = useTranslation();
  const { openOrder } = useUiActions();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled
          ? 'border-secondary-400/30 bg-white/90 shadow-nav backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <nav
        aria-label={t('nav.main')}
        className="mx-auto flex h-header max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8"
      >
        <BrandLogo size="nav" />

        <ul className="hidden items-center gap-5 md:flex lg:gap-9">
          {NAV_LINKS.map(({ to, labelKey, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={desktopLinkClass}>
                {t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageToggle />
          <CartButton />
          <MagneticWrapper>
            <button
              type="button"
              onClick={openOrder}
              className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-primary-600 px-4 text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-700 sm:px-5 lg:min-h-11"
            >
              {t('nav.order')}
            </button>
          </MagneticWrapper>
        </div>
      </nav>
    </header>
  );
}
