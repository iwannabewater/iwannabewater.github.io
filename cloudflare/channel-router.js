const CHANNEL_PATHS = {
  "blog.whynotsleep.cc": "/channels/blog/",
  "game.whynotsleep.cc": "/channels/game/",
  "project.whynotsleep.cc": "/channels/project/",
  "manuscript.whynotsleep.cc": "/channels/manuscript/",
  "design.whynotsleep.cc": "/channels/design/",
  "note.whynotsleep.cc": "/channels/note/",
  "life.whynotsleep.cc": "/channels/life/",
};

const ROOT_ASSET_PATHS = ["/styles.css", "/site.js", "/robots.txt", "/sitemap.xml"];
const ROOT_ASSET_PREFIXES = ["/assets/", "/NiniWithYuan/"];

function originPathFor(requestUrl) {
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
