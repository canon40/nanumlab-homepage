export const navGroups = [
  {
    key: "solutions" as const,
    path: "/solutions",
    dropdownKey: "solutions" as const,
  },
  {
    key: "technology" as const,
    path: "/technology",
    dropdownKey: "technology" as const,
  },
  {
    key: "about" as const,
    path: "/philosophy",
    dropdownKey: "about" as const,
  },
] as const;

export const navItems = [
  { key: "projects" as const, path: "/use-cases" },
  { key: "news" as const, path: "/news" },
] as const;

export const footerSolutionLinks = [
  { key: "smart-ticket", path: "/solutions" },
  { key: "ocr", path: "/solutions" },
  { key: "callcenter", path: "/solutions" },
  { key: "local", path: "/solutions" },
] as const;
