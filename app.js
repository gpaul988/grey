/**
 * cPanel / Phusion Passenger entry alias.
 * --------------------------------------------------------------------------
 * Some cPanel "Setup Node.js App" configurations default the Application
 * startup file to `app.js`, others to `server.js`. To make either choice work
 * without edits, this file just delegates to the canonical entry in
 * `server.js` (which spawns `tsx server.ts`).
 */
'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./server.js');
