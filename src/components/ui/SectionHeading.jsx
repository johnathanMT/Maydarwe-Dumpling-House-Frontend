import Eyebrow from './Eyebrow';
import { Reveal } from './Reveal';

/**
 * Eyebrow + heading (+ optional action on the right), revealed on scroll.
 * tone="dark" on ink (black) sections.
 */
export default function SectionHeading({ eyebrow, title, tone = 'light', action = null, as: Heading = 'h2', className = '' }) {
  const titleColor = tone === 'dark' ? 'text-ivory' : 'text-ink-950';
  return (
    <Reveal className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-end ${className}`}>
      <div>
        <Eyebrow tone={tone} rule>
          {eyebrow}
        </Eyebrow>
        <Heading className={`mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl ${titleColor}`}>{title}</Heading>
      </div>
      {action}
    </Reveal>
  );
}
