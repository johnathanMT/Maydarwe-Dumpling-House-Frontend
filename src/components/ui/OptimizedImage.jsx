function alternateSrc(src, ext) {
  return src.replace(/\.(jpe?g|png)$/i, `.${ext}`);
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  pictureClassName = '',
  priority = false,
}) {
  const usePicture = /\.(jpe?g|png)$/i.test(src);
  const image = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );

  if (!usePicture) return image;

  return (
    <picture className={pictureClassName || undefined}>
      <source type="image/avif" srcSet={alternateSrc(src, 'avif')} />
      <source type="image/webp" srcSet={alternateSrc(src, 'webp')} />
      {image}
    </picture>
  );
}
