import { type Signal } from "@builder.io/qwik";

interface GetQueryParamsFromStateArgs {
  selectedSlideshowSignal: Signal<string>;
  selectedThemeSignal: Signal<string>;
  selectedTransitionSignal: Signal<string>;
  showNotesSignal: Signal<boolean>;
  slideNumberSignal: Signal<boolean>;
  mouseWheelSignal: Signal<boolean>;
  loopSignal: Signal<boolean>;
  centerSignal: Signal<boolean>;
}

export const getQueryParamsFromState = ({
  selectedSlideshowSignal,
  selectedThemeSignal,
  selectedTransitionSignal,
  showNotesSignal,
  slideNumberSignal,
  mouseWheelSignal,
  loopSignal,
  centerSignal,
}: GetQueryParamsFromStateArgs) => {
  const q = new URLSearchParams();

  if (selectedSlideshowSignal.value) {
    q.set("slideshow", selectedSlideshowSignal.value);
  } else {
    q.delete("slideshow");
  }
  if (selectedThemeSignal.value) {
    q.set("theme", selectedThemeSignal.value);
  } else {
    q.delete("theme");
  }

  if (selectedTransitionSignal.value) {
    q.set("transition", selectedTransitionSignal.value);
  } else {
    q.delete("transition");
  }
  if (showNotesSignal.value) {
    q.set("showNotes", "true");
  } else {
    q.delete("showNotes");
  }
  if (slideNumberSignal.value) {
    q.set("slideNumber", "true");
  } else {
    q.delete("slideNumber");
  }
  if (mouseWheelSignal.value) {
    q.set("mouseWheel", "true");
  } else {
    q.delete("mouseWheel");
  }
  if (loopSignal.value) {
    q.set("loop", "true");
  } else {
    q.delete("loop");
  }
  if (centerSignal.value) {
    q.set("center", "true");
  } else {
    q.delete("center");
  }
  return q;
};
