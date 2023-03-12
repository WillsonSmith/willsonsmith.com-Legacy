import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Data = {
  [key: string]: unknown;
};

export default (data: Data) => {
  console.log(data);
  return html`
    <h1>Blog</h1>
    <main>${unsafeHTML(data.content as string)}</main>
    <aside></aside>
  `;
};
