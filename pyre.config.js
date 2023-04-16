import { saveWatchedFilms } from './functions/movies/saveWatchedFilms.js';
export default async () => {
  await saveWatchedFilms('willsonsmith');
  return {
    input: 'src',
    output: { dir: 'pyre' },
    watch: { assetStrategy: 'symlink' },
    build: { assetStrategy: 'copy' },
    assetStrategy: 'symlink',
  };
};
