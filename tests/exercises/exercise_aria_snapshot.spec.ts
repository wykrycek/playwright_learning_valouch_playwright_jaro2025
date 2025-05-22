/*
Cvičení: Aria Snapshot(⌛5:00)
Vytvoř aria snapshot test na box: Info Dialog v WebTrain ARIA testing: https://tredgate.com/webtrain/aria-testing.html

Složka: tests / exercises
Název souboru: exercise_aria_snapshot.spec.ts
    */

import { expect, test } from '@playwright/test';

const boxAriaSnapshot = `- dialog "Info Dialog":
  - heading "Info Dialog" [level=3]
  - paragraph: This dialog provides additional information for accessibility testing.
  - button "Close dialog": Close`;

test('Tredgate - Aria Snapshot Test - Info Dialog', async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/aria-testing.html");
    await expect(page.locator("//div[@role='dialog']")).toMatchAriaSnapshot(boxAriaSnapshot);
});