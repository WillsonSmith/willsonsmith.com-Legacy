import { LitElement, html } from "lit";

class SwipablePage extends LitElement {
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(`yz-swipable-page`, SwipablePage);
