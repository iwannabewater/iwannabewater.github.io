import test from "node:test";
import assert from "node:assert/strict";
import { renderAboutPage, renderChannelPage, renderHomePage, escapeHtml } from "./render.mjs";
import { aboutProfile, channels, contacts, games, searchEntries, siteProfile } from "./site-data.mjs";

test("escapeHtml escapes text inserted into markup", () => {
  assert.equal(escapeHtml(`<Sleep & "Code">`), "&lt;Sleep &amp; &quot;Code&quot;&gt;");
});

test("home page renders approved identity and all channel routes", () => {
  const html = renderHomePage({
    siteProfile,
    channels,
    highlights: [],
    signals: [],
    aboutProfile,
    contacts,
    searchEntries,
  });
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /Winston/);
  assert.match(html, /Why Not Sleep/);
  assert.match(html, /Larger than life/);
  assert.match(html, /href="https:\/\/whynotsleep\.cc\/about\/"/);
  assert.match(html, /LLM\/MM post-training/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /data-site-search/);
  assert.match(html, /Copyright © Winston/);
  for (const channel of channels) {
    assert.match(html, new RegExp(`href="https://${channel.host}/"`));
    assert.match(html, new RegExp(channel.host.replaceAll(".", "\\.")));
  }
  const nav = html.match(/<nav[\s\S]*?<\/nav>/)[0];
  assert.ok(nav.indexOf("life") < nav.indexOf("about"));
});

test("channel page renders one h1, host tag, and homepage return link", () => {
  const html = renderChannelPage({ siteProfile, channel: channels[0], channels, contacts });
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(html, new RegExp(channels[0].host.replaceAll(".", "\\.")));
  assert.match(html, /href="https:\/\/whynotsleep\.cc\/"/);
});

test("about page renders profile focus and contact links as new-tab anchors", () => {
  const html = renderAboutPage({ siteProfile, channels, aboutProfile, contacts });
  assert.match(html, /Large-model \/ multimodal algorithm engineer/);
  assert.match(html, /href="mailto:iwannabewater@gmail.com" target="_blank"/);
  assert.match(html, /href="https:\/\/x.com\/lilmochimo01" target="_blank"/);
  assert.match(html, /href="https:\/\/t.me\/lilmochimo" target="_blank"/);
});

test("game channel renders NiniWithYuan as a catalog entry", () => {
  const gameChannel = channels.find((channel) => channel.slug === "game");
  const html = renderChannelPage({ siteProfile, channel: gameChannel, channels, games, contacts });
  assert.match(html, /NiniWithYuan/);
  assert.match(html, /<link rel="canonical" href="https:\/\/game\.whynotsleep\.cc\/">/);
  assert.match(html, /href="https:\/\/whynotsleep\.cc\/NiniWithYuan\/" target="_blank"/);
  assert.match(html, /href="https:\/\/github.com\/iwannabewater\/NiniWithYuan" target="_blank"/);
});
