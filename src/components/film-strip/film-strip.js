import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const HANDLE = `film-strip`;
class FilmStrip extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        height: 100px;
        position: relative;
      }

      .film-strip-mask {
        flex: 1;
      }

      .film-strip-mask {
        position: relative;
        position: relative;
        -webkit-mask-image: url(/img/film-strip-mask.svg);
        mask-image: url(/img/film-strip-mask.svg);
        -webkit-mask-size: contain;
        mask-size: contain;
      }

      .film-strip-background {
        position: absolute;
        inset: 15% 0 15% 0;
        background: var(--film-strip-background);
      }
    `,
  ];

  static properties = {
    color: { type: String },
    backgroundColor: { type: String, attribute: 'background-color' },
  };

  render() {
    return html`
      <div
        class="film-strip-background"
        style=${styleMap({
          '--film-strip-background': this.backgroundColor,
        })}
      >
        <slot></slot>
      </div>
      <div
        class="film-strip-mask"
        style=${styleMap({
          'background-color': this.color,
        })}
      ></div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, FilmStrip);
}
