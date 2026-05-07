export const siteProfile = {
  name: "Winston",
  brand: "Why Not Sleep",
  domain: "whynotsleep.cc",
  githubUser: "iwannabewater",
  githubUrl: "https://github.com/iwannabewater",
  tagline: "A researcher-builder index for systems, games, notes, manuscripts, design, and life records.",
  thesis:
    "Why Not Sleep is the public routing layer for long-form engineering work, playable experiments, project notes, and personal archives. The first release is intentionally quiet: durable links first, content systems next.",
  availability: "Preparing public archives channel by channel",
  locationLabel: "Asia/Shanghai",
};

export const channels = [
  {
    slug: "blog",
    title: "Technical Blog",
    host: "blog.whynotsleep.cc",
    path: "/channels/blog/",
    status: "Preparing",
    summary:
      "Long-form technical essays for engineering narratives, AI systems notes, implementation diaries, and research-adjacent learning records.",
    planned: [
      "Architecture notes from real projects",
      "AI systems reading and implementation logs",
      "Deployment and tooling postmortems",
      "Long-form essays with citations and reproducible commands",
    ],
    signal: "Essays",
  },
  {
    slug: "game",
    title: "Game Index",
    host: "game.whynotsleep.cc",
    path: "/channels/game/",
    status: "Reserved",
    summary:
      "Playable browser games and interactive experiments collected as a calm arcade, with each entry documented like a small product.",
    planned: [
      "Browser-playable game catalog",
      "Build notes and design constraints",
      "Controls, screenshots, and changelog entries",
      "Future standalone game deployments",
    ],
    signal: "Play",
  },
  {
    slug: "project",
    title: "Project Index",
    host: "project.whynotsleep.cc",
    path: "/channels/project/",
    status: "Preparing",
    summary:
      "Engineering projects, demos, tools, repositories, and case-study writeups organized by problem, implementation, and proof.",
    planned: [
      "Static tools and frontend applications",
      "Repository links with implementation notes",
      "Before-and-after case studies",
      "Small systems that deserve their own route",
    ],
    signal: "Builds",
  },
  {
    slug: "manuscript",
    title: "Manuscripts",
    host: "manuscript.whynotsleep.cc",
    path: "/channels/manuscript/",
    status: "Indexing",
    summary:
      "Report-like documents, PDF-ready technical writing, white papers, and polished deep dives that need stronger structure than a blog post.",
    planned: [
      "Technical reports and long documents",
      "PDF and HTML publication pairs",
      "Source notes and evidence maps",
      "Versioned writing artifacts",
    ],
    signal: "Reports",
  },
  {
    slug: "design",
    title: "Design Studies",
    host: "design.whynotsleep.cc",
    path: "/channels/design/",
    status: "Reserved",
    summary:
      "Visual systems, UI explorations, layout studies, and small portfolio pieces where the design decision is the subject.",
    planned: [
      "Interface studies and visual systems",
      "Design-system experiments",
      "Before-and-after layout notes",
      "Screenshots with reasoning, not decoration",
    ],
    signal: "Form",
  },
  {
    slug: "note",
    title: "Notes",
    host: "note.whynotsleep.cc",
    path: "/channels/note/",
    status: "Reserved",
    summary:
      "Short knowledge-base fragments, reading notes, command references, bookmarks, and compact reminders that stay useful over time.",
    planned: [
      "Short technical references",
      "Reading lists and source maps",
      "Command snippets with context",
      "Compact notes that can later grow into essays",
    ],
    signal: "Fragments",
  },
  {
    slug: "life",
    title: "Life Log",
    host: "life.whynotsleep.cc",
    path: "/channels/life/",
    status: "Reserved",
    summary:
      "Personal living records: daily observations, photos, travel, media, and lighter sharing kept in an archive instead of a feed race.",
    planned: [
      "Daily moments and small observations",
      "Photo-led travel or city notes",
      "Media, food, and personal taste logs",
      "A slower alternative to social-feed posting",
    ],
    signal: "Living",
  },
];

export const highlights = [
  {
    label: "Manuscript queue",
    title: "Technical long-form archive",
    body:
      "Existing local manuscripts can be promoted into the manuscript channel once their public URLs and source notes are finalized.",
    path: "/channels/manuscript/",
  },
  {
    label: "Game route",
    title: "Playable work has a dedicated shelf",
    body:
      "Games are treated as first-class artifacts: entry pages, control notes, version history, and room for future standalone deploys.",
    path: "/channels/game/",
  },
  {
    label: "Project route",
    title: "Engineering demos over vague portfolios",
    body:
      "Project cards will favor constraints, implementation choices, screenshots, and links over decorative self-description.",
    path: "/channels/project/",
  },
];

export const signals = [
  "AI systems",
  "Static publishing",
  "Browser games",
  "Technical writing",
  "Design systems",
  "Personal archive",
];
