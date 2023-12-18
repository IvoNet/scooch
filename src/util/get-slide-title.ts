import { type RequestEventLoader } from "@builder.io/qwik-city";

export const getSlideTitle = (requestEvent: RequestEventLoader) => {
  const slideshowParam = requestEvent.query.get("slideshow");
  const fileName = slideshowParam?.split("/").at(-1);
  const fileNameInfix = fileName
    ?.substring(0, fileName.length - 3)
    .split(" ")
    .slice(1)
    .join(" ");
  return fileNameInfix;
};
