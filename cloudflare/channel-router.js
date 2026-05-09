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

function aliasPathFor(requestUrl) {
  if (requestUrl.hostname !== "game.whynotsleep.cc") return null;

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
