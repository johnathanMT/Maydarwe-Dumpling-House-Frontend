// Shared data shapes for the whole site, as JSDoc types checked by
// `npm run typecheck` (TypeScript reading plain JavaScript; nothing is compiled).
// Import them in any file with a JSDoc comment containing:
//   @import { MenuItem } from '../types'

/** @typedef {'en' | 'my'} Language */

/**
 * Text in both site languages.
 * @typedef {{ en: string, my: string }} Localized
 */

/** @typedef {'dumplings' | 'mala' | 'noodles'} CategoryId */
/** @typedef {'prawn' | 'pork' | 'chicken'} MeatType */

/**
 * One dish on the menu (src/data/menu.js).
 * @typedef {object} MenuItem
 * @property {string} id Lowercase slug, also the cart key.
 * @property {CategoryId} category
 * @property {MeatType | null} meatType Shown as a badge on the photo; null = no single main meat.
 * @property {number} price In Myanmar kyat.
 * @property {boolean} inStock
 * @property {boolean} [featured] Shown in "House favourites" on the home page.
 * @property {string} [photo] Key in PHOTOS (src/assets/photos/index.js); without one the card shows a coloured placeholder.
 * @property {Localized} name
 * @property {Localized} blurb
 * @property {Localized} [note] Small extra line under the blurb (e.g. "ask for extra chili").
 */

/**
 * @typedef {object} Category
 * @property {CategoryId} id
 * @property {Localized} title
 * @property {Localized} caption
 */

/**
 * What localStorage keeps for the cart: ids and quantities only.
 * @typedef {{ id: string, quantity: number }} CartEntry
 */

/**
 * A cart row ready to render; name, price and photo always come from the menu.
 * @typedef {object} CartLine
 * @property {string} id
 * @property {number} quantity
 * @property {Localized} name
 * @property {number} price
 * @property {string} [photo]
 */

/**
 * @typedef {object} CartState
 * @property {CartLine[]} lines
 * @property {number} count Total number of items.
 * @property {number} subtotal In kyat.
 */

/**
 * @typedef {object} CartActions
 * @property {(item: Pick<MenuItem, 'id'>) => void} addItem
 * @property {(id: string, quantity: number) => void} updateQuantity
 * @property {(id: string) => void} removeItem
 * @property {() => void} clearCart
 */

/**
 * A responsive image as produced by vite-imagetools (`?as=picture`) or by
 * cloudinaryPicture() in src/assets/photos/remote.js.
 * @typedef {object} Picture
 * @property {Partial<Record<'avif' | 'webp' | 'jpeg' | 'jpg' | 'png', string>>} sources srcset per format.
 * @property {{ src: string, w?: number, h?: number }} img Fallback <img>.
 */

/**
 * @typedef {object} ToastPayload
 * @property {string} id
 * @property {Localized} name
 */

export {};
