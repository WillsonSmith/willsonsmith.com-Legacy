import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../navigation/main-nav.js';

@customElement('main-page')
export class MainPage extends LitElement {
  render() {
    return html`
      <main-nav></main-nav>
      <div class="page">
        <slot></slot>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
      }

      .page {
        max-width: 100ch;
        margin: 0 auto;
        margin-block-start: 2rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'main-page': MainPage;
  }
}
