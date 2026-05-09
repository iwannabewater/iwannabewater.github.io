import test from "node:test";
import assert from "node:assert/strict";
import {
  blogHttpsRedirectUrlFor,
  blogOriginUrlFor,
  canonicalBlogRedirectLocationFor,
  legacyGameRedirectUrlFor,
  originPathFor,
} from "./channel-router.js";

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

test("channel router canonicalizes direct HTTP blog traffic to HTTPS", () => {
  assert.equal(
    blogHttpsRedirectUrlFor(new URL("http://blog.whynotsleep.cc/posts/?q=astro#read")),
    "https://blog.whynotsleep.cc/posts/?q=astro#read",
  );
  assert.equal(
    blogHttpsRedirectUrlFor(
      new URL("https://blog.whynotsleep.cc/posts/?q=astro"),
      new Headers({ "cf-visitor": '{"scheme":"http"}' }),
    ),
    "https://blog.whynotsleep.cc/posts/?q=astro",
  );
  assert.equal(
    blogHttpsRedirectUrlFor(
      new URL("https://blog.whynotsleep.cc/posts/"),
      new Headers({ "x-forwarded-proto": "http" }),
    ),
    "https://blog.whynotsleep.cc/posts/",
  );
  assert.equal(blogHttpsRedirectUrlFor(new URL("https://blog.whynotsleep.cc/")), null);
  assert.equal(blogHttpsRedirectUrlFor(new URL("http://game.whynotsleep.cc/")), null);
});

test("channel router rewrites blog origin redirects back to the blog subdomain", () => {
  const requestUrl = new URL("https://blog.whynotsleep.cc/posts/?from=edge");
  assert.equal(
    canonicalBlogRedirectLocationFor("https://whynotsleep.cc/blog/posts/?q=1#top", requestUrl),
    "https://blog.whynotsleep.cc/posts/?q=1#top",
  );
  assert.equal(
    canonicalBlogRedirectLocationFor("https://www.whynotsleep.cc/", requestUrl),
    "https://blog.whynotsleep.cc/",
  );
  assert.equal(
    canonicalBlogRedirectLocationFor("https://iwannabewater.github.io/blog/about/", requestUrl),
    "https://blog.whynotsleep.cc/about/",
  );
  assert.equal(
    canonicalBlogRedirectLocationFor("http://blog.whynotsleep.cc/posts/", requestUrl),
    "https://blog.whynotsleep.cc/posts/",
  );
  assert.equal(canonicalBlogRedirectLocationFor("https://example.com/", requestUrl), null);
  assert.equal(canonicalBlogRedirectLocationFor("http://[::1", requestUrl), null);
});

test("channel router redirects legacy game URLs to the canonical game subdomain", () => {
  assert.equal(
    legacyGameRedirectUrlFor(new URL("https://whynotsleep.cc/NiniWithYuan/")),
    "https://game.whynotsleep.cc/niniwithyuan/",
  );
  assert.equal(
    legacyGameRedirectUrlFor(new URL("https://whynotsleep.cc/NiniWithYuan/assets/app.js?v=1")),
    "https://game.whynotsleep.cc/niniwithyuan/assets/app.js?v=1",
  );
  assert.equal(
    legacyGameRedirectUrlFor(new URL("https://whynotsleep.cc/niniwithyuan")),
    "https://game.whynotsleep.cc/niniwithyuan/",
  );
  assert.equal(
    legacyGameRedirectUrlFor(new URL("https://game.whynotsleep.cc/NiniWithYuan/")),
    "https://game.whynotsleep.cc/niniwithyuan/",
  );
  assert.equal(legacyGameRedirectUrlFor(new URL("https://game.whynotsleep.cc/niniwithyuan/")), null);
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
  assert.equal(legacyGameRedirectUrlFor(new URL("https://whynotsleep.cc/projects/")), null);
});
