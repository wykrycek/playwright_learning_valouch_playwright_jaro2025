import { test } from '@playwright/test';
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";


test('Lost password - E2E', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
        .openPmtool()
        .then((loginPage) => loginPage.clickPasswordForgotten())
        .then((lostPasswordPage) => lostPasswordPage.typeUsername("lost_password_user"))
        .then((lostPasswordPage) => lostPasswordPage.typeEmail("lost_password@tredgate.cz"))
        .then((lostPasswordPage) => lostPasswordPage.clickSend());
});

test('Lost password - enter and click back', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
        .openPmtool()
        .then((loginPage) => loginPage.clickPasswordForgotten())
        .then((lostPasswordPage) => lostPasswordPage.clickBack());
});