import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";
import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
import type { CustomizedOptions } from "~/types/reveal.js";

const removePublicPrefix = (path: string) =>
  path.indexOf("/public/") === 0 ? path.substring("/public/".length - 1) : path;

const DEFAULT_SLIDES_PATH =
  "/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md";

export default component$(() => {
  const { url } = useLocation();
  const slideshowParam = url.searchParams.get("slideshow");
  const slideshow = slideshowParam
    ? removePublicPrefix(slideshowParam)
    : DEFAULT_SLIDES_PATH;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await import("reveal.js-plugins/customcontrols/plugin");
    await import("reveal.js-plugins/chalkboard/plugin");
    await import("reveal.js-plugins/customcontrols/style.css");
    await import("reveal.js-plugins/chalkboard/style.css");

    const options: CustomizedOptions = {
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
        window.RevealChalkboard,
        window.RevealCustomControls,
      ],
    };

    Reveal.initialize(options);
  });

  return (
    <div class="reveal">
      <div class="slides">
        <section
          data-markdown={slideshow}
          data-separator="^---$"
          data-separator-vertical="^--$"
          data-separator-notes="^Note:"
        ></section>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Scooch",
  // Font awesome is required for the chalkboard plugin
  scripts: [
    {
      script:
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js",
    },
  ],
  styles: [
    {
      style:
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
  // meta: [
  //   {
  //     name: "description",
  //     content: "Qwik site description",
  //   },
  // ],
};
