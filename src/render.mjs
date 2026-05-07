const statusCopy = {
  Preparing: "being shaped",
  Reserved: "reserved route",
  Indexing: "index in progress",
};

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function attr(value) {
  return escapeHtml(value);
}

function pageTitle(siteProfile, title) {
  return title === siteProfile.brand
    ? `${siteProfile.name} / ${siteProfile.brand}`
    : `${title} / ${siteProfile.brand}`;
}

function navItems(channels) {
  return channels
    .map(
      (channel) =>
        `<a href="${attr(channel.path)}">${escapeHtml(channel.slug)}</a>`,
    )
    .join("");
}

function routeTag(channel) {
  return `<span class="route-tag">${escapeHtml(channel.host)}</span>`;
}

export function renderLayout({
  siteProfile,
  channels = [],
  title,
  description,
  canonicalPath = "/",
  body,
}) {
  const fullTitle = pageTitle(siteProfile, title);
  const canonicalUrl = `https://${siteProfile.domain}${canonicalPath}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${attr(description)}">
  <meta name="author" content="${attr(siteProfile.name)}">
  <meta name="generator" content="Why Not Sleep static builder">
  <link rel="canonical" href="${attr(canonicalUrl)}">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23f5f4ed'/%3E%3Cpath d='M17 18h30v6H17zm0 11h22v6H17zm0 11h30v6H17z' fill='%231B365D'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="paper-grain" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand-lockup" href="/" aria-label="${attr(siteProfile.brand)} home">
      <span class="brand-mark">W</span>
      <span>
        <span class="brand-name">${escapeHtml(siteProfile.name)}</span>
        <span class="brand-domain">${escapeHtml(siteProfile.domain)}</span>
      </span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      ${navItems(channels)}
    </nav>
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="site-footer">
    <div>
      <span class="footer-label">${escapeHtml(siteProfile.brand)}</span>
      <p>Quiet public archive for build notes, games, manuscripts, and life records.</p>
    </div>
    <div class="footer-links">
      <a href="${attr(siteProfile.githubUrl)}">GitHub</a>
      <a href="/">Home</a>
    </div>
  </footer>
</body>
</html>
`;
}

function renderSignalStrip(signals) {
  if (!signals.length) return "";
  return `<ul class="signal-strip" aria-label="Current focus areas">
    ${signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("")}
  </ul>`;
}

function renderChannelCard(channel, index) {
  const number = String(index + 1).padStart(2, "0");
  return `<a class="channel-card" href="${attr(channel.path)}">
    <span class="module-number">${number}</span>
    <span class="channel-card-main">
      <span class="eyebrow">${escapeHtml(channel.status)}</span>
      <strong>${escapeHtml(channel.title)}</strong>
      <span>${escapeHtml(channel.summary)}</span>
      ${routeTag(channel)}
    </span>
  </a>`;
}

function renderHighlight(highlight, index) {
  return `<a class="highlight-item" href="${attr(highlight.path)}">
    <span class="module-letter">${String.fromCharCode(65 + index)}</span>
    <span>
      <span class="eyebrow">${escapeHtml(highlight.label)}</span>
      <strong>${escapeHtml(highlight.title)}</strong>
      <span>${escapeHtml(highlight.body)}</span>
    </span>
  </a>`;
}

