/*
Vytvoř nový test na Automation Test Store:  https://automationteststore.com/ 

Složka: tests/challenges
Soubor: navigation_challenge.spec.ts

V testu:
Otevři domovskou stránku Automation Test Store.
Pomocí vyhledávacího pole vyhledej:
Jersey Cotton Striped Polo Shirt
Otevři první výsledek.
*/

import { test, expect } from '@playwright/test';

test('#2 challenge', async ({ page }) => {

    await page.goto('https://automationteststore.com/');
    await page.locator('#filter_keyword').fill('Jersey Cotton Striped Polo Shirt');
    
});