import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSite } from "./build.mjs";
import { channels } from "./site-data.mjs";

test("buildSite writes the full static output tree", async () => {
  const outDir = await mkdtemp(join(tmpdir(), "whynotsleep-dist-"));
  await buildSite({ outDir });

  assert.match(await readFile(join(outDir, "index.html"), "utf8"), /Why Not Sleep/);
  assert.match(await readFile(join(outDir, "about", "index.html"), "utf8"), /Agentic RL/);
  assert.match(await readFile(join(outDir, "404.html"), "utf8"), /This page is not in the index/);
  assert.equal((await readFile(join(outDir, "CNAME"), "utf8")).trim(), "whynotsleep.cc");
  assert.match(await readFile(join(outDir, "robots.txt"), "utf8"), /Sitemap: https:\/\/whynotsleep\.cc\/sitemap\.xml/);
  assert.match(await readFile(join(outDir, "sitemap.xml"), "utf8"), /https:\/\/whynotsleep\.cc\/NiniWithYuan\//);
  assert.match(await readFile(join(outDir, "sitemap.xml"), "utf8"), /https:\/\/game\.whynotsleep\.cc\//);

  for (const channel of channels) {
    const html = await readFile(join(outDir, "channels", channel.slug, "index.html"), "utf8");
    assert.match(html, new RegExp(channel.title));
    assert.match(html, new RegExp(channel.host.replaceAll(".", "\\.")));
  }

  assert.ok((await stat(join(outDir, "styles.css"))).size > 100);
  assert.ok((await stat(join(outDir, "site.js"))).size > 100);
  assert.ok((await stat(join(outDir, "assets", "paper-grain.png"))).size > 100);
});
