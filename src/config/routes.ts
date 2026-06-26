export const appRoutes = [
  { path: "/", labelKey: "home" as const },
  { path: "/about", labelKey: "about" as const },
  { path: "/solutions", labelKey: "solutions" as const },
  { path: "/technology", labelKey: "technology" as const },
  { path: "/cases", labelKey: "cases" as const },
  { path: "/contact", labelKey: "contact" as const },
] as const;

export type NavLabelKey = (typeof appRoutes)[number]["labelKey"];
