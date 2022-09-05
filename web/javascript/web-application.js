import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

class WebApplication extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--sl-color-neutral-0);
      }
    `,
  ];

  static properties = {
    class: { type: String, reflect: true },
    darkMode: { type: Boolean },
  };

  updated(changedProperties) {
    if (changedProperties.has(`darkMode`)) {
      this.class = this.darkMode ? `sl-theme-dark` : ``;
    }
  }

  render() {
    return html`
      <div class=${classMap({ "sl-theme-dark": this.darkMode })}>
        <page-header @theme-change=${this.handleThemeChange}>
          <a class="page-header-link" href="/" slot="title">
            <colorize-word rainbow>Home</colorize-word>
          </a>
        </page-header>
        <main></main>
      </div>
    `;
  }

  handleThemeChange(event) {
    this.darkMode = event.detail.theme === `dark`;
  }

  constructor() {
    super();
    this.darkMode = false;
  }
}

customElements.define(`web-application`, WebApplication);
