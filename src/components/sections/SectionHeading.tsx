import { Badge } from "../ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "light" | "dark";
}

export function SectionHeading({ eyebrow, title, description, variant = "light" }: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Badge className={isDark ? "border-blue-400/30 bg-blue-500/10 text-blue-200" : undefined}>{eyebrow}</Badge>
      <h2 className={`mt-5 text-3xl font-black tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}
