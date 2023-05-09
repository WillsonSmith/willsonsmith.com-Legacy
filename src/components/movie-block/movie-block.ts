import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fetchLetterboxd } from '../../letterboxd/letterboxd.js';

import { movies } from '../../data/movies.js';

interface Movie {
  title: string;
  link: string;
  image: string;
}

@customElement('movie-block')
export class MovieBlock extends LitElement {
  @property({ type: Array }) movies: Movie[] = movies;

  firstUpdated() {
    fetchLetterboxd()
      .then((liveMovies) => {
        if (liveMovies.length) {
          this.movies = liveMovies;
          return;
        }
        this.movies = movies;
      })
      .catch((_error) => {
        this.movies = movies;
      });
  }

  render() {
    return html`
      <div class="movie-block">
        ${this.movies.map((movie) => {
          return html`<movie-block-movie
            title=${movie.title}
            url=${movie.link}
            image=${movie.image}
          ></movie-block-movie>`;
        })}
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
