# Deploying this portfolio (free)

The site is a **static export** (`next.config.mjs` → `output: "export"`), so it's
just HTML/CSS/JS in `out/`. Any static host works. Recommended path below.

---

## 1. Push to GitHub

```bash
git add -A
git commit -m "Portfolio: content cleanup, self-hosted fonts, SEO, deploy prep"
git push
```

## 2. Deploy to Cloudflare Pages (recommended) — you get a live URL immediately

1. Go to **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git**.
2. Pick this repo.
3. Build settings:
   - **Framework preset:** `Next.js (Static HTML Export)` (or "None")
   - **Build command:** `npx next build`
   - **Output directory:** `out`
4. **Save and Deploy.**

Within ~1–2 minutes you have an **instant, shareable URL** like
`https://nishalcr-portfolio.pages.dev`. Every `git push` auto-redeploys.

> **You do NOT wait on is-a.dev to be live.** Use the `*.pages.dev` URL now;
> attach the custom domain later (step 4) with zero redeploy.

### Free alternatives (also give an instant URL)
| Host | Instant URL | Notes |
|------|-------------|-------|
| **GitHub Pages** | `nishalcr.github.io` | Needs a small build Action; all-in-GitHub |
| **Vercel** | `*.vercel.app` | Best Next DX; hobby tier is non-commercial only |
| **Netlify** | `*.netlify.app` | Build `npx next build`, publish `out` |

## 3. Claim the free `is-a.dev` subdomain (runs in parallel — takes hours–days to merge)

`is-a.dev` is PR-reviewed, so open it early. It's **not instant**, but your
`*.pages.dev` URL covers you until it merges.

1. **Fork** `github.com/is-a-dev/register`.
2. Add a file **`domains/nishalcr.json`** (fallback name: `domains/nishal.json`
   if `nishalcr` is taken):

```json
{
  "owner": {
    "username": "nishalcr",
    "email": "nishalcr@gmail.com"
  },
  "records": {
    "CNAME": "nishalcr-portfolio.pages.dev"
  }
}
```

> Replace the CNAME value with your **actual** `*.pages.dev` target from step 2.

3. Open a **pull request** to `is-a-dev/register`. Follow their checklist exactly
   (docs.is-a.dev) — incomplete PRs get rejected. On merge, DNS is live in minutes.

## 4. Attach the custom domain

1. In **Cloudflare Pages → your project → Custom domains → Set up a custom domain**,
   add `nishalcr.is-a.dev`. Cloudflare verifies the CNAME automatically.
2. Done — `https://nishalcr.is-a.dev` now serves the site over HTTPS.

## 5. One-line SEO switch

`lib/site.ts` holds the canonical URL used by OG tags, JSON-LD, `sitemap.xml`,
and `robots.txt`. It's already set to `https://nishalcr.is-a.dev`, so once step 3
merges everything matches. If you want canonical to point at the `pages.dev` URL
**while you wait**, edit that single line and redeploy.

---

## Updating content later
- **Any text / bullets / projects / skills:** edit **`lib/data.ts`** only. Wrap a
  phrase in `**double asterisks**` for bold. No HTML, no escaping.
- **New résumé:** overwrite **`public/resume.pdf`**. Nothing else changes.
- **New project link:** set `repo` (and/or `demo`) on the project in `lib/data.ts`.
