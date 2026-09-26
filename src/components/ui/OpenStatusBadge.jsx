import { useOpenStatus } from '../../lib/businessHours';

/**
 * "Open now · until 8:00 PM" / "Closed now · opens 9:00 AM", in the shop's time zone.
 * @param {object} props
 * @param {string} [props.className]
 * @param {'light' | 'dark'} [props.tone]
 */
export default function OpenStatusBadge({ className = '', tone = 'light' }) {
  const { isOpen, label } = useOpenStatus();
  const surface =
    tone === 'dark'
      ? 'bg-white/10 text-white ring-white/20'
      : isOpen
        ? 'bg-emerald-50 text-emerald-800 ring-emerald-600/20'
        : 'bg-ink-50 text-ink-700 ring-ink-900/10';

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${surface} ${className}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-ink-400'}`} />
      {label}
    </p>
  );
}
