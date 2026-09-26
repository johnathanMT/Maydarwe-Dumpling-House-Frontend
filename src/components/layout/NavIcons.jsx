/**
 * The shop's cartoon dumpling icons (bottom navigation, and as friendly
 * "stickers" elsewhere). Hand-drawn SVG, no external assets.
 */

export function DumplingHomeIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="30" rx="16" ry="11" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M10 27 C14 14, 34 14, 38 27" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <path d="M16 24 C20 20, 28 20, 32 24" fill="none" stroke="#C77A02" strokeWidth="1.6" />
      <circle cx="19" cy="29" r="1.5" fill="#141110" />
      <circle cx="29" cy="29" r="1.5" fill="#141110" />
      <path d="M20 33 C22 35, 26 35, 28 33" fill="none" stroke="#141110" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.5" cy="32" r="1.4" fill="#F4A7B9" />
      <circle cx="31.5" cy="32" r="1.4" fill="#F4A7B9" />
    </svg>
  );
}

export function DumplingMenuIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="32" rx="15" ry="10" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M11 29 C15 17, 33 17, 37 29" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <path d="M18 22 C19 12, 21 8, 21 6" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 20 C24 11, 26 7, 26 5" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M30 22 C31 13, 32 9, 33 7" fill="none" stroke="#E8A006" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="17" y="28" width="14" height="9" rx="2" fill="#FFF8E6" stroke="#141110" strokeWidth="1.6" />
      <path d="M20 31 H28 M20 34 H26" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DumplingAboutIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="33" rx="15" ry="9.5" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M11 30 C15 19, 33 19, 37 30" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <ellipse cx="24" cy="16" rx="11" ry="4" fill="#fff" stroke="#141110" strokeWidth="2" />
      <path d="M15 16 C15 8, 20 5, 24 4 C28 5, 33 8, 33 16" fill="#fff" stroke="#141110" strokeWidth="2" />
      <ellipse cx="24" cy="4.5" rx="4" ry="2.6" fill="#fff" stroke="#141110" strokeWidth="1.8" />
      <circle cx="19.5" cy="30" r="1.4" fill="#141110" />
      <circle cx="28.5" cy="30" r="1.4" fill="#141110" />
      <path d="M21 34 C22.5 35.5, 25.5 35.5, 27 34" fill="none" stroke="#141110" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function DumplingContactIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="22" cy="31" rx="14" ry="10" fill="#F5C14A" stroke="#141110" strokeWidth="2.2" />
      <path d="M10 28 C14 16, 30 16, 34 28" fill="#FFE588" stroke="#141110" strokeWidth="2.2" />
      <circle cx="18" cy="29" r="1.4" fill="#141110" />
      <circle cx="26" cy="29" r="1.4" fill="#141110" />
      <path d="M19 33 C21 35, 24 35, 26 33" fill="none" stroke="#141110" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M34 18 C34 14, 40 14, 40 18 C40 23, 34 26, 34 26 C34 26, 28 23, 28 18 C28 14, 34 14, 34 18 Z"
        fill="#C8102E"
        stroke="#141110"
        strokeWidth="1.7"
      />
      <circle cx="34" cy="18.5" r="1.3" fill="#FFE588" />
    </svg>
  );
}

/** Route → icon, used by <BottomNav>. */
export const NAV_ICONS = {
  '/': DumplingHomeIcon,
  '/menu': DumplingMenuIcon,
  '/about': DumplingAboutIcon,
  '/contact': DumplingContactIcon,
};
