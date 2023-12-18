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

export const themeToPath: Record<ThemeOptions, string> = {
  black: "node_modules/reveal.js/dist/theme/black.css",
  // fixed: "node_modules/reveal.js/dist/theme/fixed.css",
  ivonet: "src/routes/templates/ivonet/ivonet.css",
  beige: "node_modules/reveal.js/dist/theme/beige.css",
  blood: "node_modules/reveal.js/dist/theme/blood.css",
  league: "node_modules/reveal.js/dist/theme/league.css",
  moon: "node_modules/reveal.js/dist/theme/moon.css",
  night: "node_modules/reveal.js/dist/theme/night.css",
  serif: "node_modules/reveal.js/dist/theme/serif.css",
  simple: "node_modules/reveal.js/dist/theme/simple.css",
  sky: "node_modules/reveal.js/dist/theme/sky.css",
  solarized: "node_modules/reveal.js/dist/theme/solarized.css",
  white: "node_modules/reveal.js/dist/theme/white.css",
};
