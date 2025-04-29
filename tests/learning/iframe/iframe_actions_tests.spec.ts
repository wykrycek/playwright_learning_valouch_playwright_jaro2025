//iframe_actions_tests.spec.ts
// složka: iframe

import { expect, test } from "@playwright/test";

test("iFrame Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Akce v iFrame");
  expect(await frame.locator("#name").inputValue()).toBe("Akce v iFrame");
});
