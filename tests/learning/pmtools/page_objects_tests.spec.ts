// page_objects_tests.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/pmtool/login_page';

test('Test Page Objects #1 (jedná metoda)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
    await loginPage.typeUsername("pw_academy");
    await loginPage.typePassword("Playwright321!");
    await loginPage.clickLogin();
});

test('Test Page Objects #2 (sdružující metoda)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
    await loginPage.login("pw_academy", "Playwright321!");
});
