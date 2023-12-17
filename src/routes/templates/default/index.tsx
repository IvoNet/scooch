import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import "reveal.js/dist/reveal.css";
import { RevealSlidesHeadOptions } from "~/components/reveal-slides/head";
import { RevealSlides } from "~/components/reveal-slides/reveal-slides";

export default component$(() => {
  return (
    <div class="reveal">
      <RevealSlides defaultTheme="black" />
    </div>
  );
});

export const head: DocumentHead = {
  ...RevealSlidesHeadOptions,
};
