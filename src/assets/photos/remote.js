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
    version: 'v1790426597',
    publicId: 'IMG_8007_dccuhx.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  hotSourDumpling: cloudinaryPicture({
    version: 'v1790427352',
    publicId: 'IMG_8008_uyurni.jpg',
    width: 1640,
    height: 1465,
    widths: CARD_WIDTHS,
  }),
  malaBoiledDumpling: cloudinaryPicture({
    version: 'v1790428670',
    publicId: 'IMG_8028_xudxet.jpg',
    width: 1024,
    height: 1024,
    widths: CARD_WIDTHS,
  }),
  blackChickenMala: cloudinaryPicture({
    version: 'v1790426399',
    publicId: 'IMG_7997_qb5up4.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  porkPotStuck: cloudinaryPicture({
    version: 'v1790345036',
    publicId: 'IMG_7926_s3clwe.jpg',
    width: 1008,
    height: 1068,
    widths: [360, 720, 1008],
  }),
  spicyNoodleSalad: cloudinaryPicture({
    version: 'v1790426397',
    publicId: 'IMG_7994_i7nie9.jpg',
    width: 1179,
    height: 1175,
    widths: CARD_WIDTHS,
  }),
  malaChickenFeet: cloudinaryPicture({
    version: 'v1790426402',
    publicId: 'IMG_8001_pvbvm1.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  malaXiangGuo: cloudinaryPicture({
    version: 'v1790426398',
    publicId: 'IMG_7993_kxj6qy.jpg',
    width: 2560,
    height: 2373,
    widths: CARD_WIDTHS,
  }),
  claypotMeeShay: cloudinaryPicture({
    version: 'v1790426399',
    publicId: 'IMG_7997_qb5up4.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  kwayTeow: cloudinaryPicture({
    version: 'v1790426398',
    publicId: 'IMG_7996_lwwps6.jpg',
    width: 1179,
    height: 1104,
    widths: CARD_WIDTHS,
  }),
  shanNoodles: cloudinaryPicture({
    version: 'v1790428671',
    publicId: 'IMG_8030_a03wfp.jpg',
    width: 1024,
    height: 1024,
    widths: CARD_WIDTHS,
  }),
  meeShaySalad: cloudinaryPicture({
    version: 'v1790426399',
    publicId: 'IMG_7998_hfhnon.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  garlicOilNoodles: cloudinaryPicture({
    version: 'v1790426401',
    publicId: 'IMG_8002_vbdmst.jpg',
    width: 1125,
    height: 1122,
    widths: CARD_WIDTHS,
  }),
  spicyNoodleDumpling: cloudinaryPicture({
    version: 'v1790345036',
    publicId: 'IMG_7922_cpg939.jpg',
    width: 896,
    height: 1195,
    widths: [360, 720, 896],
  }),
};

/** Menu accordion: official plates we have on Cloudinary, in menu order. */
export const MENU_GALLERY = [
  {
    name: 'ကြက်သားဖက်ထုပ်အိုးကပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345037/IMG_7925_txkyjj.jpg',
  },
  {
    name: 'ဝက်သားဖက်ထုပ်အိုးကပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345036/IMG_7926_s3clwe.jpg',
  },
  {
    name: 'မာလာခေါက်ဆွဲသုပ်၊ မာလာအကင်သုပ်',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345037/IMG_7924_pgfjwo.jpg',
  },
  {
    name: 'မာလာဟင်း၊ ကြက်မဲမာလာ',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345036/IMG_7923_vhenho.jpg',
  },
  {
    name: 'ကြက်ခြေထောက်မာလာ',
    src: 'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790345035/IMG_7927_s52kgg.jpg',
  },
];

/**
 * Panorama behind the home "special pan-fried dumplings" band.
 * Same Cloudinary photo, delivered smaller than the original upload.
 */
export const FEATURED_SECTION_PHOTO =
  'https://res.cloudinary.com/dhlhzmmtt/image/upload/f_auto,q_auto/v1790427358/IMG_8023_fmuckg.jpg';

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
