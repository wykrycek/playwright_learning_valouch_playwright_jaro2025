import { test } from '@playwright/test';
import { LoginPage } from '../../../src/pages/pmtool/login_page.ts';

test('Fluent API - login and logout Test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage
        .openPmtool()
        .then((loginPage) => loginPage.typeUsername("pw_skoleni"))
        .then((loginPage) => loginPage.typePassword("TEG2023"))
        .then((loginPage) => loginPage.clickLogin())
        .then((dashboardPage) => dashboardPage.clickProfile())
        .then((dashboardPage) => dashboardPage.clickLogout());
});