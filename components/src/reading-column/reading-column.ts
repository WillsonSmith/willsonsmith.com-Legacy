import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('reading-column')
export class ReadingColumn extends LitElement {
  static styles = css`
    :host {
      --maximal-width: 60ch;
      display: block;
      max-width: var(--maximal-width);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'reading-column': ReadingColumn;
  }
}
