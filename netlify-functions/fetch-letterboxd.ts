import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const rssFeed = 'https://letterboxd.com/willsonsmith/rss/';

  const response = await fetch(rssFeed, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'no-cors',
  });

  const xml = await response.text();

  return {
    statusCode: 200,
    body: xml,
  };
};
