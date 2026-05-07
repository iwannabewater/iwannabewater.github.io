import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/ui",
  reporter: "line",
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview -- --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
