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

/** Home hero: pork pan-fried dumplings (IMG_7926, 1008 × 1068 original). */
export const HERO_PHOTO_REMOTE = cloudinaryPicture({
  version: 'v1790345036',
  publicId: 'IMG_7926_s3clwe.jpg',
  width: 1008,
  height: 1068,
  widths: [360, 720, 1008],
});
