import { useTranslation } from 'react-i18next';
import { useBusinessCopy } from '../../lib/businessHours';

/** Hours strip above the header: brand red with butter-yellow text. CSS entrance only. */
export default function AnnouncementBar() {
  const { t } = useTranslation();
  const copy = useBusinessCopy();

  return (
    <div className="relative overflow-hidden bg-primary-600 text-butter-100">
      <p className="animate-fade-down break-words px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-4 sm:text-xs">
        {t('ui.announcement', copy)}
      </p>
    </div>
  );
}
