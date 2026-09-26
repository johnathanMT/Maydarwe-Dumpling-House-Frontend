/**
 * Small gold label above a heading ("HOUSE FAVORITES").
 * tone="dark" for lacquer backgrounds. `rule` adds a short gold line before it.
 */
export default function Eyebrow({ children, tone = 'light', rule = false, className = '', as: Tag = 'p' }) {
  const color = tone === 'dark' ? 'text-secondary-300' : 'text-secondary-700';
  return (
    <Tag
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] sm:text-[0.8rem] ${color} ${className}`}
    >
      {rule ? <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" /> : null}
      {children}
    </Tag>
  );
}
