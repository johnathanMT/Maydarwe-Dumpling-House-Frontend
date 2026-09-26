/**
 * Minimal line icons for a dish's main meat, shown as a badge on menu photos.
 * 24 × 24, drawn with `currentColor` so the colour comes from the text class.
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function MeatSvg({ className, children }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...STROKE}>
      {children}
    </svg>
  );
}

/** A curled prawn: head, antennae, three shell segments and a tail fan. */
export function PrawnIcon({ className = 'h-6 w-6' }) {
  return (
    <MeatSvg className={className}>
      <path d="M16.8 5 C9.8 4.4 4.6 9.2 5 15.2 C5.3 19 8.5 21.2 12 20.3 L12.6 17.3 C10 17.8 8.2 16.3 8.2 14.6 C8.1 10.8 11.8 8.6 16.4 9 C18.8 9.4 20.9 8.4 22 6.9 C20.5 5.3 18.6 4.8 16.8 5 Z" />
      <path d="M20.4 5.7 C21.1 3.9 21.9 2.8 23 2 M21.4 6.3 C22.2 5.7 22.7 5.4 23.2 5.3" />
      <path d="M12.3 18.8 C14 17.1 15.8 16.7 16.9 17.2 C16.4 18.6 16.6 20.2 16 21.4 C14.8 21 13.4 20.2 12.3 18.8 Z" />
      <path d="M8.4 8.1 L10.6 10.5 M5.3 12.4 L8.3 13.3 M5.9 17.2 L8.8 16" />
      <circle cx="17.6" cy="7" r="0.95" fill="currentColor" stroke="none" />
    </MeatSvg>
  );
}

/** A pig's face: pointed ears, two dot eyes and a round snout. */
export function PorkIcon({ className = 'h-6 w-6' }) {
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

/** A chicken's head in profile: comb, beak and wattle. */
export function ChickenIcon({ className = 'h-6 w-6' }) {
  return (
    <MeatSvg className={className}>
      <path d="M6.8 20.5 C6 15.6 7 10.8 10.4 9 C13.6 7.3 17.5 8.6 18.2 12 L21.2 13.3 L18.2 14.6 C18 17.3 16.8 19.2 15.8 20.5 Z" />
      <path d="M9.6 9.6 C8.6 7.4 10.2 5.6 11.8 6.9 C11.9 4.6 14.6 4.3 15 6.5 C16.4 5.6 18.1 6.9 17 8.9" fill="currentColor" />
      <path d="M18.2 14.6 C18.7 16.8 16.8 17.6 16.3 15.7" fill="currentColor" />
      <circle cx="14.4" cy="11.2" r="1" fill="currentColor" stroke="none" />
    </MeatSvg>
  );
}

/** meatType (from src/data/menu.js) → icon, colour and translated label. */
export const MEAT_TYPES = {
  prawn: { Icon: PrawnIcon, color: 'text-primary-600', labelKey: 'pages.menu.meat.prawn' },
  pork: { Icon: PorkIcon, color: 'text-blue-800', labelKey: 'pages.menu.meat.pork' },
  chicken: { Icon: ChickenIcon, color: 'text-yellow-500', labelKey: 'pages.menu.meat.chicken' },
};
