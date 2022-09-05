import { LitElement, html, css } from "lit";

import "../../../yuzu-components/components/yz-router/yz-link.js";

export const HANDLE = `abut-page`;
class AboutPage extends LitElement {
  static styles = [css``];

  render() {
    return html`
      <p>This is the about page.</p>
      <yz-link to="/">Go to home page</yz-link>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, AboutPage);
}
