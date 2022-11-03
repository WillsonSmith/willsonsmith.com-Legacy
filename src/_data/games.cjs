const { readFile, writeFile, stat } = require('fs/promises');

module.exports = async function () {
  // check if the file exists
  try {
    await stat('./src/_data/_cache/games.json');
    const data = await readFile('./src/_data/_cache/games.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log('NOFILE', process.env.STEAM_API_KEY, process.env.STEAM_USER_ID);
    // const games = await readFile('./src/_data/games.json', 'utf8');
    const ownedGamesUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${process.env.STEAM_USER_ID}&format=json`;
    const response = await fetch(ownedGamesUrl);
    const json = await response.json();
    const games = json?.response?.games;
    games.sort((a, b) => b.rtime_last_played - a.rtime_last_played);
    const firstGames = games.slice(0, 15);

    let gameDetails = [];
    for (const game of firstGames) {
      const gameDetail = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
      );
      const gameDetailJson = await gameDetail.json();
      const [_, gameDetailData] = Object.entries(gameDetailJson)[0];
      const { data } = gameDetailData;
      if (data.type === 'game') {
        gameDetails.push(gameDetailData.data);
      }
    }

    writeFile(
      'src/_data/_cache/games.json',
      JSON.stringify(gameDetails, null, 2)
    );
    return games;
  }
};
