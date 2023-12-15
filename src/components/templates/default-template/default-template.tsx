import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const DefaultTemplate = component$(() => {
  // const head = useDocumentHead();
  // const loc = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await import("reveal.js-plugins/customcontrols/plugin");
    await import("reveal.js-plugins/chalkboard/plugin");
    await import("reveal.js-plugins/customcontrols/style.css");
    await import("reveal.js-plugins/chalkboard/style.css");

    console.log(window);

    Reveal.initialize({
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
      // @ts-ignore
      plugins: [
        RevealMarkdown,
        window.RevealChalkboard,
        window.RevealCustomControls,
      ],
    });
  });

  return (
    <div class="reveal">
      <div class="slides">
        <section
          data-markdown="/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md"
          data-separator="^---$"
          data-separator-vertical="^--$"
          data-separator-notes="^Note:"
        ></section>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
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
