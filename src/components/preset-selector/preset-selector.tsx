import { component$ } from "@builder.io/qwik";
import { type fileToSlideConfig } from "~/util/file-to-slide-config";

export const PresetSelector = component$(
  ({
    slides,
  }: {
    slides: Array<NonNullable<ReturnType<typeof fileToSlideConfig>>>;
  }) => {
    return (
      <>
        <h2>Choose a preset presentation</h2>
        <div class="d-flex gap-2">
          {slides
            .filter((slide) => slide.preset)
            .map((slide) => (
              <button
                class="btn btn-secondary"
                key={slide.title}
                onClick$={async () => {
                  if (slide.presetContent) {
                    const presetObj = JSON.parse(slide.presetContent);
                    const presetKeyValues = Object.entries(presetObj);
                    const queryParams = presetKeyValues
                      .map(([k, v]) => `${k}=${v}`)
                      .join("&");
                    const newUrl = `${location.protocol}//${location.host}/templates/${presetObj["template"]}/?slideshow=${slide.file}&${queryParams}`;
                    window.open(newUrl, "_blank");
                  }
                }}
              >
                {slide.title}
              </button>
            ))}
        </div>
      </>
    );
  }
);
