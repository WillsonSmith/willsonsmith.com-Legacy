import Gradient from 'javascript-color-gradient';
import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import '@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js';

const COLORS = [
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#5b3256',
];

class ColorizeWord extends LitElement {
  static get properties() {
    return {
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
  }

  connectedCallback() {
    super.connectedCallback();
    const text = this.textContent;
    this.letters = text.split('');
    this.colors = new Gradient()
      .setColorGradient(...COLORS)
      .setMidpoint(this.letters.length)
      .getColors();
  }

  render() {
    return html`
      <span
        class=${classMap({ 'split-word': true, uppercase: this.uppercase })}
        aria-hidden="true"
      >
        ${this.letters.map((letter, index) => {
          return html`
            <span style=${`--color: ${this.colors[index]}`}> ${letter} </span>
          `;
        })}
        <sl-visually-hidden>
          <slot></slot>
        </sl-visually-hidden>
      </span>
    `;
  }
}

customElements.define('colorize-word', ColorizeWord);
