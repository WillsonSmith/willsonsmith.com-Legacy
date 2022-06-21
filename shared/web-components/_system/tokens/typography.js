import { css } from "lit";

export const fonts = css`
  :host {
    --yz-font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
    --yz-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --yz-font-monospace: Monaco, Menlo, Consolas, "Courier New", monospace;

    --yz-font-size-small: calc(var(--yz-font-size-base) * 0.875);
    --yz-font-size-base: 1rem;
    --yz-font-size-medium: calc(var(--yz-font-size-base) * 1.125);
    --yz-font-size-large: calc(var(--yz-font-size-base) * 1.5);
    --yz-font-size-xlarge: calc(var(--yz-font-size-base) * 2.25);

    --yz-font-weight-thin: 100;
    --yz-font-weight-light: 300;
    --yz-font-weight-regular: 400;
    --yz-font-weight-medium: 500;
    --yz-font-weight-bold: 700;
  }
`;
