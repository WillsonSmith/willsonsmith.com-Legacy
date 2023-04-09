export interface SteamID {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  lastlogoff: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
}

export interface SteamGame {
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

export class SteamAPI {
  constructor(private readonly steamAPIKey: string) {
    this.steamAPIKey = steamAPIKey;
  }

  public async getSteamID(steamID: string): Promise<SteamID> {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${this.steamAPIKey}&steamids=${steamID}`,
    );
    const json = await response.json();
    return json.response.players[0];
  }

  public async getPlayerOwnedGames(steamID: string): Promise<SteamGame[]> {
    const urlParams = new URLSearchParams({
      key: this.steamAPIKey,
      steamid: steamID,
      format: 'json',
    });

    return this.fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?${urlParams}`,
    )
      .then((response) => response.json())
      .then((data) => {
        return JSON.parse(data).response?.games || [];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  public async getGameDetails(appId: string): Promise<SteamGameDetails> {
    const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
    try {
      const response = await this.fetch(detailsUrl);
      return response.json().then((data) => {
        return { success: true, data: JSON.parse(data)[appId].data } as SteamGameDetails;
      });
    } catch (error) {
      return { success: false, data: {} } as SteamGameDetails;
    }
  }

  public async fetch(url: string): Promise<Response> {
    const response = await fetch(url);
    return response;
  }
}
