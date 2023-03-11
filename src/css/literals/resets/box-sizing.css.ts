import { css } from 'lit';

export default css`
  :root,
  :host {
    box-sizing: border-box;
  }

  :host > * {
    box-sizing: border-box;
  }

  :host > * *::before,
  :host > * *::after {
    box-sizing: inherit;
  }

  html,
  :root *::before,
  :root *::after {
    box-sizing: inherit;
  }
`;
