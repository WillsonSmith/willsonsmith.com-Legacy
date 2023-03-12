import { css } from 'lit';
import propsCss from './literals/props/props.css.js';
import resetsCss from './literals/resets/global.css.js';

export default css`
  ${propsCss}
  ${resetsCss}
  h1 {
    font-family: sans-serif;
  }
`;
