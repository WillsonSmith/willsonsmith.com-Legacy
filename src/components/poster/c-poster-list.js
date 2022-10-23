import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const HANDLE = `c-poster-list`;
class PosterList extends LitElement {
  static styles = [
    css`
      .poster-list {
        display: flex;
        gap: var(--c-spacing-m);
        max-width: 100%;
        overflow-x: auto;
      }

      ::slotted(c-poster) {
        flex: 1 0 150px;
      }
    `,
  ];

  static properties = {
    center: { type: Boolean },
  };

  render() {
    return html`
      <div
        class="poster-list"
        style="${styleMap({
          justifyContent: this.center ? 'center' : 'flex-start',
        })};"
      >
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, PosterList);
}
