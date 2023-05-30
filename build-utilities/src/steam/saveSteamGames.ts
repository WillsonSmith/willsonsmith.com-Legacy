import { outputFile } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';

import { fetchGames } from '../../../data-providers/lib/steam/fetchGames.js';

export const saveSteamGames = async () => {
  const games = await fetchGames();
  console.log(games);
  const outputPath = join(cwd(), 'src', 'data', 'games.ts');
  const fileContent = `
export const games = ${JSON.stringify(games, null, 2)};
  `;
  return await outputFile(outputPath, fileContent);
};
