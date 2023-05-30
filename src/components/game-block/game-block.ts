import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './game-card.js';

import { fetchGames } from '../../../data-providers/lib/steam/fetchGames.js';

import { games } from '../../data/games.js';

interface SteamGame {
  type: string;
  steam_appid: number;
  name: string;
  description: string;
  header_image: string;
  website?: string;
}

interface Game {
  name: SteamGame['name'];
  description: SteamGame['description'];
  image: SteamGame['header_image'];
  url: SteamGame['website'] | string;
}

@customElement('game-block')
export class GameBlock extends LitElement {
  @property({ type: Array }) games: Game[] = games.games;

  async firstUpdated() {
    const games = await fetchGames();
    this.games = games;
  }

  render() {
    return html`<div class="game-block">
      ${this.games.map((game) => {
        return html`<game-card
          title=${game.name}
          poster=${game.image}
          link=${game.url}
        ></game-card>`;
      })}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    .game-block {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'game-block': GameBlock;
  }
}
