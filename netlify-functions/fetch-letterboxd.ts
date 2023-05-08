import { Handler } from '@netlify/functions';

import fetch from 'node-fetch';

export const handler: Handler = async (event, context) => {
  const rssFeed = 'https://letterboxd.com/willsonsmith/rss/';

  const response = await fetch(rssFeed, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      // cache for 1 day
      'Cache-Control': 'max-age=86400',
    },
    // mode: 'no-cors',
  });

  const xml = await response.text();

  return {
    statusCode: 200,
    body: xml,
  };
};
