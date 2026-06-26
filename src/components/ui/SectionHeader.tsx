interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, description, dark = false, align = "center" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={`mb-14 ${alignClass}`}>
      {eyebrow && (
        <p className={`text-sm font-bold uppercase tracking-[0.15em] ${dark ? "text-electric-blue-300" : "text-electric-blue-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-4 text-3xl font-black tracking-tight md:text-4xl ${dark ? "text-white" : "text-gov-blue-950"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      )}
    </div>
  );
}
