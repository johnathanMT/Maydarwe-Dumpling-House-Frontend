import { ChickenIcon, PorkIcon, PrawnIcon } from './meatIcons';

/** @import { MeatType } from '../../types' */
/** @import { MeatIconProps } from './meatIcons' */

/**
 * One entry of MEAT_TYPES.
 * @typedef {object} MeatBadgeSpec
 * @property {import('react').ComponentType<MeatIconProps>} Icon
 * @property {string} color Tailwind text colour class.
 * @property {string} labelKey Translation key for the meat's name.
 */

/**
 * meatType (from src/data/menu.js) → icon, colour and translated label.
 * @type {Record<MeatType, MeatBadgeSpec>}
 */
export const MEAT_TYPES = {
  prawn: { Icon: PrawnIcon, color: 'text-primary-600', labelKey: 'pages.menu.meat.prawn' },
  pork: { Icon: PorkIcon, color: 'text-blue-800', labelKey: 'pages.menu.meat.pork' },
  chicken: { Icon: ChickenIcon, color: 'text-yellow-500', labelKey: 'pages.menu.meat.chicken' },
};
