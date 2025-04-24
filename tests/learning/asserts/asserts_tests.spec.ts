//asserts_tests.spec.ts
// asserts

import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing with Playwright", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openPmtool()
            .then((loginPage) => loginPage.login("pw_skoleni", "TEG2023"));
    })
    
    test("toContainText Test", async ({ page }) => {
        await expect(page.locator("#welcome-page-header")).toContainText("Vítej v testovací aplikaci Tredgate Project");
    });

    test.skip("FAILING: toContainText Test", async ({ page }) => {
        await expect(page.locator("#welcome-page-header")).toContainText(
        "Vítej v testovací aplikaci BLBOST"
        );
    });

    test("toHaveTextTest", async ({ page }) => {
        await expect(page.locator("#welcome-page-header")).toHaveText(
        "Vítej v testovací aplikaci Tredgate Project"
        );
    });

    test("toBeVisible", async ({ page }) => {
        await expect(page.locator(".logo img")).toBeVisible();
    });

    test("toHaveValue", async ({ page }) => {
        const dashboadPage = new DashboardPage(page);
        await dashboadPage.clickProjects();

        const assertText = "TESTOVÁ APLIKACE";

        await page.locator('[test_id="search_input"]').fill(assertText);
        await expect(page.locator('[test_id="search_input"]')).toHaveValue(
            assertText
        );
    });

    // soft assert
    test("SOft Assert Test", async ({ page }) => {
        const dashboadPage = new DashboardPage(page);
        await expect
            .soft(page.locator("#welcome-page-header"))
            .toHaveText("Vítej v testovací aplikaci"
        );

        await dashboadPage
            .clickProfile()
            .then((dashboadPage) => dashboadPage.clickLogout()
        );
    });
});

test.describe("Login page", () => {
    test("Negative Assert", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openPmtool();

        await expect(page.locator(".alert")).not.toBeVisible();
    });

    test("Page Objects asserts", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openPmtool()
            .then((loginPage) => loginPage.pageHeaderHasText("Login")
        );
    });
});
