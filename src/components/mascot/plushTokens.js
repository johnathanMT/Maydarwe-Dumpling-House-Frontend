/**
 * Colours and framings shared by the plush mascot and the icons built on it.
 * Kept apart from DumplingPlush.jsx so that file exports only components
 * (React Fast Refresh can then hot-reload it without a full page reload).
 */

export const PLUSH_COLORS = {
  outline: '#D8993A',
  fold: '#E6AE4E',
  face: '#141110',
  steam: '#E8A006',
  red: '#C8102E',
};

/** Square framing with room above the body for an accessory. */
export const PLUSH_VIEWBOX_ROOMY = '4 4 112 112';
