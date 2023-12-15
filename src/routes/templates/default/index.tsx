import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Reveal from "reveal.js";

export default component$(() => {
  Reveal.initialize();

  return (
    <div class="reveal">
      <div class="slides">
        <script>
          document.write('
          <section
            data-markdown="' + QueryString.slideshow +
                         '"
            data-separator="^---$"
            data-separator-vertical="^--$"
            data-separator-notes="^Note:"
          ></section>
          ')
        </script>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Scooch",
};
