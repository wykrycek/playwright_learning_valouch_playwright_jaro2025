import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/pmtool/login_page.ts';

test.describe('Tag Exercise', () => {
    test("Pmtool Login", {
        tag: "@exercise"
    }, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage
            .openPmtool()
            .then((login) => login.login("pw_skoleni", "TEG2023"));
    });
});