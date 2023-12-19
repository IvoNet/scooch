import { type WalkedFile } from "./walk-sync-promise";
import path from "path";
import fs from "fs";

export const fileToSlideConfig = ({ filename, basedir }: WalkedFile) => {
  if (filename.endsWith(".md")) {
    const presetJson = path.join(basedir, "preset.json");
    const chalkboardJson = path.join(basedir, "chalkboard.json");

    const preset = fs.existsSync(presetJson)
      ? path.join("/", presetJson)
      : undefined;

    const presetContent = preset
      ? fs.readFileSync(presetJson, {
          encoding: "utf8",
          flag: "r",
        })
      : undefined;

    const chalkboard = fs.existsSync(chalkboardJson)
      ? path.join("/", chalkboardJson)
      : undefined;

    const chalkboardContent = chalkboard
      ? fs.readFileSync(chalkboardJson, {
          encoding: "utf8",
          flag: "r",
        })
      : undefined;

    return {
      title: filename.replace(".md", ""),
      file: path.join("/", basedir, filename),
      preset,
      presetContent,
      chalkboard,
      chalkboardContent,
    };
  }

  return undefined;
};
