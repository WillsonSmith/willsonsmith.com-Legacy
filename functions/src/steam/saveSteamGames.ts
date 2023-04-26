import { fetchSteamGames } from './steamGames.js';

import { outputFile } from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';
export const saveSteamGames = async () => {
  const games = await fetchSteamGames();
  const outputPath = join(cwd(), 'src', 'data', 'steam.ts');
  const fileContent = `
export const steam = ${JSON.stringify(games, null, 2)};
  `;
  return await outputFile(outputPath, fileContent);
};
