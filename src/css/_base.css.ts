import { css } from 'lit';
import propsCss from './literals/props/props.css.js';
import resetsCss from './literals/resets/global.css.js';

export default css`
  ${propsCss}
  ${resetsCss}
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  p {
    margin: 0;
  }

  main-nav + * {
    margin-top: 3rem;
  }
`;
