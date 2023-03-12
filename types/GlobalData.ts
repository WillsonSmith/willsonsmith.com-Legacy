import type { Post } from './collections/Post';

export type GlobalData = {
  [key: string]: unknown;
  title: string;
  page: {
    url: string;
  };
  collections: {
    published?: Post[];
  };
};
