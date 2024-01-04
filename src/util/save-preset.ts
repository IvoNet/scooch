import { writeFileSync } from "fs";

export const savePresetToFs = async (
  dir: string,
  name: string,
  template: string,
  params: URLSearchParams
) => {
  if (!name) {
    throw Error("First select a slideshow");
  }

  const presetObj = {
    template,
    ...Object.fromEntries(
      Array.from(params.entries()).filter(([key]) => key !== "slideshow")
    ),
  };

  writeFileSync(
    `${dir}/${name}/preset.json`,
    JSON.stringify(presetObj, null, 2)
  );

  return {
    result: "ok",
  };
};
