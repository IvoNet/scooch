import { type RequestHandler } from "@builder.io/qwik-city";
import { writeFile, existsSync } from "fs";
import { join } from "path";
import { queryOpenAI } from "~/util/prompt";

const IMG_DIR = "/smart-image/";

export const onGet: RequestHandler = async ({ json, url }) => {
  const prompt = url.searchParams.get("prompt") ?? "";

  const outputPath = join("./public", IMG_DIR, `${prompt}.jpg`);

  if (!existsSync(outputPath)) {
    console.log("Querying OpenAI");
    try {
      const imageUrl = await queryOpenAI(prompt);
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      writeFile(outputPath, Buffer.from(buffer), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Image downloaded successfully");
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Return cached image");
  }

  json(200, {
    src: `${IMG_DIR}${prompt}.jpg`,
  });
};
