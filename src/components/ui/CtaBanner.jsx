import Eyebrow from './Eyebrow';
import { Reveal } from './Reveal';

/**
 * Red call-to-action panel used at the foot of Home and Contact.
 * Put <Button variant="light"> / <Button variant="ghostLight"> in `children`.
 */
export default function CtaBanner({ eyebrow, title, body, children, className = '' }) {
  return (
    <Reveal
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-6 py-16 text-white shadow-lift sm:px-10 md:flex md:items-center md:justify-between md:gap-10 lg:px-16 lg:py-24 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary-400/20 blur-3xl" />
      <div className="relative">
        {eyebrow ? <Eyebrow className="!text-butter-200">{eyebrow}</Eyebrow> : null}
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        {body ? <p className="mt-3 max-w-xl leading-relaxed text-primary-50/90">{body}</p> : null}
      </div>
      <div className="relative mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">{children}</div>
    </Reveal>
  );
}
