import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Post } from '../../../types/collections/Post';

@customElement('post-list')
export class PostList extends LitElement {
  @property({ type: String, attribute: 'current-post' }) currentPost?: string = '';
  @property({ type: Number }) limit = 5;
  @property({ type: Array }) posts: Post[] = [];

  render() {
    return html`
      <nav class="post-list">
        ${this.posts
          .filter((post) => post.url !== this.currentPost)
          .map((post) => {
            return html`<a href="${post.url}">${post.data.title}</a>`;
          })
          .slice(0, this.limit)}
      </nav>
    `;
  }

  static styles = [
    css`
      .post-list {
        display: grid;
        gap: 0.3rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'post-list': PostList;
  }
}
