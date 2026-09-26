/**
 * Photos hosted on Cloudinary, shaped like the vite-imagetools `picture`
 * objects so <OptimizedImage> treats them the same way.
 *
 * Cloudinary resizes and converts on the fly from the URL:
 *   f_avif / f_webp / f_jpg → format · q_auto → smart quality
 *   c_limit,w_N            → at most N px wide, never enlarged
 */
const CLOUD = 'https://res.cloudinary.com/dhlhzmmtt/image/upload';

function cloudinaryPicture({ version, publicId, width, height, widths }) {
  const url = (format, w) => `${CLOUD}/f_${format},q_auto,c_limit,w_${w}/${version}/${publicId}`;
  const srcset = (format) => widths.map((w) => `${url(format, w)} ${w}w`).join(', ');
  return {
    sources: { avif: srcset('avif'), webp: srcset('webp'), jpeg: srcset('jpg') },
    img: { src: url('jpg', widths[widths.length - 1]), w: width, h: height },
  };
}

const CARD_WIDTHS = [360, 720, 960];

/** Official dish plates. Keys match `photo` on MENU_ITEMS. */
export const DISH_PHOTOS = {
  chickenPotStuck: cloudinaryPicture({
    version: 'v1790345037',
    publicId: 'IMG_7925_txkyjj.jpg',
    width: 2064,
    height: 2192,
    widths: CARD_WIDTHS,
  }),
  blackChickenMala: cloudinaryPicture({
    version: 'v1790345036',
    publicId: 'IMG_7923_vhenho.jpg',
    width: 896,
    height: 1195,
    widths: [360, 720, 896],
  }),
  porkPotStuck: cloudinaryPicture({
    version: 'v1790345036',
    publicId: 'IMG_7926_s3clwe.jpg',
    width: 1008,
    height: 1068,
    widths: [360, 720, 1008],
  }),
  spicyNoodleSalad: cloudinaryPicture({
    version: 'v1790345037',
    publicId: 'IMG_7924_pgfjwo.jpg',
    width: 896,
    height: 1195,
    widths: [360, 720, 896],
  }),
  malaChickenFeet: cloudinaryPicture({
    version: 'v1790345035',
    publicId: 'IMG_7927_s52kgg.jpg',
    width: 1024,
    height: 1024,
    widths: [360, 720, 1024],
  }),
  spicyNoodleDumpling: cloudinaryPicture({
    version: 'v1790345036',
    publicId: 'IMG_7922_cpg939.jpg',
    width: 896,
    height: 1195,
    widths: [360, 720, 896],
  }),
};

/** Menu accordion: six house dishes, shown in this order. */
export const MENU_GALLERY = [
  {
    name: 'ကြက်သားဖက်ထုပ်အိုးကပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345037/IMG_7925_txkyjj.jpg',
  },
  {
    name: 'ကြက်မဲမာလာ',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345036/IMG_7923_vhenho.jpg',
  },
  {
    name: 'ဝက်သားဖက်ထုပ်အိုးကပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345036/IMG_7926_s3clwe.jpg',
  },
  {
    name: 'စပိုက်ဆီခေါက်ဆွဲသုပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345037/IMG_7924_pgfjwo.jpg',
  },
  {
    name: 'ကြက်ခြေထောက်မာလာ',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345035/IMG_7927_s52kgg.jpg',
  },
  {
    name: 'စပိုက်ဆီခေါက်ဆွဲ ဖက်ထုပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345036/IMG_7922_cpg939.jpg',
  },
];

/** Home cinematic reel, played edge-to-edge above the signature dishes. */
export const HOME_REEL_SRC =
  'https://res.cloudinary.com/dhlhzmmtt/video/upload/v1790345459/image-to-video/i2v_0a18f0607e7841f1987cf6bb2d5cb31f.mp4';

/** Home hero: pork pan-fried dumplings (IMG_7926, 1008 × 1068 original). */
export const HERO_PHOTO_REMOTE = cloudinaryPicture({
  version: 'v1790345036',
  publicId: 'IMG_7926_s3clwe.jpg',
  width: 1008,
  height: 1068,
  widths: [360, 720, 1008],
});
