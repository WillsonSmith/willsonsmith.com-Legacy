import playwright from 'playwright';

export const filmsFromProfile = async (profile: string) => {
  try {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log(`https://letterboxd.com/${profile}/films/by/date/`);
    await page.goto(`https://letterboxd.com/${profile}/films/by/date/`);

    await page.waitForSelector('.poster');

    const recentlyWatched = await page.$eval('body', async (body) => {
      const recentlyWatched = Array.from(body.querySelectorAll('.poster'));
      const recentlyWatchedData: { src: string; alt: string; url: string }[] = [];
      for (const film of recentlyWatched) {
        const image = film.querySelector('img');
        if (!image) continue;
        const { src, alt } = image;
        const imageUrl = src.replace('0-70-0-105', '0-300-0-450');
        const url = `https://letterboxd.com${film.getAttribute('data-film-link')}`;

        recentlyWatchedData.push({
          src: imageUrl,
          alt,
          url,
        });
      }

      return recentlyWatchedData;
    });
    await browser.close();

    return recentlyWatched;
  } catch (error) {
    console.error(error);
    return [];
  }
};
