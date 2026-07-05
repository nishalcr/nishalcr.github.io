/* ------------------------------------------------------------------
   Single source of truth for the site's public URL.
   Used by metadata (OG / Twitter / canonical), JSON-LD, sitemap, robots.

   Deploying? See DEPLOY.md. In short:
   - Your instant live URL is your host's subdomain (e.g. *.pages.dev).
   - Once your is-a.dev subdomain PR is merged, this value already matches —
     no code change needed. If you want canonical to point at the pages.dev
     URL while you wait, just edit this ONE line.
   ------------------------------------------------------------------ */
export const SITE_URL = "https://nishalcr.is-a.dev";
