import { LitElement, html, nothing, css, isServer } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nav-link')
export class NavLink extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: String }) icon = '';

  static styles = css`
    .nav-link {
      display: flex;
      gap: var(--spacing-xs);
      align-items: center;

      color: var(--color-text-body);
      text-decoration: none;
    }

    sl-icon {
      width: 16px;
    }
  `;

  render() {
    return html`
      <a href="${this.href}" class="nav-link">
        ${this.icon ? html`<sl-icon name="${this.icon}"></sl-icon>` : nothing}
        <slot></slot>
      </a>
    `;
  }
}

if (!isServer) {
  import('@shoelace-style/shoelace/dist/components/icon/icon.js');
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-link': NavLink;
  }
}
