import { component$, Slot } from "@builder.io/qwik";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

export default component$(() => {
  return <Slot />;
});
