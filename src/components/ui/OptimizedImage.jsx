/**
 * Responsive <picture> for images processed by vite-imagetools
 * (`?…&as=picture`, see src/assets/photos/index.js).
 *
 * The browser picks AVIF → WebP → JPEG and, thanks to `sizes`, the smallest
 * width that is still sharp: a 56 px cart thumbnail downloads the 160 px file,
 * not the full photo. Always pass `sizes` describing the rendered width.
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
