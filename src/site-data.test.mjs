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
    "life",
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
