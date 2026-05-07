# Why Not Sleep Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Kami-styled static personal hub for `whynotsleep.cc` with seven intentional channel placeholder pages.

**Architecture:** A custom Node ESM generator reads structured site data and renders plain static HTML into `dist/`. Shared CSS implements the Kami-derived web visual system, while GitHub Actions publishes the built artifact to GitHub Pages. The first release keeps future subdomains as polished internal pages so DNS can be attached later without changing content semantics.

**Tech Stack:** Node.js ESM, `node:test`, Vite preview server, plain HTML/CSS, GitHub Actions Pages workflow, Cloudflare DNS managed through `wrangler` after deploy.

---

## File Structure

- Create `package.json`: scripts for test, build, preview, and checks.
- Create `package-lock.json`: locked install state after `npm install`.
- Create `src/site-data.mjs`: all public profile, channel, highlight, and signal records.
- Create `src/render.mjs`: reusable HTML rendering helpers and page renderers.
- Create `src/build.mjs`: clean `dist/`, copy assets, render all pages, and write `CNAME`.
- Create `src/texture.mjs`: deterministic local PNG texture generation for the subtle Kami paper grain asset.
- Create `src/render.test.mjs`: tests for HTML generation, channel routes, link safety, and escaping.
- Create `src/site-data.test.mjs`: tests for channel completeness and data consistency.
- Create `src/texture.test.mjs`: tests that the generated texture is a valid PNG signature with deterministic output.
- Create `src/styles.css`: Kami-adapted web tokens, layout, responsive states, and print-friendly styling.
- Create `.github/workflows/pages.yml`: GitHub Pages artifact deployment.
- Create `README.md`: local development, deployment, DNS, and channel model notes.
- Create `CNAME`: repository-level domain hint for local clarity and GitHub Pages compatibility.

## Task 1: Project Tooling Baseline

**Files:**
- Create: `package.json`
- Create after install: `package-lock.json`

- [ ] **Step 1: Write package manifest**

Create `package.json` with this content:

```json
{
  "name": "iwannabewater.github.io",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test",
    "build": "node src/build.mjs",
    "check": "npm run test && npm run build",
    "preview": "vite preview --host 0.0.0.0",
    "dev": "vite --host 0.0.0.0"
  },
  "devDependencies": {
    "vite": "^7.3.0"
  },
  "engines": {
    "node": ">=22"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: creates `package-lock.json`, installs Vite, exits 0.

- [ ] **Step 3: Run baseline test command**

Run: `npm test`

Expected: no test files yet, command exits 0 or reports zero tests without failing.

- [ ] **Step 4: Commit tooling baseline**

Run:

```bash
git add package.json package-lock.json
git commit -m "chore: add site tooling baseline"
```

## Task 2: Data Model Tests

**Files:**
- Create: `src/site-data.test.mjs`
- Create later: `src/site-data.mjs`

- [ ] **Step 1: Write failing data consistency tests**

Create `src/site-data.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { channels, siteProfile } from "./site-data.mjs";

test("site profile exposes the approved identity and domain", () => {
  assert.equal(siteProfile.name, "Winston");
  assert.equal(siteProfile.brand, "Why Not Sleep");
  assert.equal(siteProfile.domain, "whynotsleep.cc");
  assert.equal(siteProfile.githubUser, "iwannabewater");
});

test("channels contain exactly the seven approved launch slugs", () => {
  const slugs = channels.map((channel) => channel.slug);
  assert.deepEqual(slugs, [
    "blog",
    "game",
    "project",
    "manuscript",
    "design",
    "note",
    "life"
  ]);
});

