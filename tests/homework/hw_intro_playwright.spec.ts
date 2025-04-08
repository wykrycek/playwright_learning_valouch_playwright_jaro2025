/*
Otevře Tredgate Eshop: https://tredgate.com/eshop/
Pomocí search pole vyhledá text: iPhone (lokátor: [name="search"])
Stiskne tlačítko s lupou (lokátor: #search [type="button"])
Otevře detail iPhone (lokátor: //a[text()="iPhone"])
Vloží iPhone do košíku (lokátor: #button-cart)
*/

import { test } from '@playwright/test';

test('#1 HomeWork - Intro to Playwright', async ({ page }) => {

    await page.goto('https://tredgate.com/eshop/');
    await page.locator('[name="search"]').fill('iPhone');
    await page.locator('#search [type="button"]').click();
    await page.locator('//a[text()="iPhone"]').click();
    await page.locator('#button-cart').click();
    
});