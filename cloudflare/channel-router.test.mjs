import test from "node:test";
import assert from "node:assert/strict";
import { blogOriginUrlFor, originPathFor } from "./channel-router.js";

test("channel router maps channel roots to generated origin paths", () => {
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/")), "/channels/game/");
});

test("channel router maps blog host to the dedicated GitHub Pages origin", () => {
  assert.equal(blogOriginUrlFor(new URL("https://blog.whynotsleep.cc/")), "http://blog.whynotsleep.cc/");
  assert.equal(
    blogOriginUrlFor(new URL("https://blog.whynotsleep.cc/posts/?q=astro")),
    "http://blog.whynotsleep.cc/posts/?q=astro",
  );
  assert.equal(
    blogOriginUrlFor(new URL("https://blog.whynotsleep.cc/_astro/app.js")),
    "http://blog.whynotsleep.cc/_astro/app.js",
  );
});

test("channel router preserves nested channel paths and query handling stays outside mapping", () => {
  const url = new URL("https://game.whynotsleep.cc/notes/build-log/?q=nini");
  assert.equal(originPathFor(url), "/channels/game/notes/build-log/");
});

test("channel router serves shared root assets from the apex origin", () => {
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/styles.css")), "/styles.css");
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/site.js")), "/site.js");
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/assets/paper-grain.png")), "/assets/paper-grain.png");
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/NiniWithYuan/")), "/NiniWithYuan/");
});

test("channel router maps lowercase game app aliases to their GitHub Pages project path", () => {
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/niniwithyuan")), "/NiniWithYuan/");
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/niniwithyuan/")), "/NiniWithYuan/");
  assert.equal(originPathFor(new URL("https://game.whynotsleep.cc/niniwithyuan/styles.css")), "/NiniWithYuan/styles.css");
});

test("channel router rejects unknown hosts", () => {
  assert.equal(originPathFor(new URL("https://unknown.whynotsleep.cc/")), null);
  assert.equal(originPathFor(new URL("https://blog.whynotsleep.cc/")), null);
  assert.equal(blogOriginUrlFor(new URL("https://game.whynotsleep.cc/")), null);
});
