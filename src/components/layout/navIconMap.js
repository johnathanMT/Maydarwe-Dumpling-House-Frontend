import { DumplingAboutIcon, DumplingContactIcon, DumplingHomeIcon, DumplingMenuIcon } from './NavIcons';

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
