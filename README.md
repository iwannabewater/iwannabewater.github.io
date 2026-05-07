# Why Not Sleep

`whynotsleep.cc` is Winston's public researcher-builder hub: a durable front door for engineering writing, games, project notes, manuscripts, design studies, compact notes, and life records.

The first release is intentionally static. The main domain owns identity and routing. Seven channels are shipped as polished internal placeholder pages first, then each channel can move to its own subdomain and repository when it has enough content to justify the split.

## Commands

```bash
npm install
npm test
npm run build
npm run check
npm run dev -- --host 0.0.0.0
```

`npm run check` runs the Node test suite and then emits static output into `dist/`.

## Structure

```text
src/site-data.mjs       public profile, channel records, highlights
src/render.mjs          HTML renderers for home, channel, and 404 pages
src/texture.mjs         deterministic local PNG paper texture generator
src/build.mjs           static build pipeline
src/styles.css          Kami-adapted web visual system
dist/                   generated site, not committed
```

## Channel Model

| Route | Future host | Role |
|---|---|---|
| `/channels/blog/` | `blog.whynotsleep.cc` | Long-form technical essays and engineering narratives |
| `/channels/game/` | `game.whynotsleep.cc` | Playable browser games and interactive experiments |
| `/channels/project/` | `project.whynotsleep.cc` | Engineering projects, demos, tools, and repositories |
| `/channels/manuscript/` | `manuscript.whynotsleep.cc` | Reports, PDFs, white papers, and polished deep dives |
| `/channels/design/` | `design.whynotsleep.cc` | Visual systems, UI explorations, and design studies |
| `/channels/note/` | `note.whynotsleep.cc` | Short references, reading notes, commands, and bookmarks |
| `/channels/life/` | `life.whynotsleep.cc` | Personal living records, photos, travel, and slower daily logs |

Do not create wildcard DNS records. Do not create the seven subdomains until a channel moves to its own deployment.

## Visual System

The site adapts the Kami reference system:

- parchment page background `#f5f4ed`
- ivory surfaces `#faf9f5`
- ink-blue accent `#1B365D`
- serif-led hierarchy
- warm gray borders and text
- no pure-white page background
- no hard shadows
- no invented second accent color
- no italic text

## GitHub Pages

This repository is intended to become the GitHub user-site repository:

```text
iwannabewater/iwannabewater.github.io
```

Deployment uses GitHub Actions and uploads `dist/` as the Pages artifact. The workflow is pinned to current action release tags verified on 2026-05-07:

- `actions/checkout@v6.0.2`
- `actions/setup-node@v6.4.0`
- `actions/configure-pages@v6.0.0`
- `actions/upload-pages-artifact@v5.0.0`
- `actions/deploy-pages@v5.0.0`

## Cloudflare DNS

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

After DNS is correct, set the GitHub Pages custom domain to `whynotsleep.cc`, wait for certificate provisioning, and enable HTTPS.
