import { saveWatchedFilms } from './functions/functions/src/movies/saveWatchedFilms.js';
import { saveSteamGames } from './functions/functions/src/steam/saveSteamGames.js';

export default async () => {
  await saveWatchedFilms();

  await saveSteamGames();

  return {
    input: 'src',
    output: { dir: 'pyre' },
    watch: { assetStrategy: 'symlink' },
    build: { assetStrategy: 'copy' },
    assetStrategy: 'symlink',
  };
};
