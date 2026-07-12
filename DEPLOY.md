# Deploying this portfolio (free, GitHub Pages)

This repo is named **`nishalcr.github.io`**, so GitHub Pages serves it as a
**user site at the root**, and it's bound to the free custom domain
**https://nishalcr.is-a.dev** (registered via `is-a-dev/register`). The
`github.io` URL redirects to it. The site is a static export
(`next.config.mjs` → `output: "export"`) deployed by
`.github/workflows/deploy-pages.yml` on every push to `master`.

Because it's served at the root (not a `/repo/` subpath), no `basePath` is needed
and all assets resolve correctly.

## One-time setup

Repo **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.
(Already enabled.) Then push to `master` — or **Actions → Deploy to GitHub Pages
→ Run workflow** on `master` — and it builds + deploys. The job is guarded to
`master`, so dispatching from another branch is a no-op.

## Custom domain: `nishalcr.is-a.dev`

The site is bound to the free `nishalcr.is-a.dev` subdomain. This is already set
up; the pieces that keep it working:

1. **Registration** — `domains/nishalcr.json` in `is-a-dev/register` points the
   subdomain at GitHub Pages:

   ```json
   {
     "owner": { "username": "nishalcr", "email": "nishalcr@gmail.com" },
     "records": { "CNAME": "nishalcr.github.io" }
   }
   ```

2. **`CNAME` in the artifact** — the "Prepare Pages artifact" step writes
   `echo "nishalcr.is-a.dev" > out/CNAME`. Actions-based Pages needs the `CNAME`
   **in the artifact**; a value set only in Settings won't persist across
   deploys. **Settings → Pages** also shows the custom domain and **Enforce
   HTTPS** is on once GitHub provisions the TLS cert (a few minutes after the
   first deploy carrying the `CNAME`).

3. **`SITE_URL`** in `lib/site.ts` is `https://nishalcr.is-a.dev`, so
   SEO/OG/canonical/sitemap/robots all use the primary domain.

## SEO

`lib/site.ts` holds the canonical URL (metadata / OG / JSON-LD / sitemap /
robots). It's set to the current live URL — update that one line if the primary
URL changes.

---

## Updating content later

- **Any text / bullets / projects / skills:** edit **`lib/data.ts`** only. Wrap a
  phrase in `**double asterisks**` for bold. No HTML, no escaping.
- **New résumé:** overwrite **`public/resume.pdf`**. Nothing else changes.
- **New project link:** set `repo` (and/or `demo`) on the project in `lib/data.ts`.
