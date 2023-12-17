import { type WalkedFile } from "./walk-sync-promise";
import path from "path";
import fs from "fs";

export const fileToSlideConfig = ({ filename, basedir }: WalkedFile) => {
  if (filename.endsWith(".md")) {
    const presetJson = path.join(basedir, "preset.json");
    const chalkboardJson = path.join(basedir, "chalkboard.json");

    return {
      title: filename.replace(".md", ""),
      file: path.join("/", basedir, filename),
      preset: fs.existsSync(presetJson)
        ? path.join("/", presetJson)
        : undefined,
      chalkboard: fs.existsSync(chalkboardJson)
        ? path.join("/", chalkboardJson)
        : undefined,
    };
  }

  return undefined;
};
