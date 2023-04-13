import { getWatchedFilms } from './getWatchedFilms.js';
import { outputFile } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

export const saveWatchedFilms = async (username: string) => {
  const films = await getWatchedFilms(username);
  const outputPath = join(cwd(), 'src', 'data', 'movies.ts');
  const fileContent = `
export const movies = ${JSON.stringify(films, null, 2)};
  `;
  await outputFile(outputPath, fileContent);
  // return films;
};
