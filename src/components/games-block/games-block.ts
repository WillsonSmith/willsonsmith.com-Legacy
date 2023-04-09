import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SteamGameDetails } from 'functions/SteamAPI';

@customElement('games-block')
export class GamesBlock extends LitElement {
  @property({ type: Array }) games: SteamGameDetails[] = [];

  static styles = css`
    :host {
      display: block;
    }
    .games-block {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-lg);
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
      <ul role="list" class="games-block">
        ${this.games.map(
          (game) => html`
            <li class="games-block__item">
              <img src=${game.header_image} alt="" />
              ${game.name}
            </li>
          `,
        )}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'games-block': GamesBlock;
  }
}
