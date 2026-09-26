/**
 * Dish photos. Official plates come from Cloudinary (`./remote.js`);
 * a few remaining dishes still use local vite-imagetools files.
 * Each value is a `picture` object: { sources: { avif, webp, jpeg }, img: { src, w, h } }.
 */
import prawnPanFried from './prawn-pan-fried.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import malaXiangGuo from './mala-xiang-guo.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import claypotNoodle from './claypot-noodle.jpg?w=160;360;720;960&format=avif;webp;jpg&as=picture';
import { DISH_PHOTOS } from './remote.js';

export const PHOTOS = {
  prawnPanFried,
  porkPanFried: DISH_PHOTOS.porkPotStuck,
  chickenPanFried: DISH_PHOTOS.chickenPotStuck,
  malaXiangGuo,
  malaChickenFeet: DISH_PHOTOS.malaChickenFeet,
  spicyNoodleSalad: DISH_PHOTOS.spicyNoodleSalad,
  claypotNoodle,
  blackChickenMala: DISH_PHOTOS.blackChickenMala,
  spicyNoodleDumpling: DISH_PHOTOS.spicyNoodleDumpling,
};

/** About page photo: golden prawn dumplings in the pan. (The home hero photo is on Cloudinary: see ./remote.js) */
export const ABOUT_PHOTO = prawnPanFried;
