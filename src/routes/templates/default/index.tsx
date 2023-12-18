import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { RevealSlidesHeadOptions } from "~/components/reveal-slides/head";
import { RevealSlides } from "~/components/reveal-slides/reveal-slides";
import { getCurrentTheme } from "~/components/reveal-slides/get-current-theme";
import "./slides.css";

export const useCurrentTheme = routeLoader$((requestEvent) => {
  return getCurrentTheme("black", requestEvent);
});

export default component$(() => {
  const currentThemeSignal = useCurrentTheme();

  return (
    <div class="reveal">
      <RevealSlides themeData={currentThemeSignal.value} />
    </div>
  );
});

export const head: DocumentHead = {
  ...RevealSlidesHeadOptions,
};
