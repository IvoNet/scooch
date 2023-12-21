// function preview(src, target) {
//   document.getElementById(target).style.display = "block";
//   document.getElementById(target).src =
//     "data:text/html;charset=utf-8," +
//     encodeURIComponent(document.getElementById(src).value);
// }

function replaceSrc(value) {
  const srcIndex = value.indexOf(' src="');
  if (srcIndex > -1) {
    return value.replaceAll(' src="', ` src="${top.location.origin}/assets/`);
  }
  return value;
}

// Very risky way to chain alerts to confirms. But it avoids Promises.
function getFirstAlertAfterFirstConfirm(value) {
  const sub = value.substring(value.indexOf("confirm("));
  const prefix = "alert(";
  const index = sub.indexOf(prefix);
  const withoutPrefix = sub.substring(index + prefix.length);
  const closeIndex = withoutPrefix.indexOf(")");
  return withoutPrefix.substring(0, closeIndex);
}

export function setPreview(slideElem) {
  const value = slideElem.querySelector("textarea").value;
  const firstAlertMsg = getFirstAlertAfterFirstConfirm(value);
  const splitAt = value.indexOf("<head>") + "<head>".length;
  const part1 = value.substring(0, splitAt);
  const part2 = value.substring(splitAt);
  const injectStyle = `<style>
      html {
        height: 100%;
      }
      body {
        font-size: 300%;
      }
      input, button, select {
        font-size: 100%;
      }
      dialog {
        border-radius: 16px;
        width: 50%;
      }
      dialog button {
        border-radius: 8px;
        cursor: pointer;
      }
      dialog button#cancel {
        border: 1px solid black;
        background-color: white;
        color: black;
      }
      dialog button {
        border: 1px solid white;
        background-color: black;
        color: white;
      }
      </style>`;
  const injectPolyfill = `<dialog id="alert-polyfill">
        <section></section>
        <button>OK</button>
      </dialog>
      <dialog id="confirm-polyfill">
        <section></section>
        <button id="cancel">Cancel</button>
        <button id="ok">OK</button>
      </dialog>
      <script>
      window.alert = (msg) => {
        document.querySelector('#alert-polyfill > section').textContent = msg;
        const dialogElem = document.getElementById('alert-polyfill');
        dialogElem.showModal();
      };
      document.querySelector('#alert-polyfill > button').addEventListener('click', () => {
        const dialogElem = document.getElementById('alert-polyfill');
        dialogElem.close();
      })
      function replaceLinebreaks(msg) {
        return msg.replace(/\\n/g, '<br />');
      }
      window.confirm = (msg) => {
        document.querySelector('#confirm-polyfill > section').innerHTML = replaceLinebreaks(msg);
        const dialogElem = document.getElementById('confirm-polyfill');
        dialogElem.showModal();
      };
      document.querySelector('#confirm-polyfill > button#cancel').addEventListener('click', () => {
        const dialogElem = document.getElementById('confirm-polyfill');
        dialogElem.close();
      })
      document.querySelector('#confirm-polyfill > button#ok').addEventListener('click', () => {
        const dialogElem = document.getElementById('confirm-polyfill');
        dialogElem.close();
        alert(${firstAlertMsg})
      })
      </script>`;
  const withStyles = [part1, injectStyle, injectPolyfill, part2].join("");
  const withSrcPaths = replaceSrc(withStyles);
  slideElem.querySelector("iframe").src =
    "data:text/html;charset=utf-8," + encodeURIComponent(withSrcPaths);
}

function updatePreview(event) {
  const slideElem = event.target.parentElement.parentElement;
  setPreview(slideElem);
}

export function onSlideChangedUpdatePreview(event) {
  const slideElem = event.currentSlide;

  if (slideElem.classList.contains("update-preview")) {
    setPreview(slideElem);
    slideElem
      .querySelector("textarea")
      .addEventListener("change", updatePreview);
  }
}

export function defineLivePreviewSection() {
  customElements.define(
    "live-preview-section",
    class LivePreviewSection extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `<section class="side-by-side auto-injected" data-transition="slide-in none-out">
        <div>
          <textarea>
          </textarea>
        </div>
  
        <div></div>
      </section>
  
      <section
        class="side-by-side update-preview auto-injected"
        data-transition="fade-in slide-out"
      >
        <div>
          <textarea>
          </textarea>
        </div>
  
        <div class="chromes-chrome">
          <iframe
            src="data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3ENot%20Initialized%3C/body%3E%3C/html%3E"
          ></iframe>
        </div>
      </section>`;
      }

      connectedCallback() {
        if (this.hasChildNodes()) {
          this.childNodes.forEach((childElem) => {
            if (childElem.localName === "textarea") {
              this.shadowRoot
                .querySelectorAll("textarea")
                .forEach((textAreaElem) => {
                  textAreaElem.innerHTML = childElem.innerHTML;
                });
            }
          });
        }
      }
    }
  );
}

export function injectLivePreviewSections() {
  const elems = document.querySelectorAll("live-preview-section");
  elems.forEach((elem) => {
    elem.shadowRoot.querySelectorAll("section").forEach((section) => {
      elem.parentNode.insertBefore(section, elem);
    });
    elem.remove();
  });
}
