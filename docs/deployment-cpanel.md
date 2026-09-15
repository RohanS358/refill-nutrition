# Deploying to cPanel

This site is **not** a static upload. It needs a running Node process.

`next build` emits 5 dynamic routes (`/admin`, `/admin/editor`, `/admin/login`,
`/admin/products`, `/admin/settings`), and the code uses server actions,
`cookies()`, and writes `data/content.json` to disk. There is no `output: "export"`
path without deleting the CMS. Use cPanel's **Setup Node.js App** (Phusion
Passenger), not `public_html` file upload.

## 1. Requirements on the host

| Need | Value |
|---|---|
| Node.js | 20+ (built and tested on 24). Older cPanel Node 16/18 will fail. |
| Startup file | `app.js` (in the repo root) |
| Application mode | Production |
| Disk | ~70 MB for the app, plus whatever cPanel reserves |
| Writable dir | `data/` — the CMS writes `content.json` here |

If cPanel only offers Node 16 or 18, stop — ask the host to enable 20+.

## 2. Build locally

```bash
npm ci
npm run build
```

`next.config.mjs` sets `output: "standalone"`, so the build produces a
self-contained server in `.next/standalone` (~61 MB) instead of shipping the
full 498 MB `node_modules`.

## 3. Assemble the upload

Next deliberately leaves `.next/static` and `public` out of the standalone
bundle. **Copying them is not optional** — skip this and the site loads with no
CSS and no images, which is the most common cPanel Next.js failure.

```bash
rm -rf deploy && mkdir deploy
cp -r .next/standalone/. deploy/
mkdir -p deploy/.next
cp -r .next/static deploy/.next/static
cp -r public deploy/public
cp app.js deploy/app.js
mkdir -p deploy/data
```

Resulting layout — this is what goes on the server:

```
app.js            <- Passenger startup file
server.js         <- from .next/standalone
.next/            <- server chunks + static/
node_modules/     <- 12 packages, incl. sharp
public/           <- brand assets, images, fonts
data/             <- writable; CMS overrides
package.json
```

Zip `deploy/` and upload, or push and build on the server if it has Node 20+.

## 4. Configure in cPanel

**Setup Node.js App → Create Application:**

- Node.js version: **20+**
- Application mode: **Production**
- Application root: where you extracted the files
- Application startup file: **`app.js`**

Do not set `PORT` — Passenger assigns it. `app.js` only forces `NODE_ENV` and
`chdir`s to the app root so Next resolves its assets.

## 5. Environment variables

Add via the cPanel Node.js App UI (not a `.env` file — `.gitignore` excludes
those, so they never reach the server).

| Variable | Why |
|---|---|
| `CMS_SECRET` | Signs the admin session cookie. **Must be set** — it falls back to a hardcoded dev secret in `lib/cms/auth.ts`. |

## 6. Permissions

```bash
chmod 755 data
```

The Node process must be able to write `data/content.json`. Without it the
admin editor fails on save; the public site still renders from code defaults.

## 7. Verify after deploy

```bash
curl -I https://yourdomain.com/
curl -I https://yourdomain.com/_next/static/chunks/*.css
curl -I https://yourdomain.com/brand/logo-full.png
```

All three must return 200. If HTML is 200 but CSS/images 404, step 3 was
skipped.

## Before this goes public

`lib/cms/auth.ts` still has `admin` / `admin` hardcoded, with a `TODO(security)`
saying so. Anyone who finds `/admin/login` owns the site content. Move the
credentials to env vars and hash the password before pointing a real domain at
this.
