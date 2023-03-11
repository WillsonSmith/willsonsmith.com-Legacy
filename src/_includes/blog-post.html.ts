import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Data = {
  [key: string]: unknown;
};

export default (data: Data) => html`
  <h1>${data.title}</h1>
  <main>${unsafeHTML(data.content as string)}</main>
`;
