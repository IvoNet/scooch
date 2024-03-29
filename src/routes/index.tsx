import { component$, useOn, useSignal, useStyles$, $ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useLocation,
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
import { config } from "~/util/constants";
import { SavePresetButton } from "~/components/save-preset-button/save-preset-button";

/**
 *
 * Get the defined slides (aka presentations)
 */
export const useSlides = routeLoader$(async () => {
  const files = await walkSyncPromise(config.slidesDir);
  return files.map(fileToSlideConfig).filter(isDefined);
});

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
              <SavePresetButton
                slides={slidesSignal.value}
                selectedSlideshow={selectedSlideshowSignal.value}
                selectedTemplate={selectedTemplateSignal.value}
                params={q}
              />
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
