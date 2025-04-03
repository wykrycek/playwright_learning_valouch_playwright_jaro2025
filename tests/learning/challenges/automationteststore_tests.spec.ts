/*
Otevřete stránku: https://automationteststore.com/index.php?rt=account/create 

Vyplňte:
First Name
Last Name
Klikněte na tlačítko Continue
*/

import { test, expect } from '@playwright/test';

test('#1 challenge', async ({ page }) => {

    await page.goto('https://automationteststore.com/index.php?rt=account/create');
    await page.locator('#AccountFrm_firstname').fill('Petr');
    await page.locator('#AccountFrm_lastname').fill('Valouch');

    // class btn && text Continue
    await page.locator('button:has-text("Continue")').click();
});