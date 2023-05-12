import { outputFile } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

import { fetchLetterboxd } from '../../../data-providers/lib/letterboxd/fetchDiary.js';

export const saveLetterboxdDiary = async () => {
  const films = await fetchLetterboxd();
  const outputPath = join(cwd(), 'src', 'data', 'movies.ts');
  const fileContent = `
export const movies = ${JSON.stringify(films, null, 2)};
  `;
  return await outputFile(outputPath, fileContent);

  // return films;
};
