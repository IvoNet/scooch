export const replaceThemeCss = (style: string) => {
  const initialElem = document.querySelector("style#theme");

  if (!initialElem) {
    const newElem = document.createElement("style");
    newElem.setAttribute("id", "theme");
    const headElem = document.getElementsByTagName("head");
    headElem[0].appendChild(newElem);
  }

  const themeStyleElem = document.querySelector("style#theme");

  if (themeStyleElem) {
    themeStyleElem.textContent = style;
  }
};
