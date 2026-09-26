import { useTranslation } from 'react-i18next';

export default function AnnouncementBar() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-ink-950 text-secondary-200">
      <p className="break-words px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] sm:px-4 sm:text-xs">
        {t('ui.announcement')}
      </p>
    </div>
  );
}
