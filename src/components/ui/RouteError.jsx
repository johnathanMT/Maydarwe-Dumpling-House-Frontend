import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import Eyebrow from './Eyebrow';
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
      <Eyebrow>{t('brand.english')}</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        {t('ui.routeError.title')}
      </h1>
      <p className="mt-4 text-ink-600">{t('ui.routeError.body')}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={() => window.location.reload()}>
          {t('ui.routeError.retry')}
        </Button>
        <Button as={Link} to="/menu" reloadDocument variant="secondary">
          {t('pages.home.viewMenu')}
        </Button>
      </div>
    </section>
  );
}
