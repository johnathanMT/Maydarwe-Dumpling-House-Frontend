/**
 * The shop's dumpling mascot icons (bottom navigation, and as a friendly
 * "sticker" in the hero). All four share the same plush dumpling; each tab adds
 * one small accessory so they're easy to tell apart. Pure SVG, no assets.
 */
import DumplingPlush, { PLUSH_COLORS, PLUSH_VIEWBOX_ROOMY } from '../mascot/DumplingPlush';

// Icons render at ~28px, so the outline is drawn a little thicker than on large art.
const ICON_STROKE = 3;

/**
 * Home: the plain dumpling.
 * @param {{ className?: string }} props
 */
export function DumplingHomeIcon({ className = 'h-7 w-7' }) {
  return <DumplingPlush className={className} strokeWidth={ICON_STROKE} />;
}

/**
 * Menu: fresh from the pan, with three curls of steam.
 * @param {{ className?: string }} props
 */
function DumplingMenuIcon({ className = 'h-7 w-7' }) {
  return (
    <DumplingPlush className={className} viewBox={PLUSH_VIEWBOX_ROOMY} strokeWidth={ICON_STROKE}>
      <g fill="none" stroke={PLUSH_COLORS.steam} strokeWidth="4.5" strokeLinecap="round">
        <path d="M44 34 C40 28 48 24 44 16" />
        <path d="M60 31 C56 25 64 21 60 11" />
        <path d="M76 34 C72 28 80 24 76 16" />
      </g>
    </DumplingPlush>
  );
}

/**
 * About: the dumpling in a little chef's hat.
 * @param {{ className?: string }} props
 */
function DumplingAboutIcon({ className = 'h-7 w-7' }) {
  return (
    <DumplingPlush className={className} viewBox={PLUSH_VIEWBOX_ROOMY} strokeWidth={ICON_STROKE}>
      <g fill="#fff" stroke={PLUSH_COLORS.outline} strokeWidth={ICON_STROKE} strokeLinejoin="round">
        <path d="M45 33 C36 31 36 16 47 17 C48 8 59 6 62 13 C68 6 81 10 78 19 C86 21 85 32 75 33 Z" />
        <rect x="44" y="31" width="32" height="10" rx="3" />
      </g>
    </DumplingPlush>
  );
}

/**
 * Contact: the dumpling with a small red heart.
 * @param {{ className?: string }} props
 */
function DumplingContactIcon({ className = 'h-7 w-7' }) {
  return (
    <DumplingPlush className={className} viewBox={PLUSH_VIEWBOX_ROOMY} strokeWidth={ICON_STROKE}>
      <path
        d="M92 23 C92 16 102 16 102 24 C102 31 92 37 92 37 C92 37 82 31 82 24 C82 16 92 16 92 23 Z"
        fill={PLUSH_COLORS.red}
      />
      <circle cx="87.5" cy="22.5" r="2.2" fill="#fff" opacity="0.8" />
    </DumplingPlush>
  );
}

/**
 * Route → icon, used by <BottomNav>.
 * @type {Record<string, import('react').ComponentType<{ className?: string }>>}
 */
export const NAV_ICONS = {
  '/': DumplingHomeIcon,
  '/menu': DumplingMenuIcon,
  '/about': DumplingAboutIcon,
  '/contact': DumplingContactIcon,
};
