export const THEMES = [
  "black",
  "fixed",
  "ivonet",
  "beige",
  "blood",
  "league",
  "moon",
  "night",
  "serif",
  "simple",
  "sky",
  "solarized",
  "white",
] as const;

export type ThemeOptions = (typeof THEMES)[number];

export const loadTheme = async (theme: ThemeOptions) => {
  if (theme === "black") {
    await import("reveal.js/dist/theme/black.css");
  }
  if (theme === "moon") {
    await import("reveal.js/dist/theme/moon.css");
  }
};
