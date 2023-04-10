import { css, html, isServer } from 'lit';

export const title = "Willson's fun times website place";
export const description = 'Willson is a front-end developer who likes to make fun things.';

export const links = [
  {
    rel: 'stylesheet',
    href: '/css/reset.css',
  },
];

export const styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  body {
    line-height: var(--line-height-small);
  }
  site-header {
    display: block;
    padding-inline: var(--spacing-lg);
    padding-block: var(--spacing);
    position: sticky;
    width: 100%;
    top: 0;

    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0) 100%
    );

    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
  }

  site-header::part(heading) {
    font-family: 'Lilita One', var(--font-system-sans);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
    padding: var(--spacing);
  }

  .section header h2 {
    font-family: 'Lilita One', var(--font-system-sans);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxl);
    line-height: var(--line-height-xs);
  }

  .page {
    margin-block-start: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .bio {
    display: flex;
    flex-direction: column;

    line-height: var(--line-height-sm);
  }

  .bio > * + * {
    margin-block-start: var(--spacing-sm);
  }

  a {
    color: var(--color-text-body);
  }

  .project-list {
    background: var(--sl-color-neutral-100);
    padding: var(--spacing-sm);
    line-height: var(--line-height);
  }

  .project-list__heading {
    line-height: var(--line-height);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lg);
  }

  ul[role='list'].project-list__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    line-height: var(--line-height-sm);
  }
`;

if (!isServer) {
  await import('./index.js');
}

import 'components/reading-column.js';
import './components/site-header/site-header.js';
import './components/movies-block/movies-block.js';
import './components/games-block/games-block.js';
import './components/time-since/time-since.js';

import type { SteamGameDetails } from 'functions/SteamAPI.js';
export default async () => {
  let games: SteamGameDetails[] = [];
  let movies: any[] = [];
  if (isServer) {
    const { fetchSteamGames } = await import('functions/steam/steamGames.js');
    games = await fetchSteamGames();

    // const { LetterboxdAPI } = await import('functions/LetterboxdAPI/LetterboxdAPI.js');
    // const letterboxd = new LetterboxdAPI();
    // movies = await letterboxd.getWatchedFilms('willsonsmith');
    // console.log(movies);
  }

  return html`
    <site-header></site-header>
    <main class="page">
      <section class="section">
        <reading-column>
          <header><h2>Who I am</h2></header>
        </reading-column>
        <reading-column>
          <section class="bio">
            <p>
              I'm Willson, a front-end developer and Design Technologist at
              <a href="https://shopify.ca">Shopify</a>. I've been working at Shopify for
              <time-since date="2015-06-01"></time-since>.
            </p>
            <p>
              I'm passionate about building accessible, performant, and delightful web experiences.
              I'm also a big fan of the web platform and the open web. This website is built with
              <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                >Web Components</a
              >
              and <a href="https://lit.dev">Lit</a>.
            </p>

            <section class="project-list">
              <header>
                <h3 class="project-list__heading">Passion projects</h3>
              </header>
              <ul class="project-list__list" role="list">
                <li>
                  <a href="https://word.lol">Word.lol</a>
                  <div>
                    A fun little word definition generator that utilizes
                    <a href="https://openai.com">OpenAI's GPT-3</a> API.
                  </div>
                </li>
                <li>
                  <a href="https://github.com/WillsonSmith/Pyre">Pyre</a>
                  <div>
                    A static site generator built with
                    <a href="https://github.com/lit/lit/tree/main/packages/labs/ssr"
                      ><code>@lit-labs/ssr</code></a
                    >.
                  </div>
                </li>
                <li>
                  <a href="https://gifit.pics">Gifit.pics</a>
                  <div>
                    An in-browsers gif-to-video converter that uses
                    <a href="https://github.com/ffmpegwasm/ffmpeg.wasm"><code>ffmpeg.wasm</code></a
                    >.
                  </div>
                </li>
              </ul>
            </section>
          </section>
        </reading-column>
      </section>

      <section class="section">
        <reading-column>
          <header><h2>What I'm watching</h2></header>
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
          <header><h2>What I'm playing</h2></header>
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
