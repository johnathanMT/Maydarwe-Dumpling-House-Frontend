import { pickLocale } from '../data/menu';

/** "1x Chicken, 2x Pork" from cart lines, in the guest's language. */
export function formatOrderItems(lines, language) {
  return lines.map((line) => `${line.quantity}x ${pickLocale(line.name, language)}`).join(', ');
}
