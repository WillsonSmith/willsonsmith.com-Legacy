import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('two-column')
export class TwoColumnLayout extends LitElement {
  render() {
    return html`
      <div class="two-column">
        <div class="two-column__primary">
          <slot></slot>
        </div>
        <div class="two-column__secondary">
          <slot name="secondary"></slot>
        </div>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
      }
      .two-column {
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 1rem;
      }

      @media (max-width: 480px) {
        .two-column {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'two-column': TwoColumnLayout;
  }
}
