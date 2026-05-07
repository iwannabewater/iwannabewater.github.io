# Why Not Sleep

`whynotsleep.cc` is Winston's public researcher-builder hub: a durable front door for large-model systems work, multimodal post-training notes, playable browser games, manuscripts, design studies, compact references, and personal archives.

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
src/texture.mjs         deterministic local PNG paper texture generator
src/build.mjs           static build pipeline, CNAME, robots.txt, sitemap.xml
src/styles.css          visual system and responsive layout rules
tests/ui/               Playwright smoke checks for desktop and mobile rendering
dist/                   generated site, not committed
```

Local planning files, assistant workspaces, scratch output, test output, and generated `dist/` do not belong in this public repository. Keep the tracked tree focused on source, tests, workflow, and project documentation.

## Public Routes

| Route | Role |
|---|---|
| `/` | Primary index and channel map |
| `/about/` | Research and engineering profile |
| `/channels/blog/` | Long-form technical essays and engineering narratives |
| `/channels/game/` | Playable browser game catalog |
| `/channels/project/` | Engineering projects, demos, tools, and repositories |
| `/channels/manuscript/` | Reports, PDFs, white papers, and polished deep dives |
| `/channels/design/` | Visual systems, UI explorations, and design studies |
| `/channels/note/` | Short references, reading notes, commands, and bookmarks |
| `/channels/life/` | Personal living records, photos, travel, and slower logs |
| `/NiniWithYuan/` | Live GitHub Pages project for `iwannabewater/NiniWithYuan` |

The game channel is a catalog, not a one-game special case. `NiniWithYuan` is the first playable entry and links to both the live route and source repository.

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

No wildcard records are needed. Do not create `game.whynotsleep.cc` or the other reserved subdomains until a channel moves to its own deployment.

`https://whynotsleep.cc/NiniWithYuan/` is currently a path-level GitHub Pages project route, so it does not require a Cloudflare redirect rule.
