import { LitElement, html, css } from "lit";

import { PageMixin } from "./mixins/PageMixin.js";

import "../../../yuzu-components/components/yz-router/yz-link.js";
export const HANDLE = `home-page`;
export class HomePage extends PageMixin(LitElement) {
  title = `Home`;
  static styles = [css``];

  render() {
    return html`
      <p>This is the home page.</p>
      <yz-link to="/about">Go to about page</yz-link>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  //@ts-ignore
  customElements.define(HANDLE, HomePage);
}
