import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

@customElement('game-card')
export class GameCard extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) poster = '';
  @property({ type: String }) link = '';

  static styles = css`
    :host {
      display: block;
    }
    .game-card {
      display: flex;
      flex-direction: column;
      align-items: center;

      text-decoration: none;
      color: inherit;
    }
    img {
      max-width: 100%;
    }
  `;

  render() {
    return html`
      <a href=${this.link} class="game-card">
        <img src=${this.poster} alt=${this.title} />

        ${when(this.description, () => html`<p>${this.description}</p>`)}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-card': GameCard;
  }
}
