import { LitElement, html, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";

import { spacing } from "../_system/tokens/spacing.js";

class YZBlockCard extends LitElement {
  static properties = {
    skew: { type: String },
  };
  static styles = [
    spacing,
    css`
      :host {
        display: block;
        --block-card-background: hsla(0, 0%, 100%, 1);
        --block-card-padding: var(--yz-spacing-05);
        --shadow-color: hsla(0, 0%, 0%, 1);
        --shadow-width: 2;
        --skew: 0;
      }
      .block-card {
        background: var(--block-card-background);
        box-shadow: 2px 2px 0 2px var(--shadow-color),
          inset 2px 2px 0 2px var(--shadow-color);

        padding: var(--block-card-padding);
        transform: skew(var(--skew));
      }
      .block-card-content {
        transform: skew(calc(var(--skew) * -1));
      }
    `,
  ];

  render() {
    let styles = {};
    if (this.skew) {
      styles = styleMap({
        "--skew": `${this.skew}`,
      });
    }
    return html`
      <div class="block-card" style=${styles}>
        <div class="block-card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define(`yz-block-card`, YZBlockCard);
