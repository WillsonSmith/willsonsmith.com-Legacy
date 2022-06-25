/** Shoelace setup */
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath(`/vendor/modules/shoelace/dist`);

/** Shoelace components used on index */
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";

/** Main page required components components */
import "./components/stacking-scroller.js";

import "../../shared/web-components/page-header/page-header.js";
import "../../shared/web-components/colorize-word/colorize-word.js";
import "../../shared/web-components/yz-block-card/yz-block-card.js";

const header = document.querySelector(`page-header`);
header.addEventListener(`theme-change`, (event) => {
  const theme = event.detail.theme;
  localStorage.setItem(`preferred-theme`, theme);
  let dark = false;
  if (theme === `dark`) dark = true;
  if (theme === `automatic`) {
    dark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
  }

  document.documentElement.classList.toggle(`sl-theme-dark`, dark);
});
