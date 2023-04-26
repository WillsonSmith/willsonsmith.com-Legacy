import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface EleventyImage {
  filename: string;
  format: string;
  height: number;
  width: number;
  sourceType: string;
  srcset: string;
  url: string;
}

interface Movie {
  src: string;
  alt: string;
  url: string;
  image: {
    webp: EleventyImage[];
    avif: EleventyImage[];
    jpeg: EleventyImage[];
  };
}

@customElement('movies-block')
export class MoviesBlock extends LitElement {
  @property({ type: Array }) movies: Movie[] = [];

  static styles = css`
    :host {
      display: block;
      line-height: var(--line-height-sm);
    }
    .movies-block {
      display: flex;
      flex-direction: column;
      gap: var(--spacing);
    }

    img {
      display: block;
      max-width: 100%;
    }

    picture {
      display: block;
      width: 150px;
    }

    .movies-block__latest {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--spacing);
    }

    .first-image {
      max-width: 150px;
    }

    .movies-block__list {
      max-width: 100%;
      overflow-x: auto;
      display: flex;
      gap: var(--spacing-xs);
    }
  `;
  render() {
    if (!this.movies?.length) return;

    const sources = this.movies?.map((movie) => {
      return Object.entries(movie.image).map(([format, images]) => {
        const image = images[0];
        return html` <source type=${format} srcset=${image.srcset} sizes=${image.width} /> `;
      });
    });

    return html`
      <div class="movies-block">
        <div class="movies-block__list">
          ${this.movies?.map((movie) => {
            const picture = html`
              <picture>
                ${sources}
                <img src=${movie.src} alt=${movie.alt} />
              </picture>
            `;
            return html` <div>${picture}</div> `;
          })}
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
