export const THEMES = [
  "black",
  // "fixed",
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
  // if (theme === "fixed") {
  //   await import("reveal.js/dist/theme/fixed.css");
  // }
  if (theme === "ivonet") {
    await import("../../routes/templates/ivonet/ivonet.css?inline");
  }
  if (theme === "beige") {
    await import("reveal.js/dist/theme/beige.css");
  }
  if (theme === "blood") {
    await import("reveal.js/dist/theme/blood.css");
  }
  if (theme === "league") {
    await import("reveal.js/dist/theme/league.css");
  }
  if (theme === "moon") {
    await import("reveal.js/dist/theme/moon.css");
  }
  if (theme === "night") {
    await import("reveal.js/dist/theme/night.css");
  }
  if (theme === "serif") {
    await import("reveal.js/dist/theme/serif.css");
  }
  if (theme === "simple") {
    await import("reveal.js/dist/theme/simple.css");
  }
  if (theme === "sky") {
    await import("reveal.js/dist/theme/sky.css");
  }
  if (theme === "solarized") {
    await import("reveal.js/dist/theme/solarized.css");
  }
  if (theme === "white") {
    await import("reveal.js/dist/theme/white.css");
  }
};
