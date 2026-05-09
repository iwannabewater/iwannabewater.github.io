const statusCopy = {
  Preparing: "being shaped",
  Reserved: "reserved route",
  Indexing: "index in progress",
  Live: "available now",
};

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#17231f"/><path d="M20 43c9.8 4.5 20.9 1.7 26.5-6.8" fill="none" stroke="#f1eee6" stroke-width="3.2" stroke-linecap="round"/><path d="M30 14c-5.6 7.8-3.6 18.9 4.2 24.5 4.5 3.2 10.3 4 15.4 2.1A20.8 20.8 0 1 1 30 14Z" fill="#f1eee6"/><path d="M45 14l1.9 4.1 4.1 1.9-4.1 1.9L45 26l-1.9-4.1L39 20l4.1-1.9L45 14Z" fill="#d6a55d"/><circle cx="18" cy="20" r="2.4" fill="#7b8d77"/></svg>`;

const contactIcons = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.7c-5.2 0-9.4 4.2-9.4 9.4 0 4.2 2.7 7.7 6.5 8.9.5.1.7-.2.7-.5v-1.8c-2.6.6-3.2-1.1-3.2-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .8 1.5 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.2 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.7.7 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5a9.4 9.4 0 0 0-3-18.3Z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.8 6.5h14.4c.7 0 1.3.6 1.3 1.3v8.4c0 .7-.6 1.3-1.3 1.3H4.8c-.7 0-1.3-.6-1.3-1.3V7.8c0-.7.6-1.3 1.3-1.3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4.4 7.6 7.6 5.7 7.6-5.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>`,
  x: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.1 4.8h4.4l3.3 4.6 4-4.6h2.1l-5.1 5.9 6 8.5h-4.4l-3.7-5.3-4.6 5.3H5l5.8-6.7-5.7-7.7Zm3.4 1.6 7.8 11.2h1.1L9.6 6.4H8.5Z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.8 4.5 3.9 11c-1.1.4-1.1 1.1-.2 1.4l4.3 1.4 1.7 5.2c.2.6.3.8.7.8.3 0 .5-.1.8-.4l2.4-2.3 4.9 3.6c.9.5 1.5.3 1.7-.9l3.1-14.5c.3-1.3-.5-1.8-1.5-1.3Zm-3.1 3.4-8.1 7.3-.3 3.2-1.2-4 9.6-6.5Z"/></svg>`,
};

const writingIcon = `<svg class="copyright-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.2 18.8h13.6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"/><path d="m6.2 15.2 1.1-4.4 8-8c.8-.8 2-.8 2.8 0l.5.5c.8.8.8 2 0 2.8l-8 8-4.4 1.1Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.6"/><path d="m14.1 4 2.9 2.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"/></svg>`;

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

