# Deploying this portfolio (free, GitHub Pages)

This repo is named **`nishalcr.github.io`**, so GitHub Pages serves it as a
**user site at the root**: **https://nishalcr.github.io**. The site is a static
export (`next.config.mjs` → `output: "export"`) deployed by
`.github/workflows/deploy-pages.yml` on every push to `master`.

Because it's served at the root (not a `/repo/` subpath), no `basePath` is needed
and all assets resolve correctly.

## One-time setup

Repo **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.
(Already enabled.) Then push to `master` — or **Actions → Deploy to GitHub Pages
→ Run workflow** on `master` — and it builds + deploys. The job is guarded to
`master`, so dispatching from another branch is a no-op.

## Optional: attach the `nishalcr.is-a.dev` custom domain

The GitHub Pages URL works on its own. To *also* serve the site at the free
`nishalcr.is-a.dev` subdomain:

1. **Register it** — PR to `is-a-dev/register` adding `domains/nishalcr.json`:

   ```json
   {
     "owner": { "username": "your-github-username", "email": "you@example.com" },
     "records": { "CNAME": "your-github-username.github.io" }
   }
   ```

2. **After that PR merges**, publish a `CNAME` file in the deploy workflow — add
   `echo "nishalcr.is-a.dev" > out/CNAME` back to the "Prepare Pages artifact"
   step and push. (Actions-based Pages needs the `CNAME` **in the artifact**;
   setting it only in Settings won't persist across deploys.) Then in
   **Settings → Pages** confirm the custom domain shows `nishalcr.is-a.dev` and
   tick **Enforce HTTPS**. The `github.io` URL then redirects to it.

3. **Point `SITE_URL`** in `lib/site.ts` at `https://nishalcr.is-a.dev` and
   redeploy, so SEO/OG/canonical match the primary domain.

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
