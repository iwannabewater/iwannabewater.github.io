import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("styles implement the site visual token contract", async () => {
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  const requiredTokens = [
    "--parchment: #f5f4ed",
    "--ivory: #faf9f5",
    "--warm-sand: #e8e6dc",
    "--brand: #1B365D",
    "--brand-tint: #EEF2F7",
    "--near-black: #141413",
    "--dark-warm: #3d3d3a",
    "--olive: #504e49",
    "--stone: #6b6a64",
    "--border-soft: #e5e3d8",
    "--signal: #2F6F5E",
    "--copper: #8E513A",
    "--hand:",
  ];

  for (const token of requiredTokens) {
    assert.match(css, new RegExp(token.replaceAll("#", "\\#")));
  }
});

test("styles avoid visual anti-patterns", async () => {
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /font-style\s*:\s*italic/i);
  assert.doesNotMatch(css, /background(?:-color)?\s*:\s*#fff(?:fff)?\b/i);
  assert.doesNotMatch(css, /purple|violet|fuchsia|gradient-blob|orb/i);
});

test("styles include responsive, focus, and paper texture rules", async () => {
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1180px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.brand-mark-icon/);
  assert.match(css, /\.theme-toggle/);
  assert.match(css, /html\[data-theme="night"\]/);
  assert.match(css, /\.search-band/);
  assert.match(css, /\.motto/);
  assert.match(css, /\.copyright-icon/);
  assert.match(css, /\.game-grid/);
  assert.match(css, /\.contact-link/);
  assert.match(css, /paper-grain\.png/);
});
