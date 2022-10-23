const playwright = require('playwright');
module.exports.recentlyWatched = async function fetchRecentlyWatched(profile) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(`https://letterboxd.com/${profile}/films/by/date/`);
  const recentlyWatched = await page.$eval('body', async (body) => {
    const recentlyWatched = body.querySelectorAll('.poster');
    const recentlyWatchedData = [];
    for (const film of recentlyWatched) {
      const { src, alt } = film.querySelector('img');
      const imageUrl = src.replace('0-70-0-105', '0-300-0-450');
      const url = `https://letterboxd.com${film.getAttribute(
        'data-film-link'
      )}`;

      recentlyWatchedData.push({
        src: imageUrl,
        alt,
        url,
      });
    }
    return recentlyWatchedData;
  });
  await browser.close();
  return {
    posters: recentlyWatched,
  };
};
