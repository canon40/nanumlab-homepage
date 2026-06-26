import type { homeKo } from "./home.ko";

export type HomeContent = typeof homeKo;

export type Locale = "ko" | "en";

export type Translations = {
  brand: { name: string; tagline: string };
  home: HomeContent;
};
