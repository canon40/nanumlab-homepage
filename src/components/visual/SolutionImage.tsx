import { cn } from "../../lib/utils";

interface SolutionImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "thumb" | "card" | "hero";
}

const sizeClass = {
  thumb: "h-10 w-10 rounded-lg object-cover",
  card: "h-full w-full object-cover",
  hero: "h-full w-full object-cover",
};

export function SolutionImage({ src, alt, className, size = "card" }: SolutionImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn(sizeClass[size], "bg-gov-blue-950", className)}
      onError={(e) => {
        e.currentTarget.style.opacity = "0.35";
      }}
    />
  );
}
