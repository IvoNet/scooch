import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { DefaultTemplate } from "~/components/templates/default-template/default-template";

export default component$(() => {
  return <DefaultTemplate />;
});

export const head: DocumentHead = {
  title: "Scooch",
};
