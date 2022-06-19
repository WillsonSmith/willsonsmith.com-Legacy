import { LitElement, html, css } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";

class YZBlockCard extends LitElement {
  static get properties() {
    return {
      skew: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        --yz-block-card-background: hsla(0, 0%, 100%, 1);
        --yz-block-card-padding: calc(4px * 8);
        --yz-shadow-width: 2;
        --yz-shadow-color: hsla(0, 0%, 0%, 1);
        --skew: 0;
      }
      .yz-block-card {
        background: var(--yz-block-card-background);
        box-shadow: 2px 2px 0 2px var(--yz-shadow-color),
          inset 2px 2px 0 2px var(--yz-shadow-color);

        padding: var(--yz-block-card-padding);
        transform: skew(var(--skew));
      }

      .yz-block-card-content {
        transform: skew(calc(var(--skew) * -1));
      }
    `;
  }

  skew = ``;
  render() {
    let styles = {};
    if (this.skew) {
      styles = styleMap({
        "--skew": `${this.skew}`,
      });
    }
    return html`
      <div class="yz-block-card" style=${styles}>
        <div class="yz-block-card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define(`yz-block-card`, YZBlockCard);
