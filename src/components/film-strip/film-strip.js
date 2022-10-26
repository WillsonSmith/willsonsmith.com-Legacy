import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const HANDLE = `film-strip`;
class FilmStrip extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        height: 100px;
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
    `,
  ];

  static properties = {
    color: { type: String },
  };

  render() {
    return html`
      <div
        class="film-strip-mask"
        style=${styleMap({
          'background-color': this.color,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, FilmStrip);
}
