import { test, expect } from "@playwright/test";

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
  await page.goto("/channels/blog/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Technical Blog");
  await expect(page.locator("h1")).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
});
