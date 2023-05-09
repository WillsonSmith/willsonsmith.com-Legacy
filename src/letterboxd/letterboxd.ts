import { isServer } from 'lit';

export async function parseXML(xmlString: string) {
  let parser: DOMParser;

  if (isServer) {
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM();

    parser = new dom.window.DOMParser();
  } else {
    parser = new DOMParser();
  }

  const doc = parser.parseFromString(xmlString, 'text/xml');

  const items = Array.from(doc.querySelectorAll('item'));

  const movies = [];

  for (const item of items) {
    const descriptionMarkup = item.querySelector('description')?.textContent;
    const descriptionDoc = parser.parseFromString(descriptionMarkup || '', 'text/html');
    let image = descriptionDoc.querySelector('img')?.getAttribute('src') || '';

    // image = image?.replace('0-600-0-900', '0-200-0-300');

    const description = descriptionDoc.querySelector('p')?.textContent || '';

    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const date = item.querySelector('pubDate')?.textContent || '';

    const movie = {
      title,
      link,
      image,
      description,
      date,
    };

    movies.push(movie);
  }

  return movies.filter((movie) => movie.image);
}

export async function fetchLetterboxd() {
  let response: Response;

  if (isServer) {
    const rssFeed = 'https://letterboxd.com/willsonsmith/rss/';

    response = await fetch(rssFeed, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'no-cors',
    });
  } else {
    response = await fetch('/letterboxd');
  }

  const xml = await response.text();

  const parsed = await parseXML(xml);
  return parsed;
}
