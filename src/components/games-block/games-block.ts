import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './game-card.js';

@customElement('games-block')
export class GamesBlock extends LitElement {
  @property({ type: Array }) games = [];

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
        ${this.games.map((game) => {
          console.log(game);
          return html`
            <game-card
              title=${game.name}
              poster=${game.header_image}
              link=${game.website || `https://store.steampowered.com/app/${game.steam_appid}`}
            ></game-card>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'games-block': GamesBlock;
  }
}
