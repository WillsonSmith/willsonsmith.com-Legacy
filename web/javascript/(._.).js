/** Shoelace setup */
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath(`/vendor/modules/shoelace/dist`);

/** Shoelace components used on index */
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";

/** Main page required components components */

import "../../shared/web-components/page-header/page-header.js";
import "../../shared/web-components/colorize-word/colorize-word.js";
import "../../shared/web-components/yz-block-card/yz-block-card.js";

import "./components/stacking-scroller.js";

const header = document.querySelector("page-header");
header.addEventListener("theme-change", (event) => {
  const theme = event.detail.theme;
  localStorage.setItem("preferred-theme", theme);
  let dark = false;
  if (theme === "dark") dark = true;
  if (theme === "automatic") {
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.documentElement.classList.toggle("sl-theme-dark", dark);
  recolorStars();
});

recolorStars();
function recolorStars() {
  const header = document.querySelector(`page-header`);
  const stars = document.querySelector(`.background-stars`);
  if (!document.documentElement.classList.contains("sl-theme-dark")) {
    const color = "hsl(265.1 61.5% 21.4%)";
    header.setAttribute("star-color", color);
    stars.setAttribute("star-color", color);
    return;
  }
  header.setAttribute("star-color", `#fff`);
  stars.setAttribute("star-color", `#fff`);
}
