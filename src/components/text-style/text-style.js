import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export const HANDLE = `text-style`;
class TextStyle extends LitElement {
  static styles = [
    css`
      /* Body is first so it can be overridden by other styles */
      .body {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.2;
      }

      .title {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .display {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .headline {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .subheading {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .caption {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1.2;
      }
    `,
  ];

  static properties = {
    title: { type: Boolean },
    display: { type: Boolean },
    headline: { type: Number },
    italic: { type: Boolean },
    monospace: { type: Boolean },
  };

  render() {
    return html`
      <div
        class=${classMap({
          body: true,
          title: this.title,
          display: this.display,
          headline: this.headline,
          monospace: this.monospace,
          italic: this.italic,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, TextStyle);
}
