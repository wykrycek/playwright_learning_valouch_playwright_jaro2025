/*
Cvičení: Základní vizuální test(⌛5:00)
Vytvořte vizuální test na kontaktní formulář: https://tredgate.com/webtrain/contact.html
Test spusťte tak, aby byl úspěšný.

Složka: tests/exercises
Soubor: exercise_simple_visual_test.spec.ts
*/

import { expect, test } from '@playwright/test';

test('Tredgate -  Visual Test - Contact', async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/contact.html");
    await expect(page).toHaveScreenshot("webtrain_contact.png");
});