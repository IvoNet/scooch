import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
// @ts-expect-error
import { walkSync } from "fs-walk";
import path from "path";
import fs from "fs";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Infobox from "~/components/starter/infobox/infobox";
import Starter from "~/components/starter/next-steps/next-steps";

const config = {
  themesDir: "./templates",
  templatesDir: "./templates",
  slidesDir: "../slides",
};

function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== "undefined";
}

const walkSyncPromise = (
  dir: string
): Promise<{ basedir: string; filename: string }[]> =>
  new Promise((resolve) => {
    const foo: { basedir: string; filename: string }[] = [];

    walkSync(
      dir,
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (basedir, filename, stat) => {
        foo.push({ basedir, filename });
      }
    );
    resolve(foo);
  });

/**
 *
 * Get the defined slides (aka presentations)
 */
export const useSlides = routeLoader$(async () => {
  const files = await walkSyncPromise(config.slidesDir);
  return files
    .map(({ filename, basedir }) => {
      if (filename.endsWith(".md")) {
        const presetJson = path.join(basedir, "preset.json");
        const chalkboardJson = path.join(basedir, "chalkboard.json");

        return {
          title: filename.replace(".md", ""),
          file: path.join("/", basedir, filename),
          preset: fs.existsSync(presetJson)
            ? path.join("/", presetJson)
            : undefined,
          chalkboard: fs.existsSync(chalkboardJson)
            ? path.join("/", chalkboardJson)
            : undefined,
        };
      }

      return undefined;
    })
    .filter(isDefined);
});

export default component$(() => {
  const slidesSignal = useSlides();

  return (
    <>
      Choose a preset presentation:
      <ul>
        {slidesSignal.value.map((slide) => (
          <li key={slide.title}>
            {slide.title} {slide.file} {slide.preset} {slide.chalkboard}
          </li>
        ))}
      </ul>
      <Hero />
      <Starter />
      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>
      <div class="container container-center container-spacing-xl">
        <h3>
          You can <span class="highlight">count</span>
          <br /> on me
        </h3>
        <Counter />
      </div>
      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-cli">
            CLI Commands
          </div>
          <>
            <p>
              <code>npm run dev</code>
              <br />
              Starts the development server and watches for changes
            </p>
            <p>
              <code>npm run preview</code>
              <br />
              Creates production build and starts a server to preview it
            </p>
            <p>
              <code>npm run build</code>
              <br />
              Creates production build
            </p>
            <p>
              <code>npm run qwik add</code>
              <br />
              Runs the qwik CLI to add integrations
            </p>
          </>
        </Infobox>

        <div>
          <Infobox>
            <div q:slot="title" class="icon icon-apps">
              Example Apps
            </div>
            <p>
              Have a look at the <a href="/demo/flower">Flower App</a> or the{" "}
              <a href="/demo/todolist">Todo App</a>.
            </p>
          </Infobox>

          <Infobox>
            <div q:slot="title" class="icon icon-community">
              Community
            </div>
            <ul>
              <li>
                <span>Questions or just want to say hi? </span>
                <a href="https://qwik.builder.io/chat" target="_blank">
                  Chat on discord!
                </a>
              </li>
              <li>
                <span>Follow </span>
                <a href="https://twitter.com/QwikDev" target="_blank">
                  @QwikDev
                </a>
                <span> on Twitter</span>
              </li>
              <li>
                <span>Open issues and contribute on </span>
                <a href="https://github.com/BuilderIO/qwik" target="_blank">
                  GitHub
                </a>
              </li>
              <li>
                <span>Watch </span>
                <a href="https://qwik.builder.io/media/" target="_blank">
                  Presentations, Podcasts, Videos, etc.
                </a>
              </li>
            </ul>
          </Infobox>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
