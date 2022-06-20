import {css} from 'lit';

export const visuallyHidden = css`
  .visually-hidden {
    border: 0;
    position: absolute;
    margin: -1px;
    padding: 0;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    height: 1px;
  }
`;