import type { Options } from "reveal.js";

export interface CustomizedOptions extends Options {
  customcontrols: {
    controls: { icon: string; title: string; action: string }[];
  };
}
