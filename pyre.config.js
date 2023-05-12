import { saveWatchedFilms } from './functions/functions/src/movies/saveWatchedFilms.js';
import { saveSteamGames } from './functions/functions/src/steam/saveSteamGames.js';

import { saveLetterboxdDiary } from './build-utilities/lib/letterboxd/saveLetterboxdDiary.js';

export default async () => {
  await saveLetterboxdDiary();

  await saveSteamGames();

  return {
    input: 'src',
    output: { dir: 'pyre' },
    watch: { assetStrategy: 'symlink' },
    build: { assetStrategy: 'copy' },
    assetStrategy: 'symlink',
  };
};
