/*

Vytvořte nový test, který vyplní formulář na adrese: https://tredgate.com/webtrain/contact.html

V testu:
Vyplňte všechna pole
Vyberte roli
Zaklikněte subscribe to newsletter
Po odeslání zkontrolujte viditelnost potvrzující zprávy


/*/


import { test, expect } from '@playwright/test';

test('Excercises form', async ({ page }) => {

    await page.goto("https://tredgate.com/webtrain/contact.html");
    //data-testid="input-name"
    await page.locator('[data-testid="input-name"]').fill('Petr Hňahňa');
    //data-testid="input-email"
    await page.locator('[data-testid="input-email"]').fill('Petr.Hlachl@tredgate');
    //data-testid="input-contact-date"
    await page.locator('[data-testid="input-contact-date"]').fill('2023-08-23');
    //data-testid="select-role"
    //value="student"
    await page.locator('[data-testid="select-role"]').selectOption('student');
    //data-testid="textarea-comments"
    await page.locator('[data-testid="textarea-comments"]').fill('Petr Hňahňa');
    //data-testid="checkbox-newsletter"
    await page.locator('[data-testid="checkbox-newsletter"]').check();
    //data-testid="button-submit"
    await page.locator('[data-testid="button-submit"]').click();
    await expect(page.locator('[data-testid="success-box"]')).toBeVisible();
});