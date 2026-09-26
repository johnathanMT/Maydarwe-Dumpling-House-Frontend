import Eyebrow from './Eyebrow';

/**
 * Sunny header shared by Menu, About and Contact: butter yellow melting into ivory.
 * Plays a short CSS entrance (no JS needed, so it never delays first paint).
 * `sticker` is an optional small illustration shown at the right on wider screens.
 * @param {object} props
 * @param {import('react').ReactNode} props.kicker
 * @param {import('react').ReactNode} props.title
 * @param {import('react').ReactNode} [props.subtitle]
 * @param {import('react').ReactNode} [props.sticker]
 * @param {import('react').ReactNode} [props.children]
 */
export default function PageHeader({ kicker, title, subtitle, sticker = null, children }) {
  return (
    <div className="relative overflow-hidden bg-sunny">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="animate-rise">
          <Eyebrow rule>{kicker}</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-3xl animate-rise-still text-balance font-display text-4xl font-semibold leading-[1.1] text-ink-950 [animation-delay:60ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-ink-700 [animation-delay:140ms]">{subtitle}</p>
        ) : null}
        {children ? <div className="animate-rise [animation-delay:200ms]">{children}</div> : null}

        {sticker ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 hidden animate-rise [animation-delay:240ms] md:block lg:right-10"
          >
            {sticker}
          </div>
        ) : null}
      </div>
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-butter-400 to-transparent" />
    </div>
  );
}
