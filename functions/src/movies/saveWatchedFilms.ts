import { getWatchedFilms } from './getWatchedFilms.js';
import { outputFile } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

export const saveWatchedFilms = async (username: string) => {
  const films = await getWatchedFilms(username);
  const outputPath = join(cwd(), 'src', 'pyre', 'movies.js');
  const fileContent = `
export const movies = ${JSON.stringify(films, null, 2)};
  `;
  return await outputFile(outputPath, fileContent);

  // return films;
};
