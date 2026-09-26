import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import Eyebrow from '../components/ui/Eyebrow';
import DumplingMascot from '../components/mascot/DumplingMascot';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  const { t } = useTranslation();
  usePageMeta('notFound', { noindex: true });

  return (
    <section className="bg-sunny">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:py-20">
        <DumplingMascot className="!w-[min(100%,13rem)] sm:!w-[16rem]" />
        <Eyebrow className="mt-6">{t('ui.notFound.kicker')}</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-5xl">{t('ui.notFound.title')}</h1>
        <p className="mt-4 max-w-md text-lg text-ink-600">{t('ui.notFound.body')}</p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button as={Link} to="/menu">
            {t('pages.home.viewMenu')}
          </Button>
          <Button as={Link} to="/" variant="secondary">
            {t('ui.notFound.home')}
          </Button>
        </div>
      </div>
    </section>
  );
}
