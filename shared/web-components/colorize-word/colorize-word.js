import Gradient from "javascript-color-gradient";
import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

import "@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js";

const COLOR_DEFAULTS = [
  `#e74c3c`,
  `#e67e22`,
  `#f1c40f`,
  `#2ecc71`,
  `#3498db`,
  `#9b59b6`,
  `#5b3256`,
];

class ColorizeWord extends LitElement {
  static get properties() {
    return {
      colors: { type: Array },
      letters: { type: Array },
      rainbow: { type: Boolean },
      uppercase: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .split-word {
        display: flex;
      }
      .split-word span {
        text-shadow: 2px 2px var(--color);
      }
      .split-word span:not(:first-child) {
        margin-left: var(--sl-spacing-2x-small);
      }

      .uppercase {
        text-transform: uppercase;
      }
    `;
  }

  constructor() {
    super();
    this.letters = this.textContent.split(``);
    this.colors = [...new Array(this.letters.length)].map(() => `#000000`);
  }

  firstUpdated() {
    this.colors = this._gradient();
  }

  updated(changedProperties) {
    if (changedProperties.has(`letters`) || changedProperties.has(`rainbow`)) {
      this.colors = this._gradient();
    }
  }

  render() {
    return html`
      <span
        class=${classMap({ "split-word": true, uppercase: this.uppercase })}
        aria-hidden="true"
      >
        ${this.letters.map((letter, index) => {
          return html`
            <span style=${`--color: ${this.colors[index]}`}>${letter}</span>
          `;
        })}
        <sl-visually-hidden>
          <slot @slotchange=${this._handleSlotChange}></slot>
        </sl-visually-hidden>
      </span>
    `;
  }

  _gradient() {
    return new Gradient()
      .setColorGradient(...(this.rainbow ? COLOR_DEFAULTS : this.colors))
      .setMidpoint(this.letters.length)
      .getColors();
  }

  _handleSlotChange() {
    this.letters = this.textContent.split(``);
  }
}

customElements.define(`colorize-word`, ColorizeWord);