function encodeSvg(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function renderBrandMark() {
  return `<svg class="brand-mark-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path class="brand-mark-arc" d="M13 37.8c9.4 8.5 26.3 8.4 36.4-1.2" />
        <path class="brand-mark-crescent" d="M38.3 13.8a17.8 17.8 0 0 0 7.1 27.3 20.1 20.1 0 1 1-7.1-27.3Z" />
        <path class="brand-mark-quill" d="M21 45.5c7.3-1.7 15.1-6 23.4-12.8" />
        <path class="brand-mark-spark" d="M46 14l1.8 3.8 3.9 1.7-3.9 1.7L46 25l-1.8-3.8-3.9-1.7 3.9-1.7L46 14Z" />
        <circle class="brand-mark-dot" cx="20" cy="22" r="2.2" />
      </svg>`;
}

function channelUrl(channel) {
  return `https://${channel.host}/`;
}

function canonicalHref(siteProfile, value) {
  return value.startsWith("https://") ? value : `https://${siteProfile.domain}${value}`;
}

function navItems(siteProfile, channels, activePath) {
  const activeUrl = canonicalHref(siteProfile, activePath);
  const items = [
    ...channels.map((channel) => ({ slug: channel.slug, path: channelUrl(channel) })),
    { slug: "about", path: `https://${siteProfile.domain}/about/` },
  ];

  return items
    .map(
      (item) =>
        `<a href="${attr(item.path)}"${item.path === activePath || item.path === activeUrl ? ` aria-current="page"` : ""}>${escapeHtml(item.slug)}</a>`,
    )
    .join("");
}

function routeTag(channel) {
  return `<span class="route-tag">${escapeHtml(channel.host)}</span>`;
}

function channelNumberAt(index) {
  return String(index + 1).padStart(2, "0");
}

function renderModuleNumber(number) {
  const [lead, digit] = number.split("");
  return `<span class="module-number" aria-hidden="true">
      <span class="module-number-zero">${escapeHtml(lead)}</span>
      <span class="module-number-digit">${escapeHtml(digit)}</span>
    </span>`;
}

function newTabAttrs(label) {
  return ` target="_blank" rel="noopener noreferrer" aria-label="${attr(`${label} opens in a new tab`)}"`;
}

function renderContactLink(contact, className = "footer-link") {
  const icon = contactIcons[contact.id] ?? "";
  return `<a class="${attr(className)}" href="${attr(contact.href)}"${newTabAttrs(contact.label)}>
      ${icon}
      <span>${escapeHtml(contact.label)}</span>
    </a>`;
}

function renderThemeToggle() {
  return `<button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch reading mode" title="Switch reading mode">
      <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <path d="M12 2.8v2.4M12 18.8v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"/>
      </svg>
      <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M18.7 15.6A7.8 7.8 0 0 1 8.4 5.3a8.2 8.2 0 1 0 10.3 10.3Z" fill="currentColor"/>
      </svg>
    </button>`;
}

function jsonScriptData(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export function renderLayout({
  siteProfile,
  channels = [],
  contacts = [],
  title,
  description,
  canonicalPath = "/",
  body,
}) {
  const fullTitle = pageTitle(siteProfile, title);
  const canonicalUrl = canonicalHref(siteProfile, canonicalPath);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${attr(description)}">
  <meta name="author" content="${attr(siteProfile.name)}">
  <meta name="generator" content="Why Not Sleep static builder">
  <meta name="theme-color" content="#f5f4ed">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${attr(siteProfile.brand)}">
  <meta property="og:title" content="${attr(fullTitle)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(canonicalUrl)}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${attr(canonicalUrl)}">
  <link rel="icon" href="${attr(encodeSvg(faviconSvg))}">
  <script>try{const t=localStorage.getItem("wns-theme");if(t)document.documentElement.dataset.theme=t;}catch{}</script>
  <link rel="stylesheet" href="/styles.css">
  <script src="/site.js" defer></script>
</head>
<body>
  <div class="paper-grain" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand-lockup" href="https://${attr(siteProfile.domain)}/" aria-label="${attr(siteProfile.brand)} home">
      <span class="brand-mark">${renderBrandMark()}</span>
      <span>
        <span class="brand-name">${escapeHtml(siteProfile.name)}</span>
        <span class="brand-domain">${escapeHtml(siteProfile.domain)}</span>
      </span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      ${navItems(siteProfile, channels, canonicalPath)}
    </nav>
    ${renderThemeToggle()}
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="site-footer">
    <div class="footer-main">
      <div>
        <span class="footer-label">${escapeHtml(siteProfile.brand)}</span>
        <p>Quiet public archive for build notes, games, manuscripts, and life records.</p>
      </div>
      <div class="footer-links" aria-label="Contact links">
        ${contacts.map((contact) => renderContactLink(contact)).join("")}
      </div>
    </div>
    <p class="copyright">Copyright © ${escapeHtml(siteProfile.name)}, ${writingIcon} 2026</p>
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
  const number = channelNumberAt(index);
  return `<a class="channel-card" href="${attr(channelUrl(channel))}">
    ${renderModuleNumber(number)}
    <span class="channel-card-main">
      <span class="eyebrow">${escapeHtml(channel.status)}</span>
      <strong>${escapeHtml(channel.title)}</strong>
      <span>${escapeHtml(channel.summary)}</span>
      ${routeTag(channel)}
    </span>
  </a>`;
}

function renderChannelSpecCard(channel, index) {
  const number = channelNumberAt(index);
  return `<aside class="channel-spec-card" aria-label="${attr(`${channel.title} route card`)}">
    ${renderModuleNumber(number)}
    <div class="channel-spec-copy">
      <span class="eyebrow">${escapeHtml(channel.slug)} route</span>
      <strong>${escapeHtml(channel.host)}</strong>
      <span>${escapeHtml(channel.signal)} / ${escapeHtml(channel.status)}</span>
    </div>
  </aside>`;
}

function renderPlannedItem(item, index) {
  return `<li>
    <span>${escapeHtml(channelNumberAt(index))}</span>
    <strong>${escapeHtml(item)}</strong>
  </li>`;
}

function renderSearchSection(searchEntries) {
  return `<section class="search-band" aria-labelledby="site-search-title">
    <div class="section-header compact">
      <p class="overline">Search</p>
      <h2 id="site-search-title">Find a route, note, game, or focus area.</h2>
    </div>
    <div class="site-search" data-site-search>
      <label class="search-label" for="site-search-input">Search the site</label>
      <div class="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="10.8" cy="10.8" r="6.1" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <path d="m15.4 15.4 4.2 4.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.7"/>
        </svg>
        <input id="site-search-input" type="search" placeholder="Search post-training, games, notes..." autocomplete="off" data-search-input>
      </div>
      <div class="search-results" data-search-results aria-live="polite"></div>
    </div>
    <script type="application/json" id="site-search-data">${jsonScriptData(searchEntries)}</script>
  </section>`;
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

function renderFocusPreview(aboutProfile) {
  return `<div class="focus-preview">
    ${aboutProfile.focusAreas
      .map(
        (area) => `<article>
          <span class="eyebrow">${escapeHtml(area.label)}</span>
          <p>${escapeHtml(area.body)}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

function renderGameCatalog(games) {
  if (!games.length) return "";

  return `<section class="game-catalog" aria-labelledby="game-catalog-title">
    <div class="section-header compact">
      <p class="overline">Playable now</p>
      <h2 id="game-catalog-title">Catalog entries</h2>
    </div>
    <div class="game-grid">
      ${games.map(renderGameCard).join("")}
    </div>
  </section>`;
}

function renderGameCard(game) {
  return `<article class="game-card">
    <div class="game-card-copy">
      <p class="overline">${escapeHtml(game.status)}</p>
      <h3>${escapeHtml(game.title)}</h3>
      <p class="game-subtitle">${escapeHtml(game.subtitle)}</p>
      <p>${escapeHtml(game.summary)}</p>
    </div>
    <ul class="game-tags" aria-label="${attr(`${game.title} tags`)}">
      ${game.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
    </ul>
    <ul class="game-detail-list">
      ${game.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
    </ul>
    <div class="game-actions">
      <a class="primary-link" href="${attr(game.liveUrl ?? game.path)}"${newTabAttrs(`Play ${game.title}`)}>Play</a>
      <a class="secondary-link" href="${attr(game.repoUrl)}"${newTabAttrs(`${game.title} source`)}>Source</a>
    </div>
  </article>`;
}

export function renderHomePage({
  siteProfile,
  channels,
  highlights,
  signals,
  aboutProfile,
  contacts = [],
  searchEntries = [],
}) {
  const body = `<section class="hero-section" aria-labelledby="home-title">
    <div class="hero-copy">
      <p class="overline">Research Console / Personal OS Hub</p>
      <h1 id="home-title">${escapeHtml(siteProfile.name)} / ${escapeHtml(siteProfile.brand)}</h1>
      <p class="motto">${escapeHtml(siteProfile.motto)}</p>
      <p class="lede">${escapeHtml(siteProfile.thesis)}</p>
      ${renderSignalStrip(signals)}
    </div>
    <aside class="route-ledger" aria-label="Route ledger">
      <div class="ledger-row">
        <span>Primary</span>
        <strong>${escapeHtml(siteProfile.domain)}</strong>
      </div>
      <div class="ledger-row">
        <span>Role</span>
        <strong>${escapeHtml(siteProfile.role)}</strong>
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

  ${renderSearchSection(searchEntries)}

  <section class="content-band profile-band" aria-labelledby="profile-title">
    <div class="section-header">
      <p class="overline">About</p>
      <h2 id="profile-title">${escapeHtml(aboutProfile.headline)}</h2>
    </div>
    <div class="profile-summary">
      <p>${escapeHtml(aboutProfile.summary)}</p>
      ${renderFocusPreview(aboutProfile)}
      <a class="secondary-link" href="/about/">Read the profile</a>
    </div>
  </section>

  <section class="content-band" aria-labelledby="channels-title">
    <div class="section-header">
      <p class="overline">Channel Index</p>
      <h2 id="channels-title">Seven channel routes, one durable front door.</h2>
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
    contacts,
    title: siteProfile.brand,
    description: siteProfile.tagline,
    canonicalPath: "/",
    body,
  });
}

export function renderAboutPage({ siteProfile, channels, aboutProfile, contacts = [] }) {
  const body = `<article class="about-page">
    <a class="back-link" href="https://${attr(siteProfile.domain)}/">Back to ${escapeHtml(siteProfile.domain)}</a>
    <header class="about-hero">
      <p class="overline">${escapeHtml(siteProfile.role)}</p>
      <h1>${escapeHtml(siteProfile.name)}</h1>
      <p class="lede">${escapeHtml(aboutProfile.summary)}</p>
    </header>
    <section class="about-grid" aria-labelledby="focus-title">
      <div class="section-header compact">
        <p class="overline">Current focus</p>
        <h2 id="focus-title">${escapeHtml(aboutProfile.headline)}</h2>
      </div>
      <div class="focus-list">
        ${aboutProfile.focusAreas
          .map(
            (area) => `<article>
              <span class="eyebrow">${escapeHtml(area.label)}</span>
              <p>${escapeHtml(area.body)}</p>
            </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="about-grid" aria-labelledby="principles-title">
      <div class="section-header compact">
        <p class="overline">Operating style</p>
        <h2 id="principles-title">Artifacts, evidence, and stable routes.</h2>
      </div>
      <ol class="principle-list">
        ${aboutProfile.principles.map((principle) => `<li>${escapeHtml(principle)}</li>`).join("")}
      </ol>
    </section>
    <section class="contact-section" aria-labelledby="contact-title">
      <div class="section-header compact">
        <p class="overline">Contact</p>
        <h2 id="contact-title">Open a new route.</h2>
      </div>
      <div class="contact-grid">
        ${contacts.map((contact) => renderContactLink(contact, "contact-link")).join("")}
      </div>
    </section>
  </article>`;

  return renderLayout({
    siteProfile,
    channels,
    contacts,
    title: "About",
    description: aboutProfile.summary,
    canonicalPath: "/about/",
    body,
  });
}

export function renderChannelPage({ siteProfile, channel, channels, games = [], contacts = [] }) {
  const channelContext = channel.status === "Live" ? "Current channel" : "Future host";
  const channelIndex = Math.max(
    channels.findIndex((item) => item.slug === channel.slug),
    0,
  );
  const body = `<article class="channel-page">
    <a class="back-link" href="https://${attr(siteProfile.domain)}/">Back to ${escapeHtml(siteProfile.domain)}</a>
    <header class="channel-hero">
      <div class="channel-hero-copy">
        <p class="overline">${escapeHtml(channel.status)} / ${escapeHtml(channelContext)}</p>
        <h1>${escapeHtml(channel.title)}</h1>
        <p class="lede">${escapeHtml(channel.summary)}</p>
        ${routeTag(channel)}
      </div>
      ${renderChannelSpecCard(channel, channelIndex)}
    </header>
    ${channel.slug === "game" ? renderGameCatalog(games) : ""}
    <section class="channel-detail" aria-labelledby="planned-title">
      <div class="section-header">
        <p class="overline">${escapeHtml(statusCopy[channel.status] ?? "reserved")}</p>
        <h2 id="planned-title">What belongs here</h2>
      </div>
      <ul class="planned-list">
        ${channel.planned.map(renderPlannedItem).join("")}
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
              `<a href="${attr(channelUrl(item))}"><span>${escapeHtml(item.slug)}</span><strong>${escapeHtml(item.title)}</strong></a>`,
          )
          .join("")}
      </div>
    </section>
  </article>`;

  return renderLayout({
    siteProfile,
    channels,
    contacts,
    title: channel.title,
    description: channel.summary,
    canonicalPath: channelUrl(channel),
    body,
  });
}

export function renderNotFoundPage({ siteProfile, channels, contacts = [] }) {
  const body = `<section class="not-found" aria-labelledby="not-found-title">
    <p class="overline">404 / Missing route</p>
    <h1 id="not-found-title">This page is not in the index.</h1>
    <p class="lede">The public map is intentionally small right now. Return to the front door or choose one of the reserved channels.</p>
    <div class="small-route-grid">
      ${channels
        .map(
          (channel) =>
            `<a href="${attr(channelUrl(channel))}"><span>${escapeHtml(channel.slug)}</span><strong>${escapeHtml(channel.title)}</strong></a>`,
        )
        .join("")}
    </div>
    <a class="primary-link" href="/">Return home</a>
  </section>`;

  return renderLayout({
    siteProfile,
    channels,
    contacts,
    title: "404",
    description: "Missing route in the Why Not Sleep public index.",
    canonicalPath: "/404.html",
    body,
  });
}
