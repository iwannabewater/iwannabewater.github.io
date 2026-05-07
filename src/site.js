(function () {
  const storageKey = "wns-theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");

  function currentTheme() {
    return root.dataset.theme === "night" ? "night" : "day";
  }

  function setTheme(theme) {
    if (theme === "night") {
      root.dataset.theme = "night";
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "night"));
    }
  }

  if (toggle) {
    toggle.setAttribute("aria-pressed", String(currentTheme() === "night"));
    toggle.addEventListener("click", () => {
      setTheme(currentTheme() === "night" ? "day" : "night");
    });
  }

  const searchRoot = document.querySelector("[data-site-search]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchDataNode = document.getElementById("site-search-data");

  if (!searchRoot || !searchInput || !searchResults || !searchDataNode) return;

  let entries = [];
  try {
    entries = JSON.parse(searchDataNode.textContent || "[]");
  } catch {
    entries = [];
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function resultTemplate(entry) {
    return `<a class="search-result" href="${escapeHtml(entry.url)}">
      <span>${escapeHtml(entry.category)}</span>
      <strong>${escapeHtml(entry.title)}</strong>
      <small>${escapeHtml(entry.url)}</small>
    </a>`;
  }

  function renderResults(query) {
    const needle = normalize(query);
    if (!needle) {
      searchResults.innerHTML = "";
      return;
    }

    const matches = entries
      .map((entry) => ({
        entry,
        haystack: normalize(`${entry.title} ${entry.category} ${entry.text} ${entry.url}`),
      }))
      .filter(({ haystack }) => needle.split(" ").every((part) => haystack.includes(part)))
      .slice(0, 6)
      .map(({ entry }) => entry);

    searchResults.innerHTML = matches.length
      ? matches.map(resultTemplate).join("")
      : `<div class="search-empty"><span>No match</span><strong>Try another route, topic, or game name.</strong></div>`;
  }

  searchInput.addEventListener("input", (event) => {
    renderResults(event.currentTarget.value);
  });
})();
