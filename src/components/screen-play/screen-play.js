import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

export const HANDLE = `screen-play`;
class ScreenPlay extends LitElement {
  static styles = [
    css`
      :host {
        --background-color: var(--theme-color-white, HSLA(100, 0%, 100%, 1));

        --box-shadow: -1px 1px 0 var(--theme-color-black, rgba(0, 0, 0, 1)),
          -2px 2px 0 var(--theme-color-black, rgba(0, 0, 0, 1)),
          -3px 3px 0px var(--theme-color-black, rgba(0, 0, 0, 1)),
          -4px 4px 0.5px var(--theme-color-black, rgba(0, 0, 0, 1));
        --padding: var(--c-spacing-m, 1rem);
      }
      .paper {
        background-color: var(--background-color);
        padding: var(--padding);
      }

      .shadow {
        box-shadow: var(--box-shadow);
      }

      ::slotted(p) {
        margin: 0;
        margin: var(--c-spacing-sm, 0.5rem);
      }
    `,
  ];

  static properties = {
    rotate: { type: String },
    shadow: { type: Boolean },
  };

  render() {
    return html` <div
      part="paper"
      class=${classMap({
        paper: true,
        shadow: this.shadow,
      })}
      style=${styleMap({ transform: `rotate(${this.rotate})` })}
    >
      <div
        class="content"
        style=${styleMap({ transform: `rotate(calc(${this.rotate} * -1))` })}
      >
        <slot></slot>
      </div>
    </div>`;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, ScreenPlay);
}
