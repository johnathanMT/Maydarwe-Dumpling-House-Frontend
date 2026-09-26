import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { LOGO } from '../../assets/brand';
import OptimizedImage from './OptimizedImage';
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
    <main className="bg-sunny grid min-h-dvh place-items-center px-4 py-16 text-center">
      <div className="max-w-md">
        <OptimizedImage image={LOGO} alt="" sizes="96px" className="mx-auto h-24 w-24 rounded-2xl object-cover" />
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900">{t('ui.routeError.title')}</h1>
        <p className="mt-3 text-ink-600">{t('ui.routeError.body')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => window.location.reload()}>{t('ui.routeError.retry')}</Button>
          <Button as="a" href="/" variant="secondary">
            {t('ui.notFound.home')}
          </Button>
        </div>
      </div>
    </main>
  );
}
