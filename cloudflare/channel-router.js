const BLOG_HOST = "blog.whynotsleep.cc";
const BLOG_PAGES_ORIGIN = `http://${BLOG_HOST}`;
const BLOG_RESOLVE_OVERRIDE = "www.whynotsleep.cc";
const PRIMARY_HOST = "whynotsleep.cc";
const GAME_HOST = "game.whynotsleep.cc";
const GAME_CANONICAL_BASE = `https://${GAME_HOST}/niniwithyuan/`;
const BLOG_REDIRECT_HOSTS = new Set([
  BLOG_HOST,
  PRIMARY_HOST,
  `www.${PRIMARY_HOST}`,
  "iwannabewater.github.io",
]);
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

const CHANNEL_PATHS = {
  "game.whynotsleep.cc": "/channels/game/",
  "project.whynotsleep.cc": "/channels/project/",
  "manuscript.whynotsleep.cc": "/channels/manuscript/",
  "design.whynotsleep.cc": "/channels/design/",
  "note.whynotsleep.cc": "/channels/note/",
  "life.whynotsleep.cc": "/channels/life/",
};

const ROOT_ASSET_PATHS = ["/styles.css", "/site.js", "/robots.txt", "/sitemap.xml"];
const ROOT_ASSET_PREFIXES = ["/assets/", "/NiniWithYuan/"];
const GAME_APP_ALIASES = {
  "/niniwithyuan": "/NiniWithYuan/",
};

export function legacyGameRedirectUrlFor(requestUrl) {
  if (requestUrl.hostname === PRIMARY_HOST) {
    const match = requestUrl.pathname.match(/^\/NiniWithYuan(?:\/(.*))?$/i);
    if (!match) return null;

    const rest = match[1] ?? "";
    const redirectUrl = new URL(rest ? rest : "", GAME_CANONICAL_BASE);
    redirectUrl.search = requestUrl.search;
    return redirectUrl.toString();
  }

  if (
    requestUrl.hostname === GAME_HOST &&
    /^\/NiniWithYuan\/?$/.test(requestUrl.pathname)
  ) {
    const redirectUrl = new URL(GAME_CANONICAL_BASE);
    redirectUrl.search = requestUrl.search;
    return redirectUrl.toString();
  }

  return null;
}

export function blogOriginUrlFor(requestUrl) {
  if (requestUrl.hostname !== BLOG_HOST) return null;

  const originUrl = new URL(requestUrl.pathname, BLOG_PAGES_ORIGIN);
  originUrl.search = requestUrl.search;
  return originUrl.toString();
}

function forwardedSchemeFor(headers) {
  const cfVisitor = headers.get("cf-visitor");
  if (cfVisitor) {
    try {
      const visitor = JSON.parse(cfVisitor);
      if (typeof visitor.scheme === "string") return visitor.scheme;
    } catch {
      // Fall through to the forwarded-proto header when Cloudflare omits JSON.
    }
  }

  return headers.get("x-forwarded-proto");
}

export function blogHttpsRedirectUrlFor(requestUrl, headers = new Headers()) {
  const scheme = forwardedSchemeFor(headers) ?? requestUrl.protocol.replace(/:$/, "");
  if (requestUrl.hostname !== BLOG_HOST || scheme === "https") {
    return null;
  }

  const redirectUrl = new URL(requestUrl.toString());
  redirectUrl.protocol = "https:";
  return redirectUrl.toString();
}

function canonicalBlogPath(pathname) {
  return pathname.replace(/^\/blog(?=\/|$)/, "") || "/";
}

export function canonicalBlogRedirectLocationFor(location, requestUrl) {
  if (!location) return null;

  let locationUrl;
  try {
    locationUrl = new URL(location, requestUrl);
  } catch {
    return null;
  }

  if (!BLOG_REDIRECT_HOSTS.has(locationUrl.hostname)) return null;

  const redirectUrl = new URL(`https://${BLOG_HOST}`);
  redirectUrl.pathname = canonicalBlogPath(locationUrl.pathname);
  redirectUrl.search = locationUrl.search;
  redirectUrl.hash = locationUrl.hash;
  return redirectUrl.toString();
}

function aliasPathFor(requestUrl) {
  if (requestUrl.hostname !== GAME_HOST) return null;

  const pathname = requestUrl.pathname.replace(/\/+$/, "") || "/";
  for (const [publicPrefix, originPrefix] of Object.entries(GAME_APP_ALIASES)) {
    if (pathname === publicPrefix) return originPrefix;
    if (pathname.startsWith(`${publicPrefix}/`)) {
      return `${originPrefix}${requestUrl.pathname.slice(publicPrefix.length + 1)}`;
    }
  }

  return null;
}

export function originPathFor(requestUrl) {
  const aliasPath = aliasPathFor(requestUrl);
  if (aliasPath) return aliasPath;

  if (
    ROOT_ASSET_PATHS.includes(requestUrl.pathname) ||
    ROOT_ASSET_PREFIXES.some((prefix) => requestUrl.pathname.startsWith(prefix))
  ) {
    return requestUrl.pathname;
  }

  const channelPath = CHANNEL_PATHS[requestUrl.hostname];
  if (!channelPath) return null;

  if (requestUrl.pathname === "/") return channelPath;
  return `${channelPath.replace(/\/$/, "")}${requestUrl.pathname}`;
}

export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const legacyGameRedirectUrl = legacyGameRedirectUrlFor(requestUrl);

    if (legacyGameRedirectUrl) {
      return Response.redirect(legacyGameRedirectUrl, 301);
    }

    const blogOriginUrl = blogOriginUrlFor(requestUrl);

    if (blogOriginUrl) {
      const blogHttpsRedirectUrl = blogHttpsRedirectUrlFor(requestUrl, request.headers);
      if (blogHttpsRedirectUrl) {
        return Response.redirect(blogHttpsRedirectUrl, 301);
      }

      const init = {
        method: request.method,
        headers: new Headers(request.headers),
        redirect: "manual",
      };
      init.headers.set("host", BLOG_HOST);
      if (request.method !== "GET" && request.method !== "HEAD") {
        init.body = request.body;
      }

      const response = await fetch(new Request(blogOriginUrl, init), {
        cf: { resolveOverride: BLOG_RESOLVE_OVERRIDE },
      });
      const headers = new Headers(response.headers);
      headers.set("x-wns-blog-origin", "github-pages");
      if (REDIRECT_STATUSES.has(response.status)) {
        const redirectLocation = canonicalBlogRedirectLocationFor(
          headers.get("location"),
          requestUrl,
        );
        if (redirectLocation) headers.set("location", redirectLocation);
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    const originPath = originPathFor(requestUrl);

    if (!originPath) {
      return new Response("Unknown Why Not Sleep channel host.", { status: 404 });
    }

    const originUrl = new URL(`https://whynotsleep.cc${originPath}`);
    originUrl.search = requestUrl.search;

    const init = {
      method: request.method,
      headers: new Headers(request.headers),
      redirect: "manual",
    };
    init.headers.delete("host");
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const response = await fetch(new Request(originUrl.toString(), init));
    const headers = new Headers(response.headers);
    headers.set("x-wns-channel-host", requestUrl.hostname);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
