# Why Not Sleep Personal Hub Design

Date: 2026-05-07
Owner: Winston / Why Not Sleep
Repository: `iwannabewater.github.io`
Primary domain: `whynotsleep.cc`

## Intent

Build `whynotsleep.cc` as a public identity and dispatch layer for Winston / Why Not Sleep. The site should read like a serious researcher-builder archive, not a resume-only site and not a marketing landing page. It should make it clear what Winston is building, writing, playing with, and preparing to publish, while keeping future content channels independent.

The site will not claim affiliations, credentials, impact numbers, publications, or employer history that are not provided or verified. It can reference the standards of strong personal sites from top researchers and engineers through structure: clear identity, durable URLs, readable long-form navigation, project index, publication-like archive, and explicit channel boundaries.

## Scope

In scope for the first release:

- Create a new project at `/home/winston/workspace/iwannabewater.github.io`.
- Build a static-first homepage for `whynotsleep.cc`.
- Implement seven polished channel placeholders: `blog`, `game`, `project`, `manuscript`, `design`, `note`, and `life`.
- Keep those channels as internal static paths for launch, such as `/channels/blog/`.
- Prepare public routing language so each card can later become `blog.whynotsleep.cc`, `game.whynotsleep.cc`, and so on.
- Configure GitHub Pages for the user-site repository and connect `whynotsleep.cc` through Cloudflare DNS.

Out of scope for the first release:

- Creating seven independent repositories.
- Creating seven Cloudflare subdomain records immediately.
- Migrating all existing local projects into this site.
- Adding a CMS, database, login, analytics, comments, payments, or server-side functionality.
- Inventing personal biography details or fake external credibility.

## Information Architecture

The site has two levels on day one.

The root site is the identity layer:

- `whynotsleep.cc/`
- Shows the name `Winston` and brand `Why Not Sleep`.
- Explains the stance: AI systems, engineering artifacts, games, manuscripts, notes, design work, and life archive.
- Presents a concise about section, highlighted work slots, channel grid, and contact/link surface.

The channel placeholders are the destination map:

- `/channels/blog/` maps to future `blog.whynotsleep.cc`.
- `/channels/game/` maps to future `game.whynotsleep.cc`.
- `/channels/project/` maps to future `project.whynotsleep.cc`.
- `/channels/manuscript/` maps to future `manuscript.whynotsleep.cc`.
- `/channels/design/` maps to future `design.whynotsleep.cc`.
- `/channels/note/` maps to future `note.whynotsleep.cc`.
- `/channels/life/` maps to future `life.whynotsleep.cc`.

Each placeholder page must have enough structure to feel intentional: purpose, current status, expected content, and a return path to the homepage. They should not feel like empty 404 pages.

## Channel Semantics

`blog` is for long-form technical essays, engineering narratives, and research-oriented posts.

`game` is for playable browser games and game index pages.

`project` is for engineering projects, demos, tools, repositories, and case-study-style writeups.

`manuscript` is for report-like long documents, PDFs, white papers, and polished deep dives.

`design` is for visual systems, UI explorations, layouts, portfolio pieces, and design studies.

`note` is for short knowledge-base entries, reading notes, command fragments, and compact references.

`life` is for personal living records: photos, daily observations, travel, media, and lighter sharing similar in spirit to lifestyle feeds, but still presented in a calm archive style.

## Visual Direction

Use the `Research Console` direction approved during brainstorming, adapted through the Kami reference system from `github.com/tw93/Kami/tree/main/references`.

The page should feel like a durable paper index with modern web affordances:

- Editorial and dense enough for technical visitors.
- Warm and personal enough to support games, life, and design.
- Restrained, not corporate.
- High signal, no decorative clutter.

## Kami Adaptation For Web

Kami is a document design system, not a web UI framework. The implementation should preserve the constraints that matter on screen.

Tokens:

- Page background: parchment `#f5f4ed`.
- Card surface: ivory `#faf9f5`.
- Secondary surface: warm sand `#e8e6dc`.
- Single chromatic accent: ink-blue `#1B365D`.
- Accent tint: `#EEF2F7` or `#E4ECF5`.
- Primary text: near black `#141413`.
- Secondary text: warm dark `#3d3d3a`.
- Subtext: olive `#504e49`.
- Tertiary text: stone `#6b6a64`.
- Borders: warm `#e8e6dc` / `#e5e3d8`.

Rules:

- Never use pure white as the page background.
- Do not introduce purple, blue gradients, neon accents, or cool gray surfaces.
- Keep ink-blue to emphasis, labels, links, metrics, and a few structural lines.
- Use serif typography for identity and major hierarchy.
- Use restrained sans or mono only for labels, metadata, status text, and route-like strings.
- No italic text.
- No hard drop shadows. Use borders, hairlines, ring focus states, or a very soft paper-like shadow.
- Avoid visible in-app explanatory copy about features or keyboard shortcuts.
- Avoid nested cards and floating page sections.

Typography:

- Display type uses serif, weight 500, tight line-height.
- Body copy uses readable line-height around 1.5 to 1.55.
- Labels and route text use mono or utility sans with restrained tracking.
- Letter spacing stays at 0 for normal English body text.
- Chinese text can use a CJK serif fallback and slight optical spacing only where needed.

Components:

