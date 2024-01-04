import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { RevealSlidesHeadOptions } from "~/components/reveal-slides/head";
import { RevealSlides } from "~/components/reveal-slides/reveal-slides";
import ImgWolfLogoLeftWhiteSm from "./wolf-logo-left-white-sm.svg?jsx";
import { getCurrentTheme } from "~/components/reveal-slides/get-current-theme";
import { getSlideTitleFromEvent } from "~/util/get-slide-title";
import "../default/slides.css";

export const useCurrentTheme = routeLoader$((requestEvent) => {
  return getCurrentTheme("ivonet", requestEvent);
});

export const useTitle = routeLoader$((requestEvent) => {
  return getSlideTitleFromEvent(requestEvent);
});

export default component$(() => {
  const currentThemeSignal = useCurrentTheme();

  return (
    <>
      <div style="position: fixed; top: 0; width:100%;">
        <ImgWolfLogoLeftWhiteSm style="float: right" />
      </div>
      <div class="reveal">
        <RevealSlides themeData={currentThemeSignal.value} />
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => ({
  ...RevealSlidesHeadOptions,
  title: `${resolveValue(useTitle)}`,
});