export function renderHomePage({ siteProfile, channels, highlights, signals }) {
  const body = `<section class="hero-section" aria-labelledby="home-title">
    <div class="hero-copy">
      <p class="overline">Research Console / Personal OS Hub</p>
      <h1 id="home-title">${escapeHtml(siteProfile.name)} / ${escapeHtml(siteProfile.brand)}</h1>
      <p class="lede">${escapeHtml(siteProfile.thesis)}</p>
      ${renderSignalStrip(signals)}
    </div>
    <aside class="route-ledger" aria-label="Route ledger">
      <div class="ledger-row">
        <span>Primary</span>
        <strong>${escapeHtml(siteProfile.domain)}</strong>
      </div>
      <div class="ledger-row">
        <span>Status</span>
        <strong>${escapeHtml(siteProfile.availability)}</strong>
      </div>
      <div class="ledger-row">
        <span>Base</span>
        <strong>${escapeHtml(siteProfile.locationLabel)}</strong>
      </div>
    </aside>
  </section>

  <section class="content-band" aria-labelledby="channels-title">
    <div class="section-header">
      <p class="overline">Channel Index</p>
      <h2 id="channels-title">Seven reserved routes, one durable front door.</h2>
    </div>
    <div class="channel-grid">
      ${channels.map(renderChannelCard).join("")}
    </div>
  </section>

  <section class="content-band split-band" aria-labelledby="work-title">
    <div class="section-header">
      <p class="overline">Current Shape</p>
      <h2 id="work-title">Artifacts first. Claims later.</h2>
    </div>
    <div class="highlight-list">
      ${highlights.map(renderHighlight).join("")}
    </div>
  </section>

  <section class="closing-index" aria-label="Reserved future hosts">
    <p class="overline">Reserved subdomains</p>
    <div class="host-list">
      ${channels.map((channel) => routeTag(channel)).join("")}
    </div>
  </section>`;

  return renderLayout({
    siteProfile,
    channels,
    title: siteProfile.brand,
    description: siteProfile.tagline,
    canonicalPath: "/",
    body,
  });
}

export function renderChannelPage({ siteProfile, channel, channels }) {
  const body = `<article class="channel-page">
    <a class="back-link" href="/">Back to ${escapeHtml(siteProfile.domain)}</a>
    <header class="channel-hero">
      <p class="overline">${escapeHtml(channel.status)} / Future host</p>
      <h1>${escapeHtml(channel.title)}</h1>
      <p class="lede">${escapeHtml(channel.summary)}</p>
      ${routeTag(channel)}
    </header>
    <section class="channel-detail" aria-labelledby="planned-title">
      <div class="section-header">
        <p class="overline">${escapeHtml(statusCopy[channel.status] ?? "reserved")}</p>
        <h2 id="planned-title">What belongs here</h2>
      </div>
      <ul class="planned-list">
        ${channel.planned.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
    <section class="next-routes" aria-labelledby="next-routes-title">
      <div class="section-header compact">
        <p class="overline">Other shelves</p>
        <h2 id="next-routes-title">Continue through the index</h2>
      </div>
      <div class="small-route-grid">
        ${channels
          .filter((item) => item.slug !== channel.slug)
          .map(
            (item) =>
              `<a href="${attr(item.path)}"><span>${escapeHtml(item.slug)}</span><strong>${escapeHtml(item.title)}</strong></a>`,
          )
          .join("")}
      </div>
    </section>
  </article>`;

  return renderLayout({
    siteProfile,
    channels,
    title: channel.title,
    description: channel.summary,
    canonicalPath: channel.path,
    body,
  });
}

export function renderNotFoundPage({ siteProfile, channels }) {
  const body = `<section class="not-found" aria-labelledby="not-found-title">
    <p class="overline">404 / Missing route</p>
    <h1 id="not-found-title">This page is not in the index.</h1>
    <p class="lede">The public map is intentionally small right now. Return to the front door or choose one of the reserved channels.</p>
    <div class="small-route-grid">
      ${channels
        .map(
          (channel) =>
            `<a href="${attr(channel.path)}"><span>${escapeHtml(channel.slug)}</span><strong>${escapeHtml(channel.title)}</strong></a>`,
        )
        .join("")}
    </div>
    <a class="primary-link" href="/">Return home</a>
  </section>`;

  return renderLayout({
    siteProfile,
    channels,
    title: "404",
    description: "Missing route in the Why Not Sleep public index.",
    canonicalPath: "/404.html",
    body,
  });
}
