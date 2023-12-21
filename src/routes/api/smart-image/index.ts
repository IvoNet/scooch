import { type RequestHandler } from "@builder.io/qwik-city";
import { writeFile, existsSync } from "fs";
import { join } from "path";

const IMG_DIR = "/smart-image/";

export const onGet: RequestHandler = async ({ json, url }) => {
  const prompt = url.searchParams.get("prompt");
  // const imageUrl = await queryOpenAI("A cute baby sea otter");


  const outputPath = join("./public", IMG_DIR, `${prompt}.jpg`);

  if (!existsSync(outputPath)) {
    const response = await fetch(`https://picsum.photos/id/${prompt}/200/300`);
    const buffer = await response.arrayBuffer();
    writeFile(outputPath, Buffer.from(buffer), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Image downloaded successfully");
      }
    });
  }

  json(200, {
    src: `${IMG_DIR}${prompt}.jpg`,
  });
};
