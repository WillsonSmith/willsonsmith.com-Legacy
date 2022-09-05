import { LitElement, html, css } from "lit";

export const HANDLE = `abut-page`;
class AboutPage extends LitElement {
  static styles = [css``];

  render() {
    return html`ghello<slot></slot>`;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, AboutPage);
}
