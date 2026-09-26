import Eyebrow from './Eyebrow';

/**
 * Dark lacquer header shared by Menu, About and Contact.
 * Plays a short CSS entrance (no JS needed, so it never delays first paint).
 */
export default function PageHeader({ kicker, title, subtitle, children }) {
  return (
    <div className="relative overflow-hidden bg-lacquer text-brand-pearl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="animate-rise">
          <Eyebrow tone="dark" rule>
            {kicker}
          </Eyebrow>
        </div>
        <h1 className="mt-4 max-w-3xl animate-rise-still text-balance font-display text-4xl font-semibold leading-[1.1] text-brand-pearl [animation-delay:60ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl animate-rise text-lg text-brand-pearl/75 [animation-delay:140ms]">{subtitle}</p>
        ) : null}
        {children ? <div className="animate-rise [animation-delay:200ms]">{children}</div> : null}
      </div>
      <div aria-hidden="true" className="gold-rule" />
    </div>
  );
}
