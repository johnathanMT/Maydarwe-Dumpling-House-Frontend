import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/** @type {Record<'light' | 'dark', string>} */
const TONES = {
  light: 'text-primary-700 hover:text-primary-800',
  dark: 'text-butter hover:text-butter-200',
};

/**
 * "See the full menu →": a text link whose arrow nudges on hover.
 * @param {object} props
 * @param {import('react-router-dom').To} props.to
 * @param {'light' | 'dark'} [props.tone] 'dark' on ink (black) backgrounds.
 * @param {string} [props.className]
 * @param {import('react').ReactNode} [props.children]
 */
export default function ArrowLink({ to, tone = 'light', className = '', children }) {
  return (
    <Link to={to} className={`group inline-flex min-h-12 items-center gap-2 text-sm font-semibold ${TONES[tone]} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
