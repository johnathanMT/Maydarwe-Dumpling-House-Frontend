import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND_LOGO_SRC } from '../../constants/site';
import { isChunkLoadError, reloadOnce } from '../../lib/chunkReload';

/**
 * Rendered when the app shell itself fails, so it depends on nothing but
 * translations: no layout, no cart, no router links (plain <a> reloads).
 */
export default function RootError() {
  const { t } = useTranslation();
  const error = useRouteError();

  useEffect(() => {
    if (isChunkLoadError(error)) reloadOnce();
    if (import.meta.env.DEV) console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center bg-brand-pearl px-4 py-16 text-center">
      <div className="max-w-md">
        <img src={BRAND_LOGO_SRC} alt="" width={96} height={96} className="mx-auto h-24 w-24 rounded-2xl object-cover" />
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900">{t('ui.routeError.title')}</h1>
        <p className="mt-3 text-ink-600">{t('ui.routeError.body')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700"
          >
            {t('ui.routeError.retry')}
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-secondary-500 bg-white px-6 font-semibold text-secondary-800 hover:bg-secondary-50"
          >
            {t('ui.notFound.home')}
          </a>
        </div>
      </div>
    </main>
  );
}