test("each channel has an internal launch path and reserved future host", () => {
  for (const channel of channels) {
    assert.match(channel.path, new RegExp(`^/channels/${channel.slug}/$`));
    assert.equal(channel.host, `${channel.slug}.whynotsleep.cc`);
    assert.ok(channel.summary.length >= 48);
    assert.ok(channel.planned.length >= 3);
  }
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test`

Expected: FAIL with `Cannot find module` for `src/site-data.mjs`.

- [ ] **Step 3: Implement site data**

Create `src/site-data.mjs` exporting `siteProfile`, `channels`, `highlights`, and `signals`. Use the approved identity, seven channel slugs, internal paths, future hosts, honest status labels, and no fake credentials.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 5: Commit data model**

Run:

```bash
git add src/site-data.mjs src/site-data.test.mjs
git commit -m "feat: add launch channel data model"
```

## Task 3: Rendering Tests And Renderer

**Files:**
- Create: `src/render.test.mjs`
- Create: `src/render.mjs`

- [ ] **Step 1: Write failing renderer tests**

Create `src/render.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { renderHomePage, renderChannelPage, escapeHtml } from "./render.mjs";
import { channels, siteProfile } from "./site-data.mjs";

test("escapeHtml escapes text inserted into markup", () => {
  assert.equal(escapeHtml(`<Sleep & "Code">`), "&lt;Sleep &amp; &quot;Code&quot;&gt;");
});

test("home page renders approved identity and all channel routes", () => {
  const html = renderHomePage({ siteProfile, channels, highlights: [], signals: [] });
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /Winston/);
  assert.match(html, /Why Not Sleep/);
  for (const channel of channels) {
    assert.match(html, new RegExp(`href="${channel.path}"`));
    assert.match(html, new RegExp(channel.host.replaceAll(".", "\\.")));
  }
});

test("channel page renders one h1, future host, and homepage return link", () => {
  const html = renderChannelPage({ siteProfile, channel: channels[0], channels });
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(html, new RegExp(channels[0].host.replaceAll(".", "\\.")));
  assert.match(html, /href="\/"/);
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test`

Expected: FAIL with `Cannot find module` for `src/render.mjs`.

- [ ] **Step 3: Implement renderer**

Create `src/render.mjs` with:

- `escapeHtml(value)`
- `renderLayout({ siteProfile, title, description, body, canonicalPath })`
- `renderHomePage({ siteProfile, channels, highlights, signals })`
- `renderChannelPage({ siteProfile, channel, channels })`
- `renderNotFoundPage({ siteProfile, channels })`

Every page must include semantic landmarks, a single H1, stylesheet link `/styles.css`, and the generated texture asset reference `/assets/paper-grain.png`.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 5: Commit renderer**

Run:

```bash
git add src/render.mjs src/render.test.mjs
git commit -m "feat: render static site pages"
```

## Task 4: Texture And Build Pipeline

**Files:**
- Create: `src/texture.test.mjs`
- Create: `src/texture.mjs`
- Create: `src/build.mjs`
- Create: `CNAME`

- [ ] **Step 1: Write failing texture tests**

Create `src/texture.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { createPaperGrainPng } from "./texture.mjs";

test("paper grain generator returns a valid deterministic PNG", () => {
  const first = createPaperGrainPng(16, 16, 93);
  const second = createPaperGrainPng(16, 16, 93);
  assert.deepEqual([...first.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(Buffer.compare(first, second), 0);
  assert.ok(first.length > 100);
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test`

Expected: FAIL with `Cannot find module` for `src/texture.mjs`.

- [ ] **Step 3: Implement texture generator**

Create `src/texture.mjs` with a deterministic PNG encoder using Node `zlib.deflateSync`, PNG signature, IHDR, IDAT, IEND chunks, CRC32 calculation, and seeded warm RGB values around the Kami parchment palette.

- [ ] **Step 4: Implement build script**

Create `src/build.mjs` that:

- Removes `dist/`.
- Creates `dist/assets/`.
- Writes `dist/assets/paper-grain.png`.
- Copies `src/styles.css` to `dist/styles.css`.
- Renders `dist/index.html`.
- Renders `dist/channels/<slug>/index.html` for every channel.
- Renders `dist/404.html`.
- Writes `dist/CNAME` with `whynotsleep.cc`.

Create root `CNAME` with:

```text
whynotsleep.cc
```

- [ ] **Step 5: Run tests and build**

Run: `npm run check`

Expected: tests pass and `dist/` contains root page, seven channel pages, 404 page, styles, CNAME, and PNG asset.

- [ ] **Step 6: Commit build pipeline**

Run:

```bash
git add CNAME src/texture.mjs src/texture.test.mjs src/build.mjs
git commit -m "feat: add static build pipeline"
```

## Task 5: Kami Web CSS

**Files:**
- Create: `src/styles.css`
- Modify if needed: `src/render.mjs`

- [ ] **Step 1: Write CSS contract test**

Add a test to `src/render.test.mjs` that reads `src/styles.css` and checks for Kami token values, no `font-style: italic`, no purple/blue gradient tokens, no pure white page background, and required responsive media queries.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test`

Expected: FAIL because `src/styles.css` does not exist or lacks required tokens.

- [ ] **Step 3: Implement Kami web CSS**

Create `src/styles.css` with:

- CSS variables matching the Kami tokens.
- Parchment page background and ivory surfaces.
- Serif-led type hierarchy.
- Editorial hero/index layout.
- Channel card grid and channel detail pages.
- Solid tint tags.
- Visible focus states.
- Responsive mobile and wide desktop rules.
- Print-friendly styles.
- No italic, no hard shadows, no nested-card look, no decorative gradient blobs.

- [ ] **Step 4: Run tests and build**

Run: `npm run check`

Expected: tests pass and build completes.

- [ ] **Step 5: Commit visual system**

Run:

```bash
git add src/styles.css src/render.mjs src/render.test.mjs
git commit -m "feat: apply kami web visual system"
```

## Task 6: Deployment And Documentation

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `README.md`

- [ ] **Step 1: Write deployment workflow**

Create `.github/workflows/pages.yml` using official GitHub Pages Actions:

- `actions/checkout@v6`
- `actions/setup-node@v6`
- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v5`
- `actions/deploy-pages@v5`

Include permissions: `contents: read`, `pages: write`, `id-token: write`.

- [ ] **Step 2: Write README**

Create `README.md` with local commands, project structure, channel model, GitHub Pages deployment notes, and Cloudflare DNS records for apex + `www`.

- [ ] **Step 3: Run full check**

Run: `npm run check`

Expected: tests and build pass.

- [ ] **Step 4: Commit deployment docs**

Run:

```bash
git add .github/workflows/pages.yml README.md
git commit -m "chore: add pages deployment workflow"
```

## Task 7: Local Verification And Deployment Setup

**Files:**
- Modify only if verification finds issues: `src/*`, `README.md`, `.github/workflows/pages.yml`

- [ ] **Step 1: Run final local checks**

Run:

```bash
npm run check
find dist -maxdepth 3 -type f | sort
```

Expected: tests pass and expected files are present.

- [ ] **Step 2: Start local preview**

Run: `npm run dev -- --host 0.0.0.0`

Expected: Vite serves the static source root or generated files. If Vite root is not serving `dist`, adjust `package.json` scripts to preview `dist` with Vite or another static preview command.

- [ ] **Step 3: Inspect browser output**

Use browser screenshot checks for:

- Desktop homepage.
- Mobile homepage.
- One channel page.
- Built asset rendering.
- No overlapping text.
- No horizontal mobile overflow.

- [ ] **Step 4: Create GitHub repository and push**

Run:

```bash
gh repo create iwannabewater/iwannabewater.github.io --private --source . --remote origin --push
```

If the repository already exists, set `origin` to the existing SSH URL and push `feature/whynotsleep-home`.

- [ ] **Step 5: Enable GitHub Pages custom domain**

Use GitHub API after the repository exists to create or update Pages with `build_type: workflow` and custom domain `whynotsleep.cc`.

- [ ] **Step 6: Configure Cloudflare DNS**

Use `wrangler` or Cloudflare API to set:

- Apex `A` records to the four GitHub Pages IPv4 addresses.
- Apex `AAAA` records to the four GitHub Pages IPv6 addresses.
- `www` `CNAME` to `iwannabewater.github.io`.

Do not create wildcard DNS or the seven content subdomains yet.

- [ ] **Step 7: Verify remote deployment**

Run DNS and HTTP checks for:

- `https://iwannabewater.github.io/`
- `https://whynotsleep.cc/`
- `https://www.whynotsleep.cc/`

If certificate provisioning is still pending, record the exact state and retry after DNS propagation.

## Self-Review Notes

- Spec coverage: identity, seven channels, Kami visual system, static build, GitHub Pages deployment, Cloudflare DNS, accessibility, 404 handling, and verification all map to tasks above.
- Placeholder scan: no `TBD`, `TODO`, or unspecified implementation steps remain.
- Type consistency: `siteProfile`, `channels`, `highlights`, and `signals` are introduced in Task 2 and consumed by Tasks 3 and 4.
