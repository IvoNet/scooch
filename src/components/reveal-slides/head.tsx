import { type DocumentHead } from "@builder.io/qwik-city";

export const RevealSlidesHeadOptions: DocumentHead = {
  title: "Scooch",
  // Font awesome is required for the chalkboard plugin
  scripts: [
    {
      script:
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js",
    },
  ],
  styles: [
    // TODO should be link
    // {
    //   style:
    //     "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    // },
  ],
  // links: [
  //   {
  //     rel: "stylesheet",
  //     href: "reveal.js/dist/reveal.css",
  //   },
  // ],
};
