import { type RequestEventLoader } from "@builder.io/qwik-city";

export const getSlideTitle = (slideshowParam: string | null) => {
  const fileName = slideshowParam?.split("/").at(-1);
  const fileNameInfix = fileName
    ?.substring(0, fileName.length - 3)
    .split(" ")
    .slice(1)
    .join(" ");
  return fileNameInfix;
};

export const getSlideTitleFromEvent = (requestEvent: RequestEventLoader) => {
  const slideshowParam = requestEvent.query.get("slideshow");
  return getSlideTitle(slideshowParam);
};
