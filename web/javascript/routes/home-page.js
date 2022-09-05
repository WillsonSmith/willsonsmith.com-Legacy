import { LitElement, html, css } from "lit";

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
    return html` <p>This is the home page.</p> `;
  }
}

if (customElements.get(`home-page`) === undefined)
  customElements.define(`home-page`, HomePage);
