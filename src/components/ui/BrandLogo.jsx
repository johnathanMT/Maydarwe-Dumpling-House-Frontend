import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOGO } from '../../assets/brand';
import OptimizedImage from './OptimizedImage';

/** @typedef {'nav' | 'footer' | 'mark'} BrandLogoSize */

/** @type {Record<BrandLogoSize, string>} */
const SIZE_CLASS = {
  nav: 'h-12 w-12 sm:h-16 sm:w-16',
  footer: 'h-24 w-24 sm:h-28 sm:w-28',
  mark: 'h-10 w-10',
};

// Rendered CSS width per size, so the browser fetches the smallest sharp file.
/** @type {Record<BrandLogoSize, string>} */
const SIZES = {
  nav: '(min-width: 640px) 64px, 48px',
  footer: '(min-width: 640px) 112px, 96px',
  mark: '40px',
};

/**
 * The shop logo, linking home.
 * @param {object} props
 * @param {BrandLogoSize} [props.size]
 * @param {string} [props.className]
 */
export default function BrandLogo({ size = 'nav', className = '' }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      aria-label={`${t('brand.official')} ${t('brand.english')}`}
      className={`group inline-flex shrink-0 items-center rounded-2xl ${className}`}
    >
      <OptimizedImage
        image={LOGO}
        alt=""
        sizes={SIZES[size] ?? SIZES.nav}
        priority={size === 'nav'}
        className={`${SIZE_CLASS[size] ?? SIZE_CLASS.nav} rounded-2xl object-cover shadow-card ring-1 ring-ink-900/5 transition-transform duration-300 group-hover:scale-[1.03]`}
      />
    </Link>
  );
}
