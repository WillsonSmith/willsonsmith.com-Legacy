import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

import "../../yuzu-components/components/yz-router/yz-router.js";
import "../../yuzu-components/components/yz-router/yz-link.js";

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

      .missing-page {
        max-width: 60ch;
        margin: 0 auto;
      }
    `,
  ];

  static properties = {
    class: { type: String, reflect: true },
    darkMode: { type: Boolean },
    title: { type: String },
  };

  firstUpdated() {
    const darkMode = localStorage.getItem(`darkMode`);
    this.darkMode = darkMode === `true`;
  }

  updated(changedProperties) {
    if (changedProperties.has(`darkMode`)) {
      this.class = this.darkMode ? `sl-theme-dark` : ``;
    }
  }

  handleThemeChange() {
    this.darkMode = !this.darkMode;
    localStorage.setItem(`darkMode`, this.darkMode.toString());
  }

  handleTitleChange(event) {
    this.title = event.detail.title;
  }
  render() {
    return html`
      <div class=${classMap({ "sl-theme-dark": this.darkMode })}>
        <div class="page-header">
          <h1>${this.title}</h1>
          <sl-switch
            .checked=${this.darkMode}
            @sl-change=${this.handleThemeChange}
          >
            <sl-icon name=${this.darkMode ? `moon` : `sun`}></sl-icon>
          </sl-switch>
        </div>
        <main @title-change=${this.handleTitleChange}>
          <yz-router>
            <yz-route path="/" component="/routes/home-page"></yz-route>
            <yz-route path="/about" component="/routes/about-page"></yz-route>
            <div slot="warning" class="missing-page">
              <sl-alert variant="warning" open>
                <sl-icon slot="icon" name="exclamation-diamond"></sl-icon>
                <p>404: Page not found</p>
                <yz-link to="/">Go home</yz-link>
              </sl-alert>
            </div>
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
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
