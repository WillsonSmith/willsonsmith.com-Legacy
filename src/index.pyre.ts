import { html, isServer } from 'lit';

export const title = "Willson's fun times website place";
export const description = 'Willson is a front-end developer who likes to make fun things.';

export const links = [
  {
    rel: 'stylesheet',
    href: '/css/reset.css',
  },
];

export const styles = isServer ? (await import('./index.css.js')).styles : undefined;

if (!isServer) {
  await import('./index.js');
}

import './components/reading-column/reading-column.js';
import './components/site-header/site-header.js';
import './components/movies-block/movies-block.js';
import './components/games-block/games-block.js';
import './components/time-since/time-since.js';

import type { SteamGameDetails } from '../functions/steam/SteamAPI.js';
export default async () => {
  let games: SteamGameDetails[] = [];
  // let movies: any[] = [];
  if (isServer) {
    const { fetchSteamGames } = await import('../functions/steam/steamGames.js');
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
                  <a href="https://word.lol">Wordlol</a>
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
                  <a href="https://gifit.pics">Gifit</a>
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
