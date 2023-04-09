import { config } from 'dotenv';
config();

const steamApiKey = process.env.STEAM_API_KEY;
const steamUserId = process.env.STEAM_USER_ID;

import { SteamAPI } from './SteamAPI.js';
const steamAPI = new SteamAPI(steamApiKey || '');
steamAPI.fetch = fetcher;

import type { SteamGame, SteamGameDetails } from './SteamAPI.js';

export async function fetchSteamGames(): Promise<SteamGameDetails[]> {
  if (steamUserId) {
    const games: SteamGame[] = await steamAPI.getPlayerOwnedGames(steamUserId);
    games.sort((a, b) => {
      if (a.rtime_last_played > b.rtime_last_played) {
        return -1;
      }
      if (a.rtime_last_played < b.rtime_last_played) {
        return 1;
      }
      return 0;
    });

    const latestGames = games.slice(0, 10);
    return await Promise.all(
      latestGames.map(async (game) => {
        const details = await steamAPI.getGameDetails(game.appid.toString());
        return details.data;
      }),
    );
  }
  return [];
}

async function fetcher(url: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore-next-line
  const { default: eleventyFetch } = await import('@11ty/eleventy-fetch');

  const response = await eleventyFetch(url, {
    duration: '1d',
    type: 'response',
  });
  return Promise.resolve({ json: async () => response } as Response);
}
