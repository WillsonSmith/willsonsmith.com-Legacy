import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import { visuallyHidden } from "../_system/util.js";
import { spacing } from "../_system/tokens/spacing.js";

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
      spacing,
      visuallyHidden,
      css`
        .split-word {
          display: flex;
        }
        .split-word span {
          text-shadow: 2px 2px var(--color);
        }
        .split-word span:not(:first-child) {
          margin-left: var(--yz-spacing-01);
        }

        .uppercase {
          text-transform: uppercase;
        }
      `,
    ];
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
    const splitWordClasses = classMap({
      "split-word": true,
      uppercase: this.uppercase,
    });

    const splitWord = this.letters.map((letter, index) => {
      const color = this.colors[index];
      return html`<span style=${styleMap({ "--color": color })}
        >${letter}</span
      >`;
    });

    return html`
      <span class=${splitWordClasses} aria-hidden="true">
        ${splitWord}
        <div class="visually-hidden">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
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
