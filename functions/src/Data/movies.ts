import { JSONOperationCache } from '../JSONOperationCache/JSONOperationCache.js';
import { LetterboxdAPI } from '../LetterboxdAPI/LetterboxdAPI.js';

import { join } from 'path';
import { cwd } from 'process';

const letterboxd = new LetterboxdAPI();
export const getWatchedFilms = async (username: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  const { default: eleventyImage } = await import('@11ty/eleventy-img');

  const cache = new JSONOperationCache({
    cacheKey: `letterboxd:${username}`,
    duration: 60 * 60 * 1000, // 1 hour
    cacheDir: './.cache',
  });

  const films = await cache.performOperation(async () => {
    return letterboxd.getWatchedFilms(username);
  });

  const filmsWithImages = await Promise.all(
    films.map(async (film) => {
      const image = await eleventyImage(film.src, {
        widths: [300],
        formats: ['webp', 'jpeg', 'avif'],
        urlPath: '/images/letterboxd/',
        outputDir: join(cwd(), 'src', 'images', 'letterboxd'),
      });
      return {
        ...film,
        image,
      };
    }),
  );

  return filmsWithImages;
};
