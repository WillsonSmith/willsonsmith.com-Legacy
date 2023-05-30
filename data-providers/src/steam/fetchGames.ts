import { isServer } from 'lit';

export async function fetchGames() {
  if (isServer) {
    const { fetchGames: serverFetchGames } = await import('./serverFetchGames.js');
    return serverFetchGames();
  }

  const games = await fetch('/steam')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.games || [];
    });

  return games;
}
