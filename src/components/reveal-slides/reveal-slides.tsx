import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";
import RevealNotes from "~/components/plugin/notes/plugin";
import type { CustomizedOptions } from "~/types/reveal.js";
import { replaceThemeCss } from "~/util/replace-theme-css";
import {
  defineLivePreviewSection,
  onSlideChangedUpdatePreview,
  injectLivePreviewSections,
  setPreview,
} from "../live-preview/live-preview";
import { defineSmartImage } from "../smart-image/smart-image";

const removePublicPrefix = (path: string) =>
  path.indexOf("/public/") === 0 ? path.substring("/public/".length - 1) : path;

const DEFAULT_SLIDES_PATH =
  "/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md";

interface RevealSlidesProps {
  themeData: string;
}

export const RevealSlides = component$<RevealSlidesProps>(({ themeData }) => {
  const { url } = useLocation();
  const slideshowParam = url.searchParams.get("slideshow");
  const slideshow = slideshowParam
    ? removePublicPrefix(slideshowParam)
    : DEFAULT_SLIDES_PATH;
  const showNotesParam = url.searchParams.get("showNotes");
  const loopParam = url.searchParams.get("loop");
  const mouseWheelParam = url.searchParams.get("mouseWheel");
  const slideNumberParam = url.searchParams.get("slideNumber");
  const transitionParam = url.searchParams.get("transition");
  const centerParam = url.searchParams.get("center");
  const showNotesTimerParam =
    url.searchParams.get("showNotesTimer") &&
    url.searchParams.get("showNotesTimer") === "false"
      ? false
      : true;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await import("reveal.js-plugins/customcontrols/plugin");
    await import("reveal.js-plugins/chalkboard/plugin");
    replaceThemeCss(themeData);
    defineLivePreviewSection();
    defineSmartImage();

    const options: CustomizedOptions = {
      hash: true,
      center: centerParam === "true",
      showNotes: showNotesParam === "true",
      loop: loopParam === "true",
      mouseWheel: mouseWheelParam === "true",
      slideNumber: slideNumberParam === "true",
      transition: (transitionParam ??
        "none") as CustomizedOptions["transition"],
      customcontrols: {
        controls: [
          {
            icon: '<i class="fa fa-pen-square"></i>',
            title: "Toggle chalkboard (B)",
            action: "RevealChalkboard.toggleChalkboard();",
          },
          {
            icon: '<i class="fa fa-pen"></i>',
            title: "Toggle notes canvas (C)",
            action: "RevealChalkboard.toggleNotesCanvas();",
          },
        ],
      },
      plugins: [
        RevealMarkdown,
        RevealHighlight,
        RevealNotes(showNotesTimerParam),
        window.RevealChalkboard,
        window.RevealCustomControls,
      ],
    };

    await Reveal.initialize(options);

    injectLivePreviewSections();

    const previewSlideSections = document.querySelectorAll(".update-preview");
    previewSlideSections.forEach((previewSlideSection) => {
      setPreview(previewSlideSection as HTMLElement);
    });

    Reveal.on("slidechanged", onSlideChangedUpdatePreview);
  });

  return (
    <div class="slides">
      <section
        data-markdown={slideshow}
        data-separator="^---$"
        data-separator-vertical="^--$"
        data-separator-notes="^Note:"
      ></section>
    </div>
  );
});
