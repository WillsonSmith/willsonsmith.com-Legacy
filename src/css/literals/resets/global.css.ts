import { css } from 'lit';
import boxSizingCss from './box-sizing.css.js';
import headingsCss from './headings.css.js';
export default css`
  ${boxSizingCss}
  ${headingsCss}
  html,
  body {
    height: 100%;
  }

  body {
    line-height: var(--w-line-height-normal);
    margin: 0;
  }
`;
