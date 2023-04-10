import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('movies-block')
export class MoviesBlock extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';

  @property({ type: String }) poster = '';

  static styles = css`
    :host {
      display: block;
      line-height: var(--line-height-sm);
    }
    .movies-block {
      display: grid;
      grid-template-columns: 1fr 200px;
      gap: var(--spacing-lg);
    }

    .movies-block-section {
      box-sizing: border-box;
    }

    .movies-block__title {
      font-family: var(--font-system-sans);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-xl);
      line-height: var(--line-height-sm);
    }

    .movies-block__poster img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `;
  render() {
    // Make this take a series of movies and render them in a grid
    // The grid will have one row at the top that spans the entire width
    // below that will be a grid of movies
    // The movie component will set its layout based on the size of the container
    // This way we can have a single movie component that can be used in a variably-sized grid
    return html`
      <div class="movies-block">
        <section class="movies-block-section">
          <div class="movies-block__title">${this.title}</div>
          <div class="movies-block__content">${this.description}</div>
        </section>
        <div class="movies-block__poster">
          <img src="${this.poster}" alt=${`${this.title} movie poster`} />
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'movies-block': MoviesBlock;
  }
}
