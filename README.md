# Why Not Sleep

`whynotsleep.cc` is a public researcher-builder hub: a durable front door for large-model systems work, multimodal post-training notes, playable browser games, manuscripts, design studies, compact references, and personal archives.

The site is intentionally static. Source data lives in `src/site-data.mjs`, renderers turn that data into plain HTML, and GitHub Actions publishes the generated `dist/` directory to GitHub Pages.

## Commands

```bash
npm install
npm test
npm run build
npm run check
npm run test:ui
npm run preview -- --port 4173
```

`npm run check` runs the Node test suite and emits the static output tree into `dist/`. `npm run test:ui` builds, previews, and runs Playwright smoke checks through the configured web server.

## Structure

```text
src/site-data.mjs       public profile, contacts, channels, games, highlights
src/render.mjs          HTML renderers for home, about, channel, and 404 pages
src/site.js             reading-mode toggle and static client-side search
src/texture.mjs         deterministic local PNG paper texture generator
src/build.mjs           static build pipeline, CNAME, robots.txt, sitemap.xml
src/styles.css          visual system and responsive layout rules
tests/ui/               Playwright smoke checks for desktop and mobile rendering
cloudflare/             optional Worker router for channel subdomains
dist/                   generated site, not committed
```

Local planning files, assistant workspaces, scratch output, test output, and generated `dist/` do not belong in this public repository. Keep the tracked tree focused on source, tests, workflow, and project documentation.

## Public Routes

| Route | Role |
|---|---|
| `/` | Primary index and channel map |
| `/about/` | Research and engineering profile |
| `https://blog.whynotsleep.cc/` | Long-form technical essays and engineering narratives |
| `https://game.whynotsleep.cc/` | Playable browser game catalog |
| `https://project.whynotsleep.cc/` | Engineering projects, demos, tools, and repositories |
| `https://manuscript.whynotsleep.cc/` | Reports, PDFs, white papers, and polished deep dives |
| `https://design.whynotsleep.cc/` | Visual systems, UI explorations, and design studies |
| `https://note.whynotsleep.cc/` | Short references, reading notes, commands, and bookmarks |
| `https://life.whynotsleep.cc/` | Personal living records, photos, travel, and slower logs |
| `https://game.whynotsleep.cc/niniwithyuan/` | Live game route for `iwannabewater/NiniWithYuan` |

The game channel is a catalog, not a one-game special case. `NiniWithYuan` is the first playable entry and links to both the live route and source repository.

The generated site still builds internal `/channels/<slug>/` pages. Those pages are intended as Cloudflare Worker origin paths for the public channel subdomains.

## Visual System

- warm paper background `#f5f4ed`
- ivory surfaces `#faf9f5`
- ink-blue primary accent `#1B365D`
- restrained green signal accent `#2F6F5E`
- small copper annotation accent `#8E513A`
- serif-led hierarchy with monospace route and metadata labels
- no pure-white page background
- no hard shadows
- no decorative gradient blobs
- no italic text

The site should read like a quiet engineering index: compact, durable, and evidence-oriented.

The home page includes a manual day/night reading-mode toggle and a static client-side search box. Search data is generated from `src/site-data.mjs`, so route labels, profile focus, and playable games stay searchable without a backend.

## GitHub Pages

This repository is the GitHub user-site repository:

```text
iwannabewater/iwannabewater.github.io
```

Deployment uses GitHub Actions and uploads `dist/` as the Pages artifact. The workflow uses:

- `actions/checkout@v6.0.2`
- `actions/setup-node@v6.4.0`
- `actions/configure-pages@v6.0.0`
- `actions/upload-pages-artifact@v5.0.0`
- `actions/deploy-pages@v5.0.0`

The generated `dist/CNAME` and root `CNAME` both declare:

```text
whynotsleep.cc
```

## Cloudflare DNS

Cloudflare owns DNS for `whynotsleep.cc`; this repository does not contain Cloudflare credentials and cannot mutate the zone by itself.

For the apex domain:

```text
whynotsleep.cc A     185.199.108.153
whynotsleep.cc A     185.199.109.153
whynotsleep.cc A     185.199.110.153
whynotsleep.cc A     185.199.111.153
whynotsleep.cc AAAA  2606:50c0:8000::153
whynotsleep.cc AAAA  2606:50c0:8001::153
whynotsleep.cc AAAA  2606:50c0:8002::153
whynotsleep.cc AAAA  2606:50c0:8003::153
```

For `www`:

```text
www.whynotsleep.cc CNAME iwannabewater.github.io
```

No wildcard records are needed. Create only the explicit channel subdomains listed below when the Cloudflare Worker router is deployed.

`https://game.whynotsleep.cc/niniwithyuan/` is the public game URL. The Worker maps it to the existing GitHub Pages project path `/NiniWithYuan/` so the browser stays inside the game subdomain while the game assets keep working.

### Channel Subdomains

The intended channel behavior is:

```text
https://game.whynotsleep.cc/       -> serves /channels/game/
https://game.whynotsleep.cc/niniwithyuan/ -> serves /NiniWithYuan/
https://blog.whynotsleep.cc/       -> serves /channels/blog/
https://project.whynotsleep.cc/    -> serves /channels/project/
https://manuscript.whynotsleep.cc/ -> serves /channels/manuscript/
https://design.whynotsleep.cc/     -> serves /channels/design/
https://note.whynotsleep.cc/       -> serves /channels/note/
https://life.whynotsleep.cc/       -> serves /channels/life/
```

Because GitHub Pages only has `whynotsleep.cc` configured as the repository custom domain, the clean subdomain URLs should be handled at Cloudflare. Recommended setup:

1. Add proxied DNS records for each channel subdomain. For this originless Worker setup, each channel can use a reserved placeholder address such as `192.0.2.1`; the important part is that the records are proxied by Cloudflare.
2. Deploy `cloudflare/channel-router.js` with `cloudflare/wrangler.channel-router.toml`.
3. In the Worker, map the host to the matching internal path and fetch `https://whynotsleep.cc/channels/<slug>/`.
4. Keep the browser URL on the subdomain. Do not redirect users back to `/channels/<slug>/`.

Deployment command once DNS records exist:

```bash
wrangler deploy --config cloudflare/wrangler.channel-router.toml
```

Cloudflare DNS record management: https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/
Cloudflare Workers routes: https://developers.cloudflare.com/workers/configuration/routing/routes/
GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
