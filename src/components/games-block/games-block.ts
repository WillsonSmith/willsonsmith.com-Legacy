import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './game-card.js';

@customElement('games-block')
export class GamesBlock extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .games-block {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-sm);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    img {
      max-width: 100%;
    }
  `;

  render() {
    return html`
      <div class="games-block">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'games-block': GamesBlock;
  }
}
