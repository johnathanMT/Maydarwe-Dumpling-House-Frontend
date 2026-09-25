import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../constants/site';

export default function LanguageToggle({ className = '' }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === 'my' ? 'my' : 'en';

  return (
    <div
      role="radiogroup"
      aria-label={t('nav.language')}
      className={`relative inline-flex items-center rounded-full border border-secondary-400/50 bg-ink-50 p-1 ${className}`}
    >
      {/* Sliding gold thumb */}
      <span
        aria-hidden="true"
        className={`absolute bottom-1 left-1 top-1 w-11 rounded-full bg-gradient-to-b from-secondary-300 to-secondary-500 shadow-sm transition-transform duration-300 ease-out ${
          current === 'my' ? 'translate-x-11' : 'translate-x-0'
        }`}
      />
      {SUPPORTED_LANGUAGES.map(({ code, label, name }) => {
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
