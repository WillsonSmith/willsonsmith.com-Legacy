import { LitElement, html, css } from 'lit';
// import lit classmap directive
import { classMap } from 'lit/directives/class-map.js';

import '@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js';

class ColorizeWord extends LitElement {
  static get properties() {
    return {
      uppercase: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        --color-0: #e74c3c;
        --color-1: #e67e22;
        --color-2: #f1c40f;
        --color-3: #2ecc71;
        --color-4: #3498db;
        --color-5: #9b59b6;
        --color-6: #5b3256;
      }

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
  }

  render() {
    return html`
      <span
        class=${classMap({ 'split-word': true, uppercase: this.uppercase })}
        aria-hidden="true"
      >
        ${this.letters.map((letter, index) => {
          return html`
            <span style=${`--color: var(--color-${index}`}> ${letter} </span>
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
