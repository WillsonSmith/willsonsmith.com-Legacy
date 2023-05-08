import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('movie-block')
export class MovieBlock extends LitElement {
  render() {
    return html`
      <div class="movie-block">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 100%;
    }

    .movie-block {
      max-width: 100%;
      display: flex;
      overflow-x: auto;
      gap: var(--spacing);
    }
  `;
}

@customElement('movie-block-movie')
export class MovieBlockMovie extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) url = '';
  @property({ type: String }) image = '';

  render() {
    return html`
      <a href=${this.url}>
        <img src=${this.image} alt=${this.title} loading="lazy" width="200" height="300" />
      </a>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    img {
      display: block;
      max-width: 150px;
      height: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'movie-block': MovieBlock;
    'movie-block-movie': MovieBlockMovie;
  }
}
