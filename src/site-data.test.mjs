import test from "node:test";
import assert from "node:assert/strict";
import { aboutProfile, channels, contacts, games, siteProfile } from "./site-data.mjs";

test("site profile exposes the approved identity and domain", () => {
  assert.equal(siteProfile.name, "Winston");
  assert.equal(siteProfile.brand, "Why Not Sleep");
  assert.equal(siteProfile.domain, "whynotsleep.cc");
  assert.equal(siteProfile.githubUser, "iwannabewater");
  assert.equal(siteProfile.email, "iwannabewater@gmail.com");
  assert.match(siteProfile.role, /multimodal algorithm engineer/i);
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
    "life",
  ]);
});

test("each channel has an internal path and planned host", () => {
  for (const channel of channels) {
    assert.match(channel.path, new RegExp(`^/channels/${channel.slug}/$`));
    assert.equal(channel.host, `${channel.slug}.whynotsleep.cc`);
    assert.ok(channel.summary.length >= 48);
    assert.ok(channel.planned.length >= 3);
  }
});

test("about profile states current large-model focus areas", () => {
  const focusText = aboutProfile.focusAreas.map((area) => area.label).join(" ");
  assert.match(focusText, /LLM\/MM post-training/);
  assert.match(focusText, /Agentic RL/);
  assert.match(focusText, /Generative search/);
  assert.ok(aboutProfile.principles.length >= 3);
});

test("game catalog includes NiniWithYuan with live and source routes", () => {
  assert.equal(games.length, 1);
  assert.equal(games[0].title, "NiniWithYuan");
  assert.equal(games[0].path, "/NiniWithYuan/");
  assert.equal(games[0].repoUrl, "https://github.com/iwannabewater/NiniWithYuan");
});

test("contacts expose the public footer destinations", () => {
  assert.deepEqual(
    contacts.map((contact) => contact.id),
    ["github", "email", "x", "telegram"],
  );
  assert.equal(contacts.find((contact) => contact.id === "email").href, "mailto:iwannabewater@gmail.com");
  assert.equal(contacts.find((contact) => contact.id === "x").href, "https://x.com/lilmochimo01");
  assert.equal(contacts.find((contact) => contact.id === "telegram").href, "https://t.me/lilmochimo");
});
