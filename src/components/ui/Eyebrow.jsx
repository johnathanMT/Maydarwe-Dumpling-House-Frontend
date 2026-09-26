/**
 * Small red label above a heading ("HOUSE FAVORITES").
 * tone="dark" for ink (black) backgrounds such as the footer. `rule` adds a short line before it.
 * @param {object} props
 * @param {import('react').ReactNode} [props.children]
 * @param {'light' | 'dark'} [props.tone]
 * @param {boolean} [props.rule]
 * @param {string} [props.className]
 * @param {'p' | 'span' | 'div'} [props.as]
 */
export default function Eyebrow({ children, tone = 'light', rule = false, className = '', as: Tag = 'p' }) {
  const color = tone === 'dark' ? 'text-butter' : 'text-primary-600';
  return (
    <Tag
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] sm:text-[0.8rem] ${color} ${className}`}
    >
      {rule ? <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" /> : null}
      {children}
    </Tag>
  );
}
