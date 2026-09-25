import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// The red "M" seal is a stand-in — swap it for <img src="/logo.png" /> once you have the real logo.
export default function BrandLogo({ variant = 'light', className = '' }) {
  const { t } = useTranslation();
  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      aria-label={`${t('brand.name')} ${t('brand.tagline')}`}
      className={`group inline-flex shrink-0 items-center gap-3 rounded-full ${className}`}
    >
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 place-items-center rounded-full bg-primary-600 ring-2 ring-secondary-400 ring-offset-2 transition-transform duration-500 group-hover:rotate-12 sm:h-11 sm:w-11 ${
          isDark ? 'ring-offset-ink-950' : 'ring-offset-white'
        }`}
      >
        <span className="font-display text-xl font-semibold leading-none text-secondary-300">M</span>
      </span>

      <span className="flex flex-col">
        <span
          className={`font-display text-xl font-semibold leading-none sm:text-2xl ${
            isDark ? 'text-white' : 'text-ink-900'
          }`}
        >
          {t('brand.name')}
        </span>
        <span
          className={`mt-1 text-sm font-medium leading-none ${
            isDark ? 'text-secondary-400' : 'text-secondary-700'
          }`}
        >
          {t('brand.tagline')}
        </span>
      </span>
    </Link>
  );
}
