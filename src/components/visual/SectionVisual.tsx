import { cn } from "../../lib/utils";

interface SectionVisualProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "video" | "banner";
}

export function SectionVisual({ src, alt, className, aspect = "banner" }: SectionVisualProps) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-gov-blue-950",
        aspect === "video" ? "aspect-[16/9]" : "aspect-[2/1]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}
