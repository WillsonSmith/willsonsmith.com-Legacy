import { LitElement, html, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { visuallyHidden } from "../_system/util.js";

import Gradient from "javascript-color-gradient";
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
    return [
      visuallyHidden,
      css`
        .wrap {
          position: relative;
          display: inline-block;
        }
        .shadow {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: absolute;
          left: 2px;
          top: 2px;
          z-index: -1;
        }

        .uppercase {
          text-transform: uppercase;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.letters = this.textContent;
    this.colors = [...new Array(this.letters.split(``).length)].map(
      () => `#000000`
    );
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
    const gradientList = this.colors
      .map((color, index) => {
        const percent = ((index + 1) / this.colors.length) * 100;
        return `${color} ${percent}% `;
      })
      .join(`, `);
    const gradient = `linear-gradient(90deg, ${gradientList})`;
    return html`
      <span class="wrap">
        <span>${this.letters}</span>
        <span
          class="shadow"
          style=${styleMap({
            backgroundImage: gradient,
          })}
          >${this.letters}</span
        >
        <span class="visually-hidden">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </span>
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
    this.letters = this.textContent;
  }
}

customElements.define(`colorize-word`, ColorizeWord);
