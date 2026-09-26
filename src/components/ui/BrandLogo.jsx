import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND_LOGO_SRC } from '../../constants/site';
import OptimizedImage from './OptimizedImage';

const SIZE_CLASS = {
  nav: 'h-12 w-12 sm:h-16 sm:w-16',
  footer: 'h-24 w-24 sm:h-28 sm:w-28',
  mark: 'h-10 w-10',
};

export default function BrandLogo({ size = 'nav', className = '' }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      aria-label={`${t('brand.official')} ${t('brand.english')}`}
      className={`group inline-flex shrink-0 items-center rounded-2xl ${className}`}
    >
      <OptimizedImage
        src={BRAND_LOGO_SRC}
        alt=""
        width={256}
        height={256}
        priority={size === 'nav'}
        className={`${SIZE_CLASS[size] ?? SIZE_CLASS.nav} rounded-2xl object-cover shadow-[0_8px_20px_-12px_rgb(34_30_27_/_0.45)] ring-1 ring-ink-900/5 transition-transform duration-300 group-hover:scale-[1.03]`}
      />
    </Link>
  );
}
