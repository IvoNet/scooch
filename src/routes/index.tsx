import { component$, useOn, useSignal, useStyles$, $ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";
// import Footer from "~/components/starter/footer/footer";
// import { Button } from "~/components/bootstrap";
import Header from "~/components/starter/header/header";
import styles from "./styles.css?inline";
// Add bootstrap styles
import bootstrapStyles from "bootstrap/dist/css/bootstrap.min.css?inline";
import { Dropdown } from "~/components/dropdown/dropdown";
import { THEMES } from "~/components/reveal-slides/load-theme";
import { walkSyncPromise } from "~/util/walk-sync-promise";
import { isDefined } from "~/util/is-defined";
import { fileToSlideConfig } from "~/util/file-to-slide-config";

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

export default component$(() => {
  useStyles$(styles);
  useStyles$(bootstrapStyles);
  const slidesSignal = useSlides();
  const selectedPresetSignal = useSignal("");
  const selectedSlideshowSignal = useSignal("");
  const selectedTemplateSignal = useSignal("default");
  const selectedThemeSignal = useSignal("");
  const url = `http://localhost:5173/templates/${selectedTemplateSignal.value}/?slideshow=${selectedSlideshowSignal.value}&theme=${selectedThemeSignal.value}`;

  useOn(
    "qvisible",
    $(() => import("bootstrap"))
  );

  return (
    // <div style="height: 100%; background-color: #333;">
    <div class={`theme-${selectedThemeSignal.value}`}>
      <div class="container" data-bs-theme="dark">
        <Header />
        <div class="card">
          {/* <img src="..." class="card-img-top" alt="..." /> */}
          <div class="card-body p-5">
            {/* <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
            🚧NYI🚧 Choose a preset presentation:
            <Dropdown
              label={selectedPresetSignal.value || "Select preset"}
              options={[]}
              onChange={$((value: string) => {
                selectedPresetSignal.value = value;
              })}
            />
            <br />
            {/*  Select presentation:
          <ul>
            {slidesSignal.value.map((slide) => (
              <li
                key={slide.title}
                onClick$={() => (selectedSlideshowSignal.value = slide.file)}
              >
                {slide.title} {slide.file} {slide.preset} {slide.chalkboard}
              </li>
            ))}
          </ul> */}
            Select presentation
            <Dropdown
              big
              label={selectedSlideshowSignal.value || "Select presentation"}
              options={slidesSignal.value.map((slide) => ({
                value: slide.file,
              }))}
              onChange={$((value: string) => {
                selectedSlideshowSignal.value = value;
              })}
            />
            <br />
            <br />
            <div class="row">
              <div class="col">
                Select template
                <Dropdown
                  label={selectedTemplateSignal.value || "Select template"}
                  options={[{ value: "default" }, { value: "ivonet" }]}
                  onChange={$((value: string) => {
                    selectedTemplateSignal.value = value;
                  })}
                />
              </div>
              <div class="col">
                Select theme
                <Dropdown
                  label={selectedThemeSignal.value || "Select theme"}
                  options={THEMES.map((theme) => ({ value: theme }))}
                  onChange={$((value: string) => {
                    selectedThemeSignal.value = value;
                  })}
                />
              </div>
              <div class="col"> </div>
            </div>
            <br />
            {url}
            <br />
            <br />
            {/* <Button colorVariant={"primary"} text="Scooch it!"  onClick$={async () => {
              window.open(url, "_blank");
            }} /> */}
            <button
              class="btn btn-primary"
              onClick$={async () => {
                // const url = 'http://localhost:3000/templates/ivonet/ivonet.html?theme=/templates/fixed.css&transition=none&title=1.%20How%20to%20Scooch&slideshow=/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md#/';
                // const url = 'http://localhost:5173/templates/ivonet/ivonet.html?theme=/templates/fixed.css&transition=none&title=1.%20How%20to%20Scooch&slideshow=/slides/1.%20How%20to%20%20Scooch/1.%20How%20to%20Scooch.md#/';
                // const url = `http://localhost:5173/templates/${selectedThemeSignal.value}/?slideshow=${selectedSlideshowSignal.value}`;
                // const newWindow =
                window.open(url, "_blank");
              }}
            >
              Scooch it!
            </button>
          </div>
        </div>
        <main>
          {/* <Hero />
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
        </div>*/}
        </main>
        {/* <Footer /> */}
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
