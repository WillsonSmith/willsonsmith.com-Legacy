import { html } from "lit";
import "../javascript/components/app-shell.js";

export const indexTemplate = (props) => html`
  <!DOCTYPE html>
  <html lang="en" class="sl-theme-dark">
    <head>
      <meta charset="UTF-8" />
      <title>willsonsmith.com</title>
      <meta
        name="description"
        content="Willson Smith • Front end developer • Design Technologist • Tinkerer"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta name="msapplication-TileColor" content="#1a1a1e" />
      <meta name="theme-color" content="#1a1a1e" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#1a1a1e"
      />
      <link
        rel="stylesheet"
        href="/vendor/modules/shoelace/dist/themes/light.css"
      />
      <link
        rel="stylesheet"
        href="/vendor/modules/shoelace/dist/themes/dark.css"
      />
      <link rel="stylesheet" href="/css/main.css" />

      <script type="module">
        const root = document.documentElement;
        const theme = localStorage.getItem("preferred-theme") || "automatic";
        let dark = false;
        if (theme === "dark") dark = true;
        if (theme === "automatic") {
          dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        document.documentElement.classList.toggle("sl-theme-dark", dark);
      </script>
    </head>

    <body>
      <page-header>
        <a href="/" slot="title">
          <colorize-word rainbow>Willson</colorize-word>
          <span class="visually-hidden">Home page</span>
        </a>
      </page-header>
      <star-sheet class="background-stars"></star-sheet>

      <app-shell></app-shell>
      <!-- <script type="module" src="/javascript/(._.).js"></script> -->
      <script type="module">
        // Hydrate template-shadowroots eagerly after rendering (for browsers without
        // native declarative shadow roots)
        import {
          hasNativeDeclarativeShadowRoots,
          hydrateShadowRoots,
        } from "/vendor/@webcomponents/template-shadowroot/template-shadowroot.js";
        if (!hasNativeDeclarativeShadowRoots) {
          hydrateShadowRoots(document.body);
        }
        // ...
        // Load and hydrate components lazily
        console.log("test");
        import("/javascript/(._.).js");
      </script>
    </body>
  </html>
`;
