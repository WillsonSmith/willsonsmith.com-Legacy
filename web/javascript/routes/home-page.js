import { LitElement, html, css } from "lit";

class HomePage extends LitElement {
  static styles = [css``];

  render() {
    return html`
      <h1>Home</h1>
      <p>This is the home page.</p>
    `;
  }
}

customElements.define(`home-page`, HomePage);
