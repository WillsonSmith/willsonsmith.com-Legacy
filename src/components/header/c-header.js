import { LitElement, html, css } from 'lit';

export const HANDLE = `c-header`;
class Header extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: var(--c-spacing-m);
        align-items: center;
        justify-content: space-between;
      }

      h1 {
        margin: 0;
      }

      .nav-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: var(--c-spacing-m);
      }
    `,
  ];

  render() {
    return html` <div class="container">
      <h1>Willson</h1>
      <nav>
        <ul class="nav-list" role="list">
          <li><a href="https://twitter.com/modfox">twitter</a></li>
          <li><a href="https://github.com/willsonsmith">github</a></li>
        </ul>
      </nav>
    </div>`;
  }
}

if (customElements.get(HANDLE) === undefined) {
  customElements.define(HANDLE, Header);
}
