import { useTranslation } from 'react-i18next';
import { useBusinessCopy } from '../../lib/businessHours';

/** Hours strip above the header. CSS entrance only: it is on every page, so no JS animation. */
export default function AnnouncementBar() {
  const { t } = useTranslation();
  const copy = useBusinessCopy();

  return (
    <div className="relative overflow-hidden bg-lacquer text-secondary-200">
      <p className="animate-fade-down break-words px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-4 sm:text-xs">
        {t('ui.announcement', copy)}
      </p>
      <div aria-hidden="true" className="gold-rule opacity-50" />
    </div>
  );
}
