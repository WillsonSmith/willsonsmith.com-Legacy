import { html, isServer } from 'lit';

export const links = [
  {
    rel: 'stylesheet',
    href: '/css/reset.css',
  },
];

interface IndexData {
  ipsum: string;
}

export let initialData: IndexData = {
  ipsum: 'Loading...',
};

if (isServer) {
  const ipsum = await fetchIpsum({});
  initialData = {
    ipsum,
  };
}

import 'components/reading-column.js';
export default async ({ ipsum = initialData.ipsum }) => {
  return html`<h1>Hello World</h1>
    <reading-column>
      <p>${ipsum}</p>
    </reading-column> `;
};

export const update = async () => {
  return new Promise(async (resolve) => {
    const ipsum = await fetchIpsum({
      paras: 4,
      startWithLorem: false,
    });
    setTimeout(() => {
      resolve({ ipsum });
    }, 2000);
  });
};

// Tools for fetching ipsum
interface FetchIpsumOptions {
  type?: 'all-meat' | 'meat-and-filler';
  paras?: number;
  startWithLorem?: boolean;
}

async function fetchIpsum({
  type = 'all-meat',
  paras = 3,
  startWithLorem = true,
}: FetchIpsumOptions): Promise<string> {
  const response = await fetch(
    `https://baconipsum.com/api/?type=${type}&paras=${paras}&start-with-lorem=${
      startWithLorem ? 1 : 0
    }`,
  );

  const data = await response.json();

  return data[0];
}
