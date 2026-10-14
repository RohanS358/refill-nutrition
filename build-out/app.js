/**
 * cPanel / Phusion Passenger entry point.
 *
 * cPanel's "Setup Node.js App" starts this file instead of `next start`.
 * It boots the standalone server that `next build` emits, from the app root.
 *
 * Deploy layout on the server (see docs/deployment-cpanel.md):
 *   app.js                  <- this file
 *   server.js               <- copied from .next/standalone/server.js
 *   .next/                  <- copied from .next/standalone/.next/
 *   node_modules/           <- copied from .next/standalone/node_modules/
 *   public/                 <- copied verbatim from the repo
 *   data/                   <- writable; holds CMS overrides (content.json)
 *
 * Passenger sets PORT itself; NODE_ENV must be "production" in the cPanel UI.
 */

process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Next's standalone server resolves assets relative to its own directory.
process.chdir(__dirname);

require("./server.js");
