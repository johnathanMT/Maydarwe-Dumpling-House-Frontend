import { m } from 'framer-motion';
import { fadeUp, stagger } from '../../lib/motion';

const VIEWPORT = { once: true, amount: 0.2 };

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as = 'div', distance = 18, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={fadeUp(distance)} {...rest}>
      {children}
    </Tag>
  );
}

/** A list whose <RevealItem> children enter one after another. */
export function RevealGroup({ as = 'ul', step = 0.08, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(step)} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'li', distance = 18, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={fadeUp(distance)} {...rest}>
      {children}
    </Tag>
  );
}
