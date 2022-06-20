import { css } from "lit";

export const spacing = css`
  :host {
    /* --yz-spacing-01: 4px; */
    --yz-spacing-01: 0.25rem;
    --yz-spacing-02: calc(var(--yz-spacing-base) * 2);
    --yz-spacing-03: calc(var(--yz-spacing-base) * 3);
    --yz-spacing-04: calc(var(--yz-spacing-base) * 4);
    --yz-spacing-05: calc(var(--yz-spacing-base) * 5);
  }
`;
