# Deploying this portfolio (free, GitHub Pages)

The site is a **static export** (`next.config.mjs` → `output: "export"`), deployed
to **GitHub Pages** via `.github/workflows/deploy-pages.yml` on every push to
`master`. The custom domain is the free **`nishalcr.is-a.dev`** subdomain.

> Why GitHub Pages and not Cloudflare Pages? `is-a.dev` is hosted on Cloudflare,
> and Cloudflare Pages refuses to attach a subdomain of a zone another account
> owns (it demands a DNS transfer you can't do). is-a.dev's own docs recommend a
> different host for this reason. GitHub Pages has no such conflict.

## 1. Enable GitHub Pages (one-time)

Repo **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.

That's the only setting to flip — the workflow does the rest. Push to `master`
(or **Actions → Deploy to GitHub Pages → Run workflow**) and it builds + deploys.

The workflow bakes two files into the output:

- `.nojekyll` — so Jekyll doesn't drop Next's `_next/` folder.
- `CNAME` (`nishalcr.is-a.dev`) — pins the custom domain across deploys.

## 2. Claim the free `is-a.dev` subdomain

PR-reviewed, so open it early (hours–days to merge). Fork `is-a-dev/register`
and add **`domains/nishalcr.json`**:

```json
{
  "owner": { "username": "nishalcr", "email": "nishalcr@gmail.com" },
  "records": { "CNAME": "nishalcr.github.io" }
}
```

Then open a PR to `is-a-dev/register`. On merge, DNS goes live in minutes.

## 3. Point the custom domain (after the is-a.dev PR merges)

The `CNAME` file already tells GitHub Pages the domain is `nishalcr.is-a.dev`.
After the is-a.dev PR merges:

1. Repo **Settings → Pages → Custom domain** should show `nishalcr.is-a.dev`
   (from the CNAME file). Confirm it verifies, and tick **Enforce HTTPS**.
2. *(Recommended)* Verify the domain to prevent takeover:
   **GitHub → Settings → Pages → Add a domain** → follow the `TXT` prompt, then
   add a second is-a.dev record file (`domains/<hostname>.nishalcr.json`) with
   that `TXT` value. See docs.is-a.dev → GitHub Pages.

Once DNS propagates, **https://nishalcr.is-a.dev** serves the site over HTTPS.

## 4. SEO

`lib/site.ts` is already set to `https://nishalcr.is-a.dev`, so metadata / OG /
JSON-LD / sitemap / robots are correct the moment the domain goes live — no code
change needed.

---

## Updating content later

- **Any text / bullets / projects / skills:** edit **`lib/data.ts`** only. Wrap a
  phrase in `**double asterisks**` for bold. No HTML, no escaping.
- **New résumé:** overwrite **`public/resume.pdf`**. Nothing else changes.
- **New project link:** set `repo` (and/or `demo`) on the project in `lib/data.ts`.
