/** Shoelace setup */
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(`/vendor/modules/shoelace/dist`);

/** Shoelace components used on index */
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

/** Main page required components components */

import '../../shared/web-components/page-header/page-header.js';
import '../../shared/web-components/colorize-word/colorize-word.js';

import './components/stacking-scroller.js';