import { useId } from 'react';

/**
 * The shop mascot: a soft, plush pan-fried dumpling with a pleated top and a
 * tiny "• _ •" face. Cream body with a golden edge, so it reads on ivory, white
 * and butter-yellow backgrounds alike.
 *
 * Drawn in a 120 × 120 space. The body sits in x 15–105, y 39–110; the area
 * above it (y 0–39) is free for accessories such as steam or a chef hat.
 */

const BODY = 'M15 92 C15 63 35 47 60 47 C85 47 105 63 105 92 C105 102 89 106 60 106 C31 106 15 102 15 92 Z';
const PLEATS =
  'M22 71.8 Q17 61 28.8 62.4 Q26.8 50.7 37.9 55.1 Q39.1 43.3 48.5 50.6 Q52.9 39.5 60 49 Q67.1 39.5 71.5 50.6 Q80.9 43.3 82.1 55.1 Q93.2 50.7 91.2 62.4 Q103 61 98 71.8 Q60 55 22 71.8 Z';
const FOLDS =
  'M28.8 62.4 L31.9 68 M37.9 55.1 L39.3 61.3 M48.5 50.6 L48.3 56.9 M60 49 L60 55 M71.5 50.6 L71.7 56.9 M82.1 55.1 L80.7 61.3 M91.2 62.4 L88.1 68';

export const PLUSH_COLORS = {
  outline: '#D8993A',
  fold: '#E6AE4E',
  face: '#141110',
  steam: '#E8A006',
  red: '#C8102E',
};

/** Tight square framing around the body alone. */
const PLUSH_VIEWBOX = '10 23 100 100';
/** Square framing with room above the body for an accessory. */
export const PLUSH_VIEWBOX_ROOMY = '4 4 112 112';

/** Unique, CSS-safe gradient ids, so many mascots can share a page. */
function usePlushIds() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return { body: `plush-body-${id}`, pleats: `plush-pleats-${id}`, shade: `plush-shade-${id}` };
}

/**
 * The dumpling itself as SVG elements (no <svg> wrapper), so it can sit inside a
 * static <svg> or an animated framer-motion <m.svg>.
 * `strokeWidth` is in viewBox units: thicker for small icons, thinner for big art.
 * `groundShadow` draws the warm drop shadow under the body; pass false when the
 * caller animates its own shadow.
 * @param {object} props
 * @param {number} [props.strokeWidth]
 * @param {boolean} [props.groundShadow]
 */
export function PlushBody({ strokeWidth = 2.2, groundShadow = true }) {
  const ids = usePlushIds();
  const { outline, fold, face } = PLUSH_COLORS;

  return (
    <>
      <defs>
        <radialGradient id={ids.body} cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#FFFDF7" />
          <stop offset="0.55" stopColor="#FFF0C4" />
          <stop offset="1" stopColor="#F9CB6B" />
        </radialGradient>
        <linearGradient id={ids.pleats} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFBEF" />
          <stop offset="1" stopColor="#FDDF94" />
        </linearGradient>
        {/* Inner shadow: the bottom of the body warms and darkens, like a soft toy's underside. */}
        <linearGradient id={ids.shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#D98E1F" stopOpacity="0" />
          <stop offset="1" stopColor="#D98E1F" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {groundShadow ? <ellipse cx="60" cy="108" rx="38" ry="4.5" fill="#B8741A" opacity="0.18" /> : null}

      <g stroke={outline} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
        <path d={BODY} fill={`url(#${ids.body})`} />
        <path d={BODY} fill={`url(#${ids.shade})`} stroke="none" />
        <path d={PLEATS} fill={`url(#${ids.pleats})`} />
        <path d={FOLDS} fill="none" stroke={fold} strokeWidth={strokeWidth * 0.8} />
      </g>

      {/* Soft highlight on the upper left, for a squishy 3D feel. */}
      <ellipse cx="36" cy="78" rx="6.5" ry="3.2" transform="rotate(-30 36 78)" fill="#fff" opacity="0.6" />

      {/* Face: two small dots, close together, and a tiny flat mouth. */}
      <circle cx="53.5" cy="85" r="2.9" fill={face} />
      <circle cx="66.5" cy="85" r="2.9" fill={face} />
      <path d="M57.5 92 Q60 92.5 62.5 92" fill="none" stroke={face} strokeWidth="2.2" strokeLinecap="round" />
    </>
  );
}

/**
 * Static mascot. `children` are extra SVG elements drawn on top (steam, a hat…);
 * use PLUSH_VIEWBOX_ROOMY when they sit above the body.
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.viewBox]
 * @param {number} [props.strokeWidth] See PlushBody.
 * @param {boolean} [props.groundShadow] See PlushBody.
 * @param {import('react').ReactNode} [props.children] Extra SVG elements drawn on top.
 */
export default function DumplingPlush({
  className = 'h-7 w-7',
  viewBox = PLUSH_VIEWBOX,
  strokeWidth,
  groundShadow,
  children,
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false">
      <PlushBody strokeWidth={strokeWidth} groundShadow={groundShadow} />
      {children}
    </svg>
  );
}
