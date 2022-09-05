import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

import "./routes/home-page.js";
import "../../yuzu-components/components/yz-router/yz-router.js";

class WebApplication extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--sl-color-neutral-0);
        color: var(--sl-color-neutral-900);
      }
      .page-header {
        display: flex;
        align-items: center;
        padding: var(--sl-spacing-medium);
      }
      .page-header h1 {
        flex: 1;
        margin: 0;

        font-size: var(--sl-font-size-2x-large);
        line-height: var(--sl-line-height-denser);
      }
    `,
  ];

  static properties = {
    class: { type: String, reflect: true },
    darkMode: { type: Boolean },
    title: { type: String },
  };

  updated(changedProperties) {
    if (changedProperties.has(`darkMode`)) {
      this.class = this.darkMode ? `sl-theme-dark` : ``;
    }
  }

  handleThemeChange(event) {
    this.darkMode = !event.target.checked;
  }
  render() {
    return html`
      <div class=${classMap({ "sl-theme-dark": this.darkMode })}>
        <div class="page-header">
          <h1>Home</h1>
          <sl-switch checked @sl-change=${this.handleThemeChange}>
            <sl-icon name=${this.darkMode ? `moon` : `sun`}></sl-icon>
          </sl-switch>
        </div>
        <main>
          <slot></slot>
          <yz-router>
            <yz-route active path="/" component="/routes/home-page"></yz-route>
            <yz-route path="/about"></yz-route>
          </yz-router>
        </main>
      </div>
    `;
  }

  constructor() {
    super();
    this.darkMode = false;
    this.title = ``;
  }
}

customElements.define(`web-application`, WebApplication);
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
