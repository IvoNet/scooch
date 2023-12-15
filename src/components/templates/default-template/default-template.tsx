import { component$, useVisibleTask$ } from "@builder.io/qwik";
import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const DefaultTemplate = component$(() => {
  // const head = useDocumentHead();
  // const loc = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    Reveal.initialize({});

    // const deck = new Reveal({
    //   plugins: [Markdown],
    // });
    // deck.initialize();
  });

  return (
    <div class="reveal">
      <div class="slides">
        <section>foo</section>
        <section>bar</section>
        {/* <script>
          document.write('
          <section
            data-markdown="' + QueryString.slideshow +
                         '"
            data-separator="^---$"
            data-separator-vertical="^--$"
            data-separator-notes="^Note:"
          ></section>
          ')
        </script> */}
      </div>
    </div>
  );
});
