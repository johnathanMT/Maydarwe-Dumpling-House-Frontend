import { useTranslation } from 'react-i18next';

export default function PagePlaceholder({ pageKey }) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <h1 className="font-display text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
        {t(`pages.${pageKey}.title`)}
      </h1>
      <p className="mt-4 max-w-prose text-lg text-ink-600">{t('pages.comingSoon')}</p>
    </section>
  );
}
