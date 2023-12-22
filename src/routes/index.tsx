import { component$, useOn, useSignal, useStyles$, $ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useLocation,
  server$,
} from "@builder.io/qwik-city";
import Header from "~/components/starter/header/header";
import styles from "./styles.css?inline";
import bootstrapStyles from "bootstrap/dist/css/bootstrap.min.css?inline";
import { Dropdown } from "~/components/dropdown/dropdown";
import { THEMES } from "~/components/reveal-slides/load-theme";
import { walkSyncPromise } from "~/util/walk-sync-promise";
import { isDefined } from "~/util/is-defined";
import { fileToSlideConfig } from "~/util/file-to-slide-config";
import { Checkbox } from "~/components/checkbox/checkbox";
import { getQueryParamsFromState } from "~/util/get-query-params-from-state";
import { PresetSelector } from "~/components/preset-selector/preset-selector";
import { savePresetToFs } from "~/util/save-preset";

const config = {
  themesDir: "./templates",
  templatesDir: "./templates",
  slidesDir: "./public/slides",
};

/**
 *
 * Get the defined slides (aka presentations)
 */
export const useSlides = routeLoader$(async () => {
  const files = await walkSyncPromise(config.slidesDir);
  return files.map(fileToSlideConfig).filter(isDefined);
});

const savePreset = server$(
  async (title: string, template: string, params: URLSearchParams) => {
    return await savePresetToFs(config.slidesDir, title, template, params);
  }
);

export default component$(() => {
  useStyles$(styles);
  useStyles$(bootstrapStyles);

  const slidesSignal = useSlides();
  const selectedSlideshowSignal = useSignal("");
  const selectedTemplateSignal = useSignal("default");
  const selectedThemeSignal = useSignal("");
  const selectedTransitionSignal = useSignal("none");
  const showNotesSignal = useSignal(false);
  const showNotesTimerSignal = useSignal(true);
  const slideNumberSignal = useSignal(false);
  const mouseWheelSignal = useSignal(false);
  const loopSignal = useSignal(false);
  const centerSignal = useSignal(false);
  const { url: location } = useLocation();

  const q = getQueryParamsFromState({
    selectedSlideshowSignal,
    selectedThemeSignal,
    selectedTransitionSignal,
    showNotesSignal,
    showNotesTimerSignal,
    slideNumberSignal,
    mouseWheelSignal,
    loopSignal,
    centerSignal,
  });

  const url = `${location.protocol}//${location.host}/templates/${
    selectedTemplateSignal.value
  }/?${q.toString()}`;

  useOn(
    "qvisible",
    $(() => import("bootstrap"))
  );

  return (
    <div class={`theme-${selectedThemeSignal.value}`}>
      <div class="container" data-bs-theme="dark">
        <Header />
        <div class="card">
          <div class="card-body p-5 d-grid gap-4">
            <PresetSelector slides={slidesSignal.value} />

            <h2>... or select it</h2>
            {/*  */}
            <Dropdown
              big
              label="Select presentation"
              value={
                slidesSignal.value.find(
                  (slide) => slide.file === selectedSlideshowSignal.value
                )?.title ?? ""
              }
              options={slidesSignal.value.map((slide) => ({
                label: slide.title,
                value: slide.file,
              }))}
              onChange={$((value: string) => {
                selectedSlideshowSignal.value = value;
              })}
            />
            {/*  */}
            <div class="row">
              <div class="col d-grid gap-4">
                <Dropdown
                  label="Select template"
                  value={selectedTemplateSignal.value}
                  options={[{ value: "default" }, { value: "ivonet" }]}
                  onChange={$((value: string) => {
                    selectedTemplateSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Show presenter notes"
                  checked={showNotesSignal.value}
                  onChange={$((value: boolean) => {
                    showNotesSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Show timer in presenter notes"
                  checked={showNotesTimerSignal.value}
                  onChange={$((value: boolean) => {
                    showNotesTimerSignal.value = value;
                  })}
                />

                {/* <Checkbox
                  label="Show controls"
                  checked={showNotesSignal.value}
                  onChange={$((value: boolean) => {
                    showNotesSignal.value = value;
                  })}
                /> */}
              </div>
              <div class="col d-grid gap-4">
                <Dropdown
                  label="Select theme"
                  value={selectedThemeSignal.value}
                  options={THEMES.map((theme) => ({ value: theme }))}
                  onChange={$((value: string) => {
                    selectedThemeSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Show page numbers"
                  checked={slideNumberSignal.value}
                  onChange={$((value: boolean) => {
                    slideNumberSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Enable mouse wheel navigation"
                  checked={mouseWheelSignal.value}
                  onChange={$((value: boolean) => {
                    mouseWheelSignal.value = value;
                  })}
                />
              </div>
              <div class="col d-grid gap-4">
                <Dropdown
                  label="Select transition"
                  value={selectedTransitionSignal.value}
                  options={[
                    "concave",
                    "convex",
                    "fade",
                    "none",
                    "slide",
                    "zoom",
                  ].map((transition) => ({
                    value: transition,
                  }))}
                  onChange={$((value: string) => {
                    selectedTransitionSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Loop at end"
                  checked={loopSignal.value}
                  onChange={$((value: boolean) => {
                    loopSignal.value = value;
                  })}
                />
                <Checkbox
                  label="Center the slides"
                  checked={centerSignal.value}
                  onChange={$((value: boolean) => {
                    centerSignal.value = value;
                  })}
                />
              </div>
            </div>
            {/*  */}
            <div class="d-flex gap-4">
              <button
                class="btn btn-primary"
                onClick$={async () => {
                  window.open(url, "_blank");
                }}
              >
                Scooch it!
              </button>
              <button
                class="btn btn-secondary"
                disabled={!selectedSlideshowSignal.value}
                onClick$={async () => {
                  const response = await savePreset(
                    slidesSignal.value.find(
                      (slide) => slide.file === selectedSlideshowSignal.value
                    )?.title ?? "",
                    selectedTemplateSignal.value,
                    q
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Scooch",
  meta: [
    {
      name: "description",
      content: "Scooch - Presenting smarter",
    },
  ],
};
