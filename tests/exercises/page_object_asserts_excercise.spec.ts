import test from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";


test("Excercice: Dashboard Header Check", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
        .openPmtool()
        .then((loginPage) => loginPage.login("pw_academy", "Playwright321!"))
        .then((dashboard) => dashboard.profileButtonIsVisible())
        .then((dashboard) => dashboard.appNameHeaderHasText("TEG Project Management"));
});