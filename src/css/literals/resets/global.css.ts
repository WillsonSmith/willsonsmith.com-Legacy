import { css } from 'lit';
import boxSizingCss from './box-sizing.css.js';

export default css`
  ${boxSizingCss}
  html,
  body {
    height: 100%;
  }

  body {
    line-height: var(--wsk-line-height-normal);
    margin: 0;
  }
`;
