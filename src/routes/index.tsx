import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
// @ts-expect-error
import { walkSync } from "fs-walk";
import path from "path";
import fs from "fs";

import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
import Infobox from "~/components/starter/infobox/infobox";
import Starter from "~/components/starter/next-steps/next-steps";
import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

import styles from "./styles.css?inline";

const config = {
  themesDir: "./templates",
  templatesDir: "./templates",
  slidesDir: "./public/slides",
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
  useStyles$(styles);
  const slidesSignal = useSlides();
  const selectedSlideshowSignal = useSignal("");
  const selectedThemeSignal = useSignal("default");

  return (
    <>
      <Header />
      <main>
        Choose a preset presentation: TODO Select presentation:
        <ul>
          {slidesSignal.value.map((slide) => (
            <li
              key={slide.title}
              onClick$={() => (selectedSlideshowSignal.value = slide.file)}
            >
              {slide.title} {slide.file} {slide.preset} {slide.chalkboard}
            </li>
          ))}
        </ul>
        <br />
        {selectedSlideshowSignal.value}
        <br />
        <br />
        Select theme:
        <ul>
          <li onClick$={() => (selectedThemeSignal.value = "default")}>
            default
          </li>
          <li onClick$={() => (selectedThemeSignal.value = "ivonet")}>
            ivonet
          </li>
        </ul>
        <br />
        {selectedThemeSignal.value}
        <br />
        <br />
        <button
          onClick$={async () => {
            // const url = 'http://localhost:3000/templates/ivonet/ivonet.html?theme=/templates/fixed.css&transition=none&title=1.%20How%20to%20Scooch&slideshow=/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md#/';
            // const url = 'http://localhost:5173/templates/ivonet/ivonet.html?theme=/templates/fixed.css&transition=none&title=1.%20How%20to%20Scooch&slideshow=/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md#/';
            const url = `http://localhost:5173/templates/${selectedThemeSignal.value}/?slideshow=${selectedSlideshowSignal.value}`;
            // const newWindow =
            window.open(url, "_blank");
            // newWindow.location = url;

            // let url = that.baseurl;
            // url += that.template;
            // url += "?theme=" + that.theme;

            // const defaults = {
            //   spread: 360,
            //   ticks: 70,
            //   gravity: 0,
            //   decay: 0.95,
            //   startVelocity: 30,
            //   colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
            //   origin: {
            //     x: 0.5,
            //     y: 0.35,
            //   },
            // };

            // function loadConfetti() {
            //   return new Promise<(opts: any) => void>((resolve, reject) => {
            //     if ((globalThis as any).confetti) {
            //       return resolve((globalThis as any).confetti as any);
            //     }
            //     const script = document.createElement("script");
            //     script.src =
            //       "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
            //     script.onload = () =>
            //       resolve((globalThis as any).confetti as any);
            //     script.onerror = reject;
            //     document.head.appendChild(script);
            //     script.remove();
            //   });
            // }

            // const confetti = await loadConfetti();

            // function shoot() {
            //   confetti({
            //     ...defaults,
            //     particleCount: 80,
            //     scalar: 1.2,
            //   });

            //   confetti({
            //     ...defaults,
            //     particleCount: 60,
            //     scalar: 0.75,
            //   });
            // }

            // setTimeout(shoot, 0);
            // setTimeout(shoot, 100);
            // setTimeout(shoot, 200);
            // setTimeout(shoot, 300);
            // setTimeout(shoot, 400);
          }}
        >
          Scooch it!
        </button>
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
      </main>
      <Footer />
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
