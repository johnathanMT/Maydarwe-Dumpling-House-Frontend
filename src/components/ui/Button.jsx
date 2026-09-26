import MagneticWrapper from './MagneticWrapper';

/**
 * The site's one button style, rendered as <button>, <a> or a router <Link>.
 *
 *   <Button onClick={…}>Order</Button>
 *   <Button as={Link} to="/menu" variant="secondary">View menu</Button>
 *   <Button as="a" href="tel:…" block>Call</Button>
 *
 * Variants by background:
 *   ivory / butter surfaces → primary (red) · secondary (white + gold ring) · outline · dark (ink) · butter
 *   red panels              → light · ghostLight
 */
const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-semibold transition-[color,background-color,box-shadow,transform] duration-200 ease-out-soft disabled:cursor-not-allowed disabled:opacity-60';

/** @typedef {keyof typeof BUTTON_VARIANTS} ButtonVariant */
/** @typedef {keyof typeof SIZES} ButtonSize */

const BUTTON_VARIANTS = {
  primary: 'bg-primary-600 text-white shadow-cta hover:bg-primary-700',
  secondary: 'bg-white text-secondary-800 ring-2 ring-inset ring-secondary-500 hover:bg-secondary-50',
  outline: 'text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-secondary-400',
  dark: 'bg-ink-950 text-white hover:bg-ink-800',
  butter: 'bg-butter text-ink-950 shadow-[0_3px_0_theme(colors.secondary.500)] hover:bg-butter-400',
  light: 'bg-white text-primary-700 hover:bg-secondary-50',
  ghostLight: 'text-white ring-1 ring-inset ring-white/40 hover:bg-white/10',
};

const SIZES = {
  sm: 'px-5 text-sm',
  md: 'px-6 text-base',
};

/**
 * @typedef {object} ButtonOwnProps
 * @property {import('react').ElementType} [as] 'button' (default), 'a', or a component such as router <Link>.
 * @property {ButtonVariant} [variant]
 * @property {ButtonSize} [size]
 * @property {boolean} [block] Full width.
 * @property {boolean} [magnetic] Wrap in <MagneticWrapper>.
 * @property {string} [className]
 * @property {import('react').ReactNode} [children]
 * @property {import('react-router-dom').To} [to] For as={Link}.
 * @property {boolean} [reloadDocument] For as={Link}.
 */

/**
 * @typedef {ButtonOwnProps
 *   & Omit<import('react').ButtonHTMLAttributes<HTMLElement>, keyof ButtonOwnProps>
 *   & Omit<import('react').AnchorHTMLAttributes<HTMLElement>, keyof ButtonOwnProps>} ButtonProps
 */

/**
 * What reaches the rendered element: everything except Button's own styling props.
 * @typedef {Omit<ButtonProps, 'as' | 'variant' | 'size' | 'block' | 'magnetic'>} ButtonElementProps
 */

/** @param {ButtonProps} props */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  magnetic = false,
  className = '',
  type,
  children,
  ...props
}) {
  const classes = [BASE, BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary, SIZES[size] ?? SIZES.md, block ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  // `as` accepts any element type; callers pass one that takes these props (e.g. `to` with Link).
  const Tag = /** @type {import('react').ElementType<ButtonElementProps>} */ (Component);
  const control = (
    <Tag className={classes} type={Component === 'button' ? type ?? 'button' : type} {...props}>
      {children}
    </Tag>
  );

  if (!magnetic) return control;

  return <MagneticWrapper className={block ? 'flex w-full' : 'inline-flex'}>{control}</MagneticWrapper>;
}
