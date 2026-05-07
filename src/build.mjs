import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { channels, highlights, signals, siteProfile } from "./site-data.mjs";
import { renderChannelPage, renderHomePage, renderNotFoundPage } from "./render.mjs";
import { createPaperGrainPng } from "./texture.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

async function writePage(path, html) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html, "utf8");
}

export async function buildSite({ outDir = join(projectRoot, "dist") } = {}) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "assets"), { recursive: true });

  await copyFile(join(projectRoot, "src", "styles.css"), join(outDir, "styles.css"));
  await writeFile(join(outDir, "assets", "paper-grain.png"), createPaperGrainPng());
  await writeFile(join(outDir, "CNAME"), `${siteProfile.domain}\n`, "utf8");

  await writePage(
    join(outDir, "index.html"),
    renderHomePage({ siteProfile, channels, highlights, signals }),
  );

  for (const channel of channels) {
    await writePage(
      join(outDir, "channels", channel.slug, "index.html"),
      renderChannelPage({ siteProfile, channel, channels }),
    );
  }

  await writePage(join(outDir, "404.html"), renderNotFoundPage({ siteProfile, channels }));
}

if (process.argv[1] === __filename) {
  await buildSite();
}
