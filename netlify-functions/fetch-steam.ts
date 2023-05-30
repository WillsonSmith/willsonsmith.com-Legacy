import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const steamApiKey = process.env.STEAM_API_KEY || '';
const steamUserId = process.env.STEAM_USER_ID || '';

interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  rtime_last_played: number;
}

export interface SteamGameDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  website: string;
  pc_requirements: {
    minimum: string;
    recommended: string;
  };
  mac_requirements: {
    minimum: string;
    recommended: string;
  };
  linux_requirements: {
    minimum: string;
    recommended: string;
  };
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
  };
  packages: number[];
  package_groups: {
    name: string;
    title: string;
    description: string;
    selection_text: string;
    save_text: string;
    display_type: number;
  };
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  metacritic: {
    score: number;
    url: string;
  };
  categories: {
    id: number;
    description: string;
  }[];
  genres: {
    id: string;
    description: string;
  }[];
  screenshots: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  };
}

export interface SteamGameDetails {
  success: boolean;
  data: SteamGameDetails;
}

export const handler: Handler = async (event, context) => {
  try {
    const urlParams = new URLSearchParams({
      key: steamApiKey,
      steamid: steamUserId,
      format: 'json',
    });

    if (steamUserId) {
      const games = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?${urlParams}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            // cache for 1 day
            'Cache-Control': 'max-age=86400',
          },
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((data: any) => {
          return data.response?.games || [];
        });

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
      const gameDetails = await Promise.all(
        latestGames.map(async (game) => {
          console.log(game, 'game');
          const details = await getGameDetails(game.appid.toString());
          return details.data;
        }),
      );

      const json = {
        games: gameDetails.map(gameDetailsToGameBlock),
      };

      return {
        statusCode: 200,
        body: JSON.stringify(json),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ games: [] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function getGameDetails(appId: string): Promise<SteamGameDetails> {
  const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
  try {
    const response = await this.fetch(detailsUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // cache for 1 day
        'Cache-Control': 'max-age=86400',
      },
    });
    return response.json().then((data) => {
      return { success: true, data: data[appId].data } as SteamGameDetails;
    });
  } catch (error) {
    return { success: false, data: {} } as SteamGameDetails;
  }
}

function gameDetailsToGameBlock(game: SteamGameDetails['data']) {
  return {
    name: game.name,
    description: game.short_description,
    image: game.header_image,
    url: `https://store.steampowered.com/app/${game.steam_appid}`,
  };
}
