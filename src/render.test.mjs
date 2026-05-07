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
