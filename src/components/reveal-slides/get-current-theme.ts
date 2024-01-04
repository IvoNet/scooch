import { type RequestEventLoader } from "@builder.io/qwik-city";
import { readFileSync } from "fs";
import { type ThemeOptions, themeToPath } from "./load-theme";

export const getCurrentTheme = (
  defaultTheme: string,
  requestEvent: RequestEventLoader
) => {
  const themeParam = requestEvent.query.get("theme");
  const t = themeParam || defaultTheme;
  const themeContent = readFileSync(themeToPath[t as ThemeOptions], {
    encoding: "utf8",
    flag: "r",
  });
  return themeContent;
};
