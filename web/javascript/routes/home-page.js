import { LitElement, html, css } from "lit";

import "../../../yuzu-components/components/yz-router/yz-link.js";
export const HANDLE = `home-page`;
export class HomePage extends LitElement {
  static styles = [css``];

  connectedCallback() {
    super.connectedCallback();
    const titleChangeEvent = new CustomEvent(`title-change`, {
      detail: {
        title: `Home`,
      },
      bubbles: true,
    });
    this.dispatchEvent(titleChangeEvent);
  }
  render() {
    return html`
      <p>This is the home page.</p>
      <yz-link to="/about">Go to about page</yz-link>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, HomePage);
}
