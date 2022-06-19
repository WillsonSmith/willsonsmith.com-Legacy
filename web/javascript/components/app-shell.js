import { LitElement, html, css } from "lit";

import "../components/stacking-scroller.js";
import "../../../shared/web-components/yz-block-card/yz-block-card.js";

import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";

class AppShell extends LitElement {
  render() {
    return html`
      <main>
        <stacking-scroller offset="30" stack-offset="30">
          <yz-block-card>
            <article class="about-me">
              <div class="about-me-content">
                <sl-avatar
                  class="about-me-avatar"
                  label="it's me! :)"
                  image="/static/images/me.jpg"
                ></sl-avatar>
                <div class="about-me-details">
                  <p class="about-me-name">Willson Smith</p>
                  <p class="about-me-title">Design Technologist • Shopify</p>
                  <p class="about-me-location">Ottawa • Ontario • Canada</p>
                </div>
              </div>
              <p>
                Hi! I'm a front-end web developer and Design Technologist at
                Shopify.
              </p>
              <p
                style="text-align: center; margin-top: var(--sl-spacing-small)"
              >
                <span
                  style="
                  display: inline-block;
                  transform: translateY(30%) scaleX(-1);
                "
                  >↴</span
                >Look at some of the dumb things I made
                <span style="display: inline-block; transform: translateY(30%)"
                  >↴</span
                >
              </p>
            </article>
          </yz-block-card>
          <yz-block-card>
            <article class="feature-project">
              <h3 class="feature-project-header">Gifit</h3>
              <p>
                Gifs are far from perfect, but there is beauty in imperfection.
                For years I've been creating gifs for any number of scenarios: a
                silly meme, a product demo, a Dragon Ball Z gif for geocities,
                and in that time I've converted hundreds of videos into gifs.
              </p>
              <p>
                This website provides a quick and easy process for converting
                videos: pick a video, pick the settings, convert the video,
                download the converted gif.
              </p>
              <footer class="feature-project-footer">
                <a
                  class="feature-project-link"
                  href="https://gifit.pics"
                  target="_blank"
                  >gifit.pics<sl-icon
                    class="feature-project-link-icon"
                    name="box-arrow-up-right"
                  ></sl-icon
                ></a>
              </footer>
            </article>
          </yz-block-card>

          <yz-block-card>
            <article class="feature-project">
              <h3 class="feature-project-header">orbiting.earth</h3>
              <p>
                A poorly scaled, but time-accurate simulation of our solar
                system. It's rough, I may never make it better, but it's pretty
                and I like it.
              </p>
              <footer class="feature-project-footer">
                <a
                  class="feature-project-link"
                  href="https://orbiting.earth"
                  target="_blank"
                  >orbiting.earth<sl-icon
                    class="feature-project-link-icon"
                    name="box-arrow-up-right"
                  ></sl-icon>
                </a>
              </footer>
            </article>
          </yz-block-card>

          <yz-block-card>
            <article class="feature-project">
              <h3 class="feature-project-header">Voice clips</h3>
              <p>
                Searching for a new project to build, an idea came to mind,
                “What if maybe I could record audio clips?” To which my brain
                responded with “Uh, you have an iPhone with the voice memos
                app.” I swiftly ignored my brain and built this website.
              </p>
              <footer class="feature-project-footer">
                <a
                  class="feature-project-link"
                  href="https://voice-clips.netlify.app"
                  target="_blank"
                  >voice-clips.netlify.app<sl-icon
                    class="feature-project-link-icon"
                    name="box-arrow-up-right"
                  ></sl-icon>
                </a>
              </footer>
            </article>
          </yz-block-card>

          <yz-block-card>
            <article class="feature-project">
              <h3 class="feature-project-header">Legacy willsonsmith.com</h3>
              <p>
                It's no longer in use, but it is a glimpse into the history of
                my personal website. I like having an archive of the old site,
                it is pleasing to reflect on the remnants of that website that
                have carried through to this newest version.
              </p>
              <footer class="feature-project-footer">
                <a
                  class="feature-project-link"
                  href="https://62734d3d7a65ec00096531e7--willsonsmith.netlify.app"
                  target="_blank"
                  >old.willsonsmith.com<sl-icon
                    class="feature-project-link-icon"
                    name="box-arrow-up-right"
                  ></sl-icon>
                </a>
              </footer>
            </article>
          </yz-block-card>

          <yz-block-card>
            <article class="feature-project">
              <h3 class="feature-project-header">Migrate music</h3>
              <p>
                I have used Apple Music since launch, and in the beginning there
                were very few playlists to choose from. I had a series of
                playlists in Spotify, but did not want to manually create them.
                I built this website to migrate those playlists to Apple Music.
              </p>
              <p>
                Years later there was an exodus from Spotify to Apple Music, and
                this found a new audience beyond myself.
              </p>
              <footer class="feature-project-footer">
                <a
                  class="feature-project-link"
                  href="https://migrate-music.glitch.me"
                  target="_blank"
                  >migrate-music.glitch.me<sl-icon
                    class="feature-project-link-icon"
                    name="box-arrow-up-right"
                  ></sl-icon>
                </a>
              </footer>
            </article>
          </yz-block-card>
        </stacking-scroller>
      </main>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define(`app-shell`, AppShell);
