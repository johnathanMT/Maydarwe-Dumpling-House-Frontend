/**
 * Dish photos, processed at build time by vite-imagetools into AVIF, WebP
 * and JPEG at several widths (never enlarged past the original). Each
 * import is a `picture` object: { sources: { avif, webp, jpeg }, img: { src, w, h } }.
 * Output files get content hashes, so they can be cached for a year.
 *
 * To add a photo: drop a .jpg in this folder (lowercase extension),
 * import it below with the same query, and reference its key from
 * `photo:` in src/data/menu.js.
 */
import prawnPanFried from './prawn-pan-fried.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import porkPanFried from './pork-pan-fried.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import chickenPanFried from './chicken-pan-fried.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import malaXiangGuo from './mala-xiang-guo.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import malaChickenFeet from './mala-chicken-feet.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import spicyNoodleSalad from './spicy-noodle-salad.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import claypotNoodle from './claypot-noodle.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';

export const PHOTOS = {
  prawnPanFried,
  porkPanFried,
  chickenPanFried,
  malaXiangGuo,
  malaChickenFeet,
  spicyNoodleSalad,
  claypotNoodle,
};

/** About page photo: golden prawn dumplings in the pan. (The home hero photo is on Cloudinary: see ./remote.js) */
export const ABOUT_PHOTO = prawnPanFried;
