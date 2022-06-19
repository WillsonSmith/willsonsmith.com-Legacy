import fs from "fs";
import { Readable } from "stream";
import { render } from "@lit-labs/ssr/lib/render-with-global-dom-shim.js";
import { indexTemplate } from "./index-template.js";

const readable = Readable.from(render(indexTemplate()));
const writeable = fs.createWriteStream(`web/dist/index.html`);
readable.pipe(writeable);
