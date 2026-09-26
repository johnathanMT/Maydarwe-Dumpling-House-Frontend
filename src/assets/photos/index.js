/**
 * Dish photos. Official plates come from Cloudinary (`./remote.js`);
 * a few remaining dishes still use local vite-imagetools files.
 * Each value is a `picture` object: { sources: { avif, webp, jpeg }, img: { src, w, h } }.
 */
import prawnPanFried from './prawn-pan-fried.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import { DISH_PHOTOS } from './remote.js';

/** @import { Picture } from '../../types' */

/**
 * Keyed by `photo` on MENU_ITEMS.
 * @type {Record<string, Picture>}
 */
export const PHOTOS = {
  porkPanFried: DISH_PHOTOS.porkPotStuck,
  chickenPanFried: DISH_PHOTOS.chickenPotStuck,
  hotSourDumpling: DISH_PHOTOS.hotSourDumpling,
  malaBoiledDumpling: DISH_PHOTOS.malaBoiledDumpling,
  malaXiangGuo: DISH_PHOTOS.malaXiangGuo,
  malaChickenFeet: DISH_PHOTOS.malaChickenFeet,
  spicyNoodleSalad: DISH_PHOTOS.spicyNoodleSalad,
  claypotNoodle: DISH_PHOTOS.claypotMeeShay,
  kwayTeow: DISH_PHOTOS.kwayTeow,
  shanNoodles: DISH_PHOTOS.shanNoodles,
  meeShaySalad: DISH_PHOTOS.meeShaySalad,
  garlicOilNoodles: DISH_PHOTOS.garlicOilNoodles,
  blackChickenMala: DISH_PHOTOS.blackChickenMala,
};

/**
 * About page photo: golden prawn dumplings in the pan. (The home hero photo is on Cloudinary: see ./remote.js)
 * @type {Picture}
 */
export const ABOUT_PHOTO = prawnPanFried;

/**
 * The photo for a dish's `photo` key, or undefined when the dish has none
 * (the card then shows its coloured placeholder).
 * @param {string | undefined} key
 * @returns {import('../../types').Picture | undefined}
 */
export function photoFor(key) {
  return key ? PHOTOS[key] : undefined;
}
