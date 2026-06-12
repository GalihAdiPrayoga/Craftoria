import { cn } from "@/lib/utils";

type AspectRatio = "4/3" | "16/9" | "1/1" | "3/4";

type DummyImageProps = {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  className?: string;
  /** Aktifkan efek zoom-in saat container parent di-hover */
  zoomOnHover?: boolean;
};

const aspectMap: Record<AspectRatio, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

/**
 * ATOM — DummyImage
 * Wrapper gambar responsif dengan aspect ratio konsisten.
 * Mendukung efek zoom-on-hover via `zoomOnHover` prop.
 *
 * Sumber: gambar Unsplash terkurasi (ceramics, lifestyle, home decor).
 */
export function DummyImage({
  src,
  alt,
  aspectRatio = "4/3",
  className,
  zoomOnHover = false,
}: DummyImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-cream-light",
        aspectMap[aspectRatio],
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-transform duration-700 ease-out",
          zoomOnHover && "group-hover:scale-110"
        )}
        loading="lazy"
      />
    </div>
  );
}

/* ── Curated Unsplash image URLs for Craftoria categories ── */
export const categoryImages = {
  drinkware:
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  "home-decor":
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  essentials:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
} as const;
