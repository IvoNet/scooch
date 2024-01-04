import { component$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { config } from "~/util/constants";
import { type fileToSlideConfig } from "~/util/file-to-slide-config";
import { savePresetToFs } from "~/util/save-preset";

interface SavePresetButtonProps {
  slides: Array<NonNullable<ReturnType<typeof fileToSlideConfig>>>;
  selectedSlideshow: string | undefined;
  selectedTemplate: string;
  params: URLSearchParams;
}

const savePreset = server$(
  async (title: string, template: string, params: URLSearchParams) => {
    return await savePresetToFs(config.slidesDir, title, template, params);
  }
);

export const SavePresetButton = component$<SavePresetButtonProps>(
  ({ selectedSlideshow, slides, selectedTemplate, params }) => {
    const slideTitle =
      slides.find((slide) => slide.file === selectedSlideshow)?.title ?? "";

    return (
      <button
        class="btn btn-secondary"
        disabled={!selectedSlideshow}
        onClick$={async () => {
          const response = await savePreset(
            slideTitle,
            selectedTemplate,
            params
          );
          if (response.result === "ok") {
            alert("Preset saved");
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-floppy2"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
        </svg>{" "}
        Save preset
      </button>
    );
  }
);
