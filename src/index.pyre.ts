import { css, html, isServer } from 'lit';

export const title = "Willson's fun times website place";

export const links = [
  {
    rel: 'stylesheet',
    href: '/css/reset.css',
  },
];

export const styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  site-header {
    display: block;
    padding-inline: var(--spacing-lg);
    padding-block: var(--spacing);
    /* background: var(--sl-color-orange-200); */
    position: sticky;
    width: 100%;
    top: 0;

    // background is linear gradient from 30% white to 100% transparent
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0) 100%
    );

    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
    padding: var(--spacing);
  }

  .section header {
    font-family: 'Lilita One', var(--font-system-sans);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxl);
    line-height: var(--line-height-xs);
  }

  .section__article {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .page {
    margin-block-start: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
`;

if (!isServer) {
  await import('./index.js');
}

import 'components/reading-column.js';
import './components/site-header/site-header.js';
import './components/movies-block/movies-block.js';
import './components/games-block/games-block.js';

import type { SteamGameDetails } from 'functions/SteamAPI.js';
export default async () => {
  let games: SteamGameDetails[] = [];
  let movies: any[] = [];
  if (isServer) {
    const { fetchSteamGames } = await import('functions/steam/steamGames.js');
    games = await fetchSteamGames();

    const { LetterboxdAPI } = await import('functions/LetterboxdAPI/LetterboxdAPI.js');
    const letterboxd = new LetterboxdAPI();
    movies = await letterboxd.getWatchedFilms('willsonsmith');
    console.log(movies);
  }

  return html`
    <site-header></site-header>
    <main class="page">
      <section class="section">
        <reading-column>
          <header><span>What I'm watching</span></header>
        </reading-column>
        <reading-column>
          <movies-block
            title="Rye Lane"
            description="Two twenty-somethings, both reeling from bad break-ups, connect over the course of an eventful day in South London – helping each other deal with their nightmare exes, and potentially restoring their faith in romance."
            poster="https://a.ltrbxd.com/resized/film-poster/9/4/6/6/0/7/946607-rye-lane-0-600-0-900-crop.jpg?v=a6f1287aac"
          >
          </movies-block>
        </reading-column>
      </section>
      <section class="section">
        <reading-column>
          <header><span>What I'm playing</span></header>
        </reading-column>

        <reading-column>
          <games-block>
            ${games.map(
              (game) => html`
                <game-card
                  title="${game.name}"
                  poster="${game.header_image}"
                  link="${game.steam_appid}"
                ></game-card>
              `,
            )}
          </games-block>
        </reading-column>
      </section>
    </main>
  `;
};
