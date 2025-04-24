import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/pmtool/login_page.ts';
import { DashboardPage } from '../../src/pages/pmtool/dashboard_page.ts';
import { ProjectsPage } from '../../src/pages/pmtool/projects_page.ts';

test.describe("Pmtool", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openPmtool()
            .then((loginPage) => loginPage.login("pw_skoleni", "TEG2023"));
    });

    test("Add Project", async ({ page }) => {
        const dashboadProject = new DashboardPage(page)
            await dashboadProject.clickProjects()
            await expect(page.locator(".table-scrollable table")).toBeVisible();
            const projectsPage = new ProjectsPage(page)
            await projectsPage.clickAddProject()
            await expect(page.locator("div[data-testid='Name'] input")).toBeVisible();
            await expect(page.locator("button[type='submit']")).toHaveText("Save");
    });
});