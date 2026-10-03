/**
 * Self-hosted responsive photo: AVIF → WebP → JPEG via <picture>/srcset.
 * Files live in /public (generated with sharp); never goes through the
 * Vercel image optimizer. Explicit width/height keeps CLS at zero.
 */
type Props = {
  /** Path without width/extension, e.g. "/images/levi/levi-result". */
  base: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ResponsivePicture({
  base,
  widths,
  width,
  height,
  alt,
  sizes,
  className,
  priority = false,
}: Props) {
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const fallback = widths.find((w) => w >= 800) ?? widths[widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${base}-${fallback}.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
