// import { saveWatchedFilms } from './functions/movies/saveWatchedFilms.js';
import { saveSteamGames } from './functions/steam/saveSteamGames.js';

export default async () => {
  // await saveWatchedFilms('willsonsmith');

  await saveSteamGames();

  return {
    input: 'src',
    output: { dir: 'pyre' },
    watch: { assetStrategy: 'symlink' },
    build: { assetStrategy: 'copy' },
    assetStrategy: 'symlink',
  };
};
