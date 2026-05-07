import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  aboutProfile,
  channels,
  contacts,
  games,
  highlights,
  searchEntries,
  signals,
  siteProfile,
} from "./site-data.mjs";
import { renderAboutPage, renderChannelPage, renderHomePage, renderNotFoundPage } from "./render.mjs";
import { createPaperGrainPng } from "./texture.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

async function writePage(path, html) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html, "utf8");
}

function renderRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: https://${siteProfile.domain}/sitemap.xml
`;
}

function renderSitemapXml(paths) {
  const urls = paths
    .map((path) => {
      const loc = path.startsWith("https://") ? path : `https://${siteProfile.domain}${path}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function buildSite({ outDir = join(projectRoot, "dist") } = {}) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "assets"), { recursive: true });

  await copyFile(join(projectRoot, "src", "styles.css"), join(outDir, "styles.css"));
  await copyFile(join(projectRoot, "src", "site.js"), join(outDir, "site.js"));
  await writeFile(join(outDir, "assets", "paper-grain.png"), createPaperGrainPng());
  await writeFile(join(outDir, "CNAME"), `${siteProfile.domain}\n`, "utf8");

  await writePage(
    join(outDir, "index.html"),
    renderHomePage({ siteProfile, channels, highlights, signals, aboutProfile, contacts, searchEntries }),
  );

  await writePage(
    join(outDir, "about", "index.html"),
    renderAboutPage({ siteProfile, channels, aboutProfile, contacts }),
  );

  for (const channel of channels) {
    await writePage(
      join(outDir, "channels", channel.slug, "index.html"),
      renderChannelPage({ siteProfile, channel, channels, games, contacts }),
    );
  }

  await writePage(join(outDir, "404.html"), renderNotFoundPage({ siteProfile, channels, contacts }));
  await writeFile(join(outDir, "robots.txt"), renderRobotsTxt(), "utf8");
  await writeFile(
    join(outDir, "sitemap.xml"),
    renderSitemapXml([
      "/",
      "/about/",
      ...channels.map((channel) => `https://${channel.host}/`),
      ...games.map((game) => game.liveUrl ?? game.path),
    ]),
    "utf8",
  );
}

if (process.argv[1] === __filename) {
  await buildSite();
}
