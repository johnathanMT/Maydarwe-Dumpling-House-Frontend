/**
 * Minimal icons for a dish's main meat, shown as a badge on menu photos.
 * Drawn with `currentColor` so the colour comes from the text class.
 */

/** @import { MeatType } from '../../types' */

/**
 * Props shared by every meat icon.
 * @typedef {object} MeatIconProps
 * @property {string} [className]
 */

/**
 * One entry of MEAT_TYPES.
 * @typedef {object} MeatBadgeSpec
 * @property {import('react').ComponentType<MeatIconProps>} Icon
 * @property {string} color Tailwind text colour class.
 * @property {string} labelKey Translation key for the meat's name.
 */

/** @type {import('react').SVGProps<SVGSVGElement>} */
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/**
 * Shared 24×24 outline <svg> wrapper for the meat icons.
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').ReactNode} [props.children]
 */
function MeatSvg({ className, children }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...STROKE}>
      {children}
    </svg>
  );
}

/**
 * A lobster's head: filled carapace, stalked eyes and two antennae.
 * @param {MeatIconProps} props
 */
function PrawnIcon({ className = 'h-6 w-6' }) {
  return (
    <MeatSvg className={className}>
      <path d="M8.8 8.8C6.2 4.6 4.8 3 3 2.6" />
      <path d="M15.2 8.8C17.8 4.6 19.2 3 21 2.6" />
      <path d="M9.2 8.4L8.3 6" />
      <path d="M14.8 8.4L15.7 6" />
      <circle cx="8.1" cy="5.3" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15.9" cy="5.3" r="1.3" fill="currentColor" stroke="none" />
      <path
        d="M7 11.2C6.8 7.6 9 5.9 12 5.9C15 5.9 17.2 7.6 17 11.2C16.8 15.8 14.6 19.5 12 20.7C9.4 19.5 7.2 15.8 7 11.2Z"
        fill="currentColor"
      />
    </MeatSvg>
  );
}

/**
 * A pig's face: pointed ears, two dot eyes and a round snout.
 * @param {MeatIconProps} props
 */
function PorkIcon({ className = 'h-6 w-6' }) {
  return (
    <MeatSvg className={className}>
      <path d="M7 8.6 L5 3.8 L10 5.9 M17 8.6 L19 3.8 L14 5.9" />
      <ellipse cx="12" cy="13" rx="8" ry="7.2" />
      <ellipse cx="12" cy="15.2" rx="3.4" ry="2.4" />
      <circle cx="10.8" cy="15.2" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="15.2" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8.9" cy="11.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.1" cy="11.3" r="1" fill="currentColor" stroke="none" />
    </MeatSvg>
  );
}

/**
 * A chicken's head in profile: comb, beak and wattle.
 * @param {MeatIconProps} props
 */
function ChickenIcon({ className = 'h-6 w-6' }) {
  return (
    <MeatSvg className={className}>
      <path d="M6.8 20.5 C6 15.6 7 10.8 10.4 9 C13.6 7.3 17.5 8.6 18.2 12 L21.2 13.3 L18.2 14.6 C18 17.3 16.8 19.2 15.8 20.5 Z" />
      <path d="M9.6 9.6 C8.6 7.4 10.2 5.6 11.8 6.9 C11.9 4.6 14.6 4.3 15 6.5 C16.4 5.6 18.1 6.9 17 8.9" fill="currentColor" />
      <path d="M18.2 14.6 C18.7 16.8 16.8 17.6 16.3 15.7" fill="currentColor" />
      <circle cx="14.4" cy="11.2" r="1" fill="currentColor" stroke="none" />
    </MeatSvg>
  );
}

/**
 * meatType (from src/data/menu.js) → icon, colour and translated label.
 * @type {Record<MeatType, MeatBadgeSpec>}
 */
export const MEAT_TYPES = {
  prawn: { Icon: PrawnIcon, color: 'text-primary-600', labelKey: 'pages.menu.meat.prawn' },
  pork: { Icon: PorkIcon, color: 'text-blue-800', labelKey: 'pages.menu.meat.pork' },
  chicken: { Icon: ChickenIcon, color: 'text-yellow-500', labelKey: 'pages.menu.meat.chicken' },
};
