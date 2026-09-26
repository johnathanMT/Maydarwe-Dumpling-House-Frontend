import { Flame, Soup, Wheat } from 'lucide-react';

/** @import { CategoryId } from '../../types' */

/**
 * Icon per menu category id (kept out of src/data so the data stays plain JS).
 * @type {Record<CategoryId, import('react').ComponentType<{ className?: string, strokeWidth?: number }>>}
 */
export const CATEGORY_ICONS = {
  dumplings: Soup,
  mala: Flame,
  noodles: Wheat,
};
