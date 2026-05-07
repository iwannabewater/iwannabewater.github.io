import { test, expect } from "@playwright/test";
import { channels } from "../../src/site-data.mjs";

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test("homepage renders on desktop without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Winston / Why Not Sleep");
  await expect(page.getByText("Larger than life")).toBeVisible();
  await expect(page.getByRole("link", { name: /Read the profile/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Read the profile/i })).toHaveCSS("font-family", /Comic Sans|Comic Neue|Chalkboard|Marker Felt|cursive/);
  await expect(page.getByRole("link", { name: /GitHub opens in a new tab/i })).toHaveAttribute("target", "_blank");
  const navLinks = page.getByRole("navigation", { name: "Primary" }).getByRole("link");
  await expect(navLinks.last()).toHaveText("about");
  await expect(page.locator(".channel-card", { hasText: "Game Index" })).toHaveAttribute("href", "https://game.whynotsleep.cc/");
  await expect(page.locator(".module-number").first()).toHaveCSS("font-variant-numeric", /tabular-nums/);
  await page.getByLabel("Search the site").fill("Nini");
  await expect(page.locator(".search-result", { hasText: "NiniWithYuan" })).toBeVisible();
  await page.getByRole("button", { name: "Switch reading mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  await expectNoHorizontalOverflow(page);
  const texture = await page.locator(".paper-grain").evaluate((node) => getComputedStyle(node).backgroundImage);
  expect(texture).toContain("paper-grain.png");
});

test("homepage renders on mobile without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("channel page has one h1 and no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const channel of channels) {
    await page.goto(channel.path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(channel.title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".channel-spec-card")).toContainText(channel.host);
    await expect(page.locator(".channel-spec-card .module-number")).toBeVisible();
    await expect(page.locator(".planned-list li")).toHaveCount(channel.planned.length);
    await expectNoHorizontalOverflow(page);
  }
});

test("about page renders profile and contact routes", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/about/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Winston");
  await expect(page.getByText("Agentic RL")).toBeVisible();
  const contactSection = page.locator(".contact-section");
  await expect(contactSection.getByRole("link", { name: /Email opens in a new tab/i })).toHaveAttribute("target", "_blank");
  await expectNoHorizontalOverflow(page);
});

test("game channel exposes NiniWithYuan without assuming it is the only game", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/channels/game/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Game Index");
  await expect(page.getByRole("heading", { name: "Catalog entries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "NiniWithYuan" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Play NiniWithYuan opens in a new tab/i })).toHaveAttribute("href", "https://game.whynotsleep.cc/niniwithyuan/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://game.whynotsleep.cc/");
  await expectNoHorizontalOverflow(page);
});
