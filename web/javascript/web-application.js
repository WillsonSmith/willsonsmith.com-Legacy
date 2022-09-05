import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

import "./routes/home-page.js";

class WebApplication extends LitElement {
  static styles = [
    css`
      :host {
        background: var(--sl-color-neutral-0);
        color: var(--sl-color-neutral-900);
      }
      .page-header {
        position: fixed;
        inset: 0 0 auto auto;
        padding: var(--sl-spacing-medium);
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

  handleThemeChange(event) {
    this.darkMode = !event.target.checked;
  }
  render() {
    return html`
      <div class=${classMap({ "sl-theme-dark": this.darkMode })}>
        <div class="page-header">
          <sl-switch checked @sl-change=${this.handleThemeChange}>
            <sl-icon name=${this.darkMode ? `moon` : `sun`}></sl-icon>
          </sl-switch>
        </div>
        <main>
          <slot></slot>
          <yz-router>
            <yz-route path="/">
              <home-page></home-page>
            </yz-route>
            <yz-route path="/about">
              <about-page></about-page>
            </yz-route>
          </yz-router>
        </main>
      </div>
    `;
  }

  constructor() {
    super();
    this.darkMode = false;
  }
}

customElements.define(`web-application`, WebApplication);
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
