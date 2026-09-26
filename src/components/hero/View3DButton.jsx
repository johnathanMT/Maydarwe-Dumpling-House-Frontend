import { useTranslation } from 'react-i18next';
import { Box, Loader2 } from 'lucide-react';

/**
 * "View in 3D" pill over the hero photo; shows a spinner while the scene loads.
 * @param {{ loading: boolean, onClick: () => void }} props
 */
export default function View3DButton({ loading, onClick }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="absolute bottom-4 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/95 px-5 text-sm font-semibold text-ink-900 shadow-lift ring-1 ring-butter-400 backdrop-blur transition-colors hover:bg-butter-100 disabled:cursor-wait sm:bottom-5"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Box className="h-4 w-4 text-primary-600" aria-hidden="true" />
      )}
      {loading ? t('pages.home.loading3d') : t('pages.home.view3d')}
    </button>
  );
}
