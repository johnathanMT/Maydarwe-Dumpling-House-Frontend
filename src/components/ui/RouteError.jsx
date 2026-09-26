import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isChunkLoadError, reloadOnce } from '../../lib/chunkReload';

/** Shown inside the normal layout when a page fails to load or render. */
export default function RouteError() {
  const { t } = useTranslation();
  const error = useRouteError();

  useEffect(() => {
    if (isChunkLoadError(error)) reloadOnce();
    if (import.meta.env.DEV) console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary-700">
        {t('brand.english')}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        {t('ui.routeError.title')}
      </h1>
      <p className="mt-4 text-ink-600">{t('ui.routeError.body')}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700"
        >
          {t('ui.routeError.retry')}
        </button>
        <Link
          to="/menu"
          reloadDocument
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-secondary-500 bg-white px-6 font-semibold text-secondary-800 hover:bg-secondary-50"
        >
          {t('pages.home.viewMenu')}
        </Link>
      </div>
    </section>
  );
}
