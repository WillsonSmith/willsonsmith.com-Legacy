import { LitElement, html, css } from "lit";

class HomePage extends LitElement {
  static styles = [css``];

  render() {
    return html`hello<slot></slot>`;
  }
}

customElements.define(`home-page`, HomePage);
