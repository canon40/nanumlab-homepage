export const sectionAnchors = [
  { id: "what-we-do", labelKey: "whatWeDo" as const },
  { id: "edge", labelKey: "edge" as const },
  { id: "solutions", labelKey: "solutions" as const },
  { id: "future-tech", labelKey: "futureTech" as const },
  { id: "technology", labelKey: "technology" as const },
  { id: "architecture", labelKey: "architecture" as const },
  { id: "use-cases", labelKey: "useCases" as const },
  { id: "roadmap", labelKey: "roadmap" as const },
  { id: "contact", labelKey: "contact" as const },
] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
