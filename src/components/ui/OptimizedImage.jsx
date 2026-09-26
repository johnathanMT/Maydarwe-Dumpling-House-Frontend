/** @import { Picture } from '../../types' */

/**
 * Responsive <picture> for images processed by vite-imagetools
 * (`?…&as=picture`, see src/assets/photos/index.js).
 *
 * The browser picks AVIF → WebP → JPEG and, thanks to `sizes`, the smallest
 * width that is still sharp: a 56 px cart thumbnail downloads the 160 px file,
 * not the full photo. Always pass `sizes` describing the rendered width.
 * @param {object} props
 * @param {Picture | null | undefined} props.image Renders nothing when missing.
 * @param {string} props.alt
 * @param {string} [props.sizes]
 * @param {number} [props.width] Defaults to the image's own width.
 * @param {number} [props.height] Defaults to the image's own height.
 * @param {string} [props.className] On the <img>.
 * @param {string} [props.pictureClassName] On the <picture>.
 * @param {boolean} [props.priority] Above-the-fold image: load eagerly with high priority.
 */
export default function OptimizedImage({
  image,
  alt,
  sizes = '100vw',
  width,
  height,
  className = '',
  pictureClassName = '',
  priority = false,
}) {
  if (!image) return null;
  const { sources, img } = image;

  return (
    <picture className={pictureClassName || undefined}>
      {sources.avif ? <source type="image/avif" srcSet={sources.avif} sizes={sizes} /> : null}
      {sources.webp ? <source type="image/webp" srcSet={sources.webp} sizes={sizes} /> : null}
      <img
        src={img.src}
        srcSet={sources.jpeg}
        sizes={sizes}
        alt={alt}
        width={width ?? img.w}
        height={height ?? img.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
