export const siteProfile = {
  name: "Winston",
  brand: "Why Not Sleep",
  domain: "whynotsleep.cc",
  githubUser: "iwannabewater",
  githubUrl: "https://github.com/iwannabewater",
  email: "iwannabewater@gmail.com",
  xUrl: "https://x.com/lilmochimo01",
  telegramUrl: "https://t.me/lilmochimo",
  tagline:
    "A researcher-builder index for large-model systems, multimodal post-training, playable experiments, notes, manuscripts, and life records.",
  thesis:
    "Why Not Sleep is the public routing layer for long-form engineering work, playable experiments, project notes, and personal archives. It favors durable links, reproducible context, and finished artifacts over feed-shaped noise.",
  availability: "Public routes active; archives expanding channel by channel",
  locationLabel: "Asia/Shanghai",
  role: "Large-model / multimodal algorithm engineer",
};

export const aboutProfile = {
  headline: "Large-model systems, multimodal post-training, and agentic optimization.",
  summary:
    "Winston is a large-model and multimodal algorithm engineer focused on post-training for LLM/MM systems, agentic reinforcement learning, and generative search advertising and recommendation. This site is the public index for technical writing, games, project notes, design studies, manuscripts, and slower personal records.",
  focusAreas: [
    {
      label: "LLM/MM post-training",
      body:
        "Preference optimization, instruction following, multimodal alignment, evaluation loops, and data recipes that make model behavior measurable.",
    },
    {
      label: "Agentic RL",
      body:
        "Training and evaluation patterns for agents that plan, use tools, recover from errors, and improve through interaction instead of static prompting alone.",
    },
    {
      label: "Generative search ads and recommendations",
      body:
        "Retrieval, ranking, generation, auction-aware objectives, user intent modeling, and feedback systems for search and recommendation surfaces.",
    },
  ],
  principles: [
    "Treat claims as artifacts: show constraints, evidence, failure modes, and trade-offs.",
    "Keep public routes stable so projects, notes, and games can mature without link churn.",
    "Design interfaces with calm density: scannable, direct, and useful under repeated visits.",
  ],
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
    status: "Live",
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
    label: "About",
    title: "Work centered on post-training and agentic systems",
    body:
      "The profile page now states the current research and engineering focus without turning the home page into a resume.",
    path: "/about/",
  },
  {
    label: "Playable now",
    title: "NiniWithYuan is part of the game shelf",
    body:
      "The game channel is structured as a catalog, so NiniWithYuan is the first entry instead of a one-off navigation exception.",
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
  "LLM/MM post-training",
  "Agentic RL",
  "Generative search ads",
  "Recommendation systems",
  "Static publishing",
  "Browser games",
];

export const games = [
  {
    slug: "nini-with-yuan",
    title: "NiniWithYuan",
    subtitle: "Nini & Yuan's Adventures",
    status: "Playable",
    path: "/NiniWithYuan/",
    liveUrl: "https://whynotsleep.cc/NiniWithYuan/",
    fallbackUrl: "https://iwannabewater.github.io/NiniWithYuan/",
    repoUrl: "https://github.com/iwannabewater/NiniWithYuan",
    summary:
      "A dual-character browser adventure with chapter selection, mobile controls, automatic saves, and an offline-friendly PWA shell.",
    details: [
      "Served as a GitHub Pages project under the same custom domain path.",
      "Kept inside a game catalog so future playable work can be added without redesigning the channel.",
      "Documented with live play and source links for both users and engineers.",
    ],
    tags: ["Browser game", "Canvas", "PWA", "Mobile controls"],
  },
];

export const contacts = [
  {
    id: "github",
    label: "GitHub",
    href: siteProfile.githubUrl,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${siteProfile.email}`,
  },
  {
    id: "x",
    label: "X.com",
    href: siteProfile.xUrl,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: siteProfile.telegramUrl,
  },
];
