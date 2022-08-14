import { LitElement, html, css } from "lit";

import { spacing } from "../../../shared/web-components/_system/tokens/spacing.js";
class MyComponent extends LitElement {
  static styles = [
    spacing,
    css`
      :host {
        display: inline-block;
      }
      .avatar-wrapper {
        background: #000;
        border-radius: 5px;
        padding: var(--yz-spacing-01);
        /* display: flex; */
      }
      .avatar {
        background: #fff;
        display: flex;
        border-radius: 25px;
        /* aspect-ratio: 1;
        justify-content: center;
        align-items: center; */
        padding: var(--yz-spacing-04);
        /* border: 8px solid black;
        border-radius: 20px; */
      }
    `,
  ];
  static properties = {
    user: { type: String },
  };

  constructor() {
    super();
    this.user = ``;
  }
  render() {
    return html`<div class="avatar-wrapper">
      <div class="avatar">
        <sl-qr-code value="${this.user}" size="100"></sl-qr-code>
      </div>
    </div>`;
  }
}

import "@shoelace-style/shoelace/dist/components/qr-code/qr-code.js";

customElements.define(`qr-avatar`, MyComponent);
