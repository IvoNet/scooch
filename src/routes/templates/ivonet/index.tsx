import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { RevealSlidesHeadOptions } from "~/components/reveal-slides/head";
import { RevealSlides } from "~/components/reveal-slides/reveal-slides";
import "reveal.js/dist/reveal.css";
import "./ivonet.css";

import ImgWolfLogoLeftWhiteSm from "./wolf-logo-left-white-sm.svg?jsx";

export default component$(() => {
  return (
    <>
      <div style="position: fixed; top: 0; width:100%;">
        <ImgWolfLogoLeftWhiteSm style="float: right" />
      </div>
      <div class="reveal">
        <RevealSlides />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  ...RevealSlidesHeadOptions,
  // meta: [
  //   {
  //     name: "description",
  //     content: "Qwik site description",
  //   },
  // ],
};