- Hero header as a paper index cover, not a marketing hero.
- Channel cards as an editorial index grid.
- Status tags as solid tints, never rgba.
- Section headers use a small label, hairline, and serif heading.
- Project/highlight modules can use Kami-style module blocks with a letter/route marker.
- Links must have clear focus states and not rely on color alone.

Visual asset:

- Add one subtle bitmap visual asset in the first release: a warm paper grain / ink texture generated or produced locally as a small optimized image. It should support the Kami paper feel without becoming the subject. It must not be a generic stock hero photo.

## Content Model

Keep site content data-driven so updates are easy.

Data records:

- `siteProfile`: name, brand, tagline, short bio, links, contact placeholders.
- `channels`: seven channel records with slug, future host, title, status, summary, planned content, and internal path.
- `highlights`: selected work slots for existing or upcoming projects.
- `signals`: compact facts such as current focus areas, public artifacts, and technical domains.

Initial copy should be honest and provisional. Use phrases like `Preparing`, `Index`, `Archive`, and `Dispatch` rather than fake claims. Existing local materials may be seeded only when their public destination is known or when the card clearly marks them as local/draft.

## Technical Architecture

Use a static-first build that outputs plain HTML/CSS/assets. This avoids GitHub Pages SPA routing problems and keeps the site durable.

Implementation choice:

- Use a custom Node ESM static generator script.
- Use Vite only as a lightweight local preview server, not as a client-side application framework.
- Source data lives in JavaScript modules or JSON.
- Shared CSS implementing Kami tokens.
- Build command emits:
  - `dist/index.html`
  - `dist/channels/<slug>/index.html` for all seven channels
  - `dist/404.html`
  - optimized assets
- No client-side router required.
- Optional minimal JavaScript only for progressive enhancement.

The release should not depend on a server runtime.

## GitHub Pages Deployment

The repository name should be `iwannabewater.github.io`, matching the authenticated GitHub user.

Deploy through GitHub Actions rather than committing generated `dist` output manually. The workflow should:

- Install dependencies from a lockfile.
- Build the static site.
- Upload `dist` as the GitHub Pages artifact.
- Deploy to the `github-pages` environment.

The Vite or static-site base path must remain `/`, because the site is a user site and will use a custom apex domain.

## Domain And DNS Plan

Use `whynotsleep.cc` as the custom domain for the main GitHub Pages user site.

GitHub Pages rules from official docs:

- Apex domains can use `A`, `AAAA`, `ALIAS`, or `ANAME` records.
- GitHub Pages apex `A` records point to:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- GitHub Pages apex `AAAA` records point to:
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`
- `www.whynotsleep.cc` should be a `CNAME` to `iwannabewater.github.io`.
- Custom subdomains should later be `CNAME` records that point directly to the relevant GitHub Pages default domain.
- Do not create wildcard DNS records such as `*.whynotsleep.cc`.

Cloudflare-specific rule:

- Cloudflare flattens apex CNAME records by default, but this launch should prefer the explicit GitHub Pages `A`/`AAAA` setup for clarity and compatibility.

Launch sequence:

1. Create and push the GitHub repository.
2. Enable GitHub Pages with Actions.
3. Set the repository custom domain to `whynotsleep.cc` through the GitHub Pages settings/API; do not rely on a `CNAME` file as the only source of truth for the Actions deployment.
4. Update Cloudflare DNS for apex and `www`.
5. Wait for DNS and certificate provisioning.
6. Enable HTTPS once available.
7. Verify with `dig`, `curl`, and browser checks.

## Accessibility And Performance

The site must be usable without JavaScript.

Requirements:

- Semantic landmarks: header, nav, main, section, footer.
- One H1 per page.
- Keyboard focus visible on all links and buttons.
- Text contrast checked against parchment and ivory backgrounds.
- Responsive layout from mobile to wide desktop.
- No horizontal scrolling on mobile.
- Images include alt text or are marked decorative when appropriate.
- Avoid large remote font payloads where possible.
- Optimize any generated texture asset.

## Error Handling

`404.html` should match the main visual system and route users back to the channel index. It should not be a generic GitHub Pages 404.

External links should be visually distinct and safe to leave unset during launch. If a channel or work item has no destination yet, it should link to its internal placeholder page, not to `#`.

## Verification

Before claiming the site is ready:

- Run the production build.
- Run a local static preview of the built `dist`.
- Inspect desktop and mobile screenshots.
- Check all internal links.
- Check that direct visits to `/channels/<slug>/` work in the built output.
- Run a basic accessibility smoke check.
- After deployment, check `https://iwannabewater.github.io/`, `https://whynotsleep.cc/`, and `https://www.whynotsleep.cc/`.
- Verify DNS records with `dig`.

## Approved Decisions

No blockers remain for implementation. The approved decisions are:

- Identity: `Winston` as personal name, `Why Not Sleep` as site/brand.
- Positioning: AI/system engineering research archive plus creator hub.
- Repository: `iwannabewater.github.io`.
- Channel set: `blog`, `game`, `project`, `manuscript`, `design`, `note`, `life`.
- Launch model: one main repository with seven internal placeholder pages; real subdomains later.
- Visual system: Research Console direction using Kami constraints.

## References

- Kami references: https://github.com/tw93/Kami/tree/main/references
- Kami design system: https://raw.githubusercontent.com/tw93/Kami/main/references/design.md
- Kami tokens: https://raw.githubusercontent.com/tw93/Kami/main/references/tokens.json
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- GitHub Pages custom domain management: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- Cloudflare CNAME flattening: https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/
