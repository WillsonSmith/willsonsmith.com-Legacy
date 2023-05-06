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

import { movies } from './data/movies.js';
import { steam } from './data/steam.js';
export const initialData = {
  movies,
  steam,
};

if (!isServer) {
  await import('./index.js');
}

import './components/reading-column/reading-column.js';
import './components/site-header/site-header.js';

import './components/movies-block/movies-block.js';
import './components/games-block/games-block.js';

// import './components/movies-block/movies-block.js';
import './components/games-block/games-block.js';
import './components/time-since/time-since.js';

export default async (data = initialData) => {
  const movies = data.movies;
  const steam = data.steam;

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
              Hey! I'm Willson, a front-end developer, ux developer, and former Creative
              Technologist at Shopify. I have a passion for building high-quality, fun experiences
              on the web. I like to experiment and build things that stretch my abilities.
            </p>

            <p>
              I worked for 8 years at Shopify where I spent my time as a Senior Creative
              Technologist. I grew up with the company and built products that enabled people to run
              their business on the internet. I believe what I did was important work because it
              enables Shopify merchangs to take control of and design their own lives.
            </p>

            <p>
              Today I'm taking a little break. I'm taking some time to figure out what I want to do
              and who I want to be. I can be found building silly things and having fun. I'm always
              open to new opportunities and challenges. If you'd like to chat, feel free to reach
              out. I'm always happy to talk.
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
        <movies-block movies=${JSON.stringify(movies)}></movies-block>
      </section>
      <section class="section">
        <reading-column>
          <header><h2>What I'm playing</h2></header>
        </reading-column>

        <reading-column>
          <games-block games=${JSON.stringify(steam)}></games-block>
        </reading-column>
      </section>
    </main>
  `;
};
