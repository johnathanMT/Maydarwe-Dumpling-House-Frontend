import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';

/**
 * Burmese has no reliable word breaks, so the browser may split a word in two.
 * Break only at the spaces in the copy, and keep punctuation (၊ ? !) on the
 * same line as the word before it.
 * @param {string} text
 * @returns {string[]}
 */
const toPhrases = (text) => text.replace(/ ([?!၊။])/g, ' $1').split(' ');

/**
 * The dumpling mascot says hello: a small frosted-glass cloud that springs in
 * one second after the page loads. It sits on the top edge of the frame, so
 * the food photo stays visible, and the photo shows through the sky-blue glass.
 * Its tighter top-left corner points back at the mascot.
 * Visitors who prefer reduced motion get a plain fade (MotionConfig in App.jsx).
 */
export default function MascotGreeting() {
  const { t } = useTranslation();
  return (
    <m.p
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      style={{ transformOrigin: 'top left' }}
      className="absolute -top-3 left-[3.4rem] z-20 max-w-[11.5rem] rounded-[1.75rem] rounded-tl-lg border border-white/60 bg-gradient-to-br from-sky-100/75 via-sky-200/65 to-sky-300/55 px-3.5 py-2.5 text-xs font-semibold leading-[1.65] text-ink-950 shadow-lg shadow-sky-900/15 backdrop-blur-md backdrop-saturate-150 text-balance [text-shadow:0_1px_0_rgb(255_255_255/0.55)] sm:-top-4 sm:left-[4.5rem] sm:max-w-[13.5rem] sm:px-4 sm:py-3 sm:text-sm"
    >
      {toPhrases(t('pages.home.mascotGreeting')).map((phrase, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="whitespace-nowrap">{phrase}</span>
        </Fragment>
      ))}
    </m.p>
  );
}
