import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChefMascot from '../components/hero/ChefMascot';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  const { t } = useTranslation();
  usePageMeta('notFound', { noindex: true });

  return (
    <section className="bg-[linear-gradient(180deg,#fff8e8_0%,#ffffff_72%)]">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:py-20">
        <ChefMascot className="!w-[min(100%,13rem)] sm:!w-[16rem]" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-secondary-700">
          {t('ui.notFound.kicker')}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-5xl">{t('ui.notFound.title')}</h1>
        <p className="mt-4 max-w-md text-lg text-ink-600">{t('ui.notFound.body')}</p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/menu"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700"
          >
            {t('pages.home.viewMenu')}
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-secondary-500 bg-white px-6 font-semibold text-secondary-800 hover:bg-secondary-50"
          >
            {t('ui.notFound.home')}
          </Link>
        </div>
      </div>
    </section>
  );
}
