import { m } from 'framer-motion';
import { REVEAL_VIEWPORT, fadeUp, stagger } from '../../lib/motion';

/** @typedef {'div' | 'section' | 'ul' | 'li' | 'footer' | 'article' | 'header' | 'p'} RevealTag */

/**
 * Extra props passed through to the element: motion props, ARIA attributes and an id
 * (the subset every RevealTag accepts).
 * @typedef {Omit<import('framer-motion').MotionProps, 'children'> & import('react').AriaAttributes & { id?: string }} RevealRest
 */

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * @param {{ as?: RevealTag, distance?: number, className?: string, children?: import('react').ReactNode } & RevealRest} props
 */
export function Reveal({ as = 'div', distance = 18, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
      variants={fadeUp(distance)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A list whose <RevealItem> children enter one after another.
 * @param {{ as?: RevealTag, step?: number, className?: string, children?: import('react').ReactNode } & RevealRest} props
 */
export function RevealGroup({ as = 'ul', step = 0.08, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
      variants={stagger(step)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * One child of <RevealGroup>; follows the group's stagger.
 * @param {{ as?: RevealTag, distance?: number, className?: string, children?: import('react').ReactNode } & RevealRest} props
 */
export function RevealItem({ as = 'li', distance = 18, className = '', children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={fadeUp(distance)} {...rest}>
      {children}
    </Tag>
  );
}
