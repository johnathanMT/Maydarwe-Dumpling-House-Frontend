import { pickLocale } from '../data/menu';

/** @import { CartLine, Language } from '../types' */

/**
 * "1x Chicken, 2x Pork" from cart lines, in the guest's language.
 * @param {Pick<CartLine, 'quantity' | 'name'>[]} lines
 * @param {Language} language
 * @returns {string}
 */
export function formatOrderItems(lines, language) {
  return lines.map((line) => `${line.quantity}x ${pickLocale(line.name, language)}`).join(', ');
}
