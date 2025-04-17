import { faker } from "@faker-js/faker";
import test from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test('Create project and logout', async ({ page }) => {
    const projectName = faker.company.name();
    const loginPage = new LoginPage(page);

    await loginPage.openPmtool()
        .then((loginPage) => loginPage.login("pw_skoleni", "TEG2023"))
        .then((dashboardPage) => dashboardPage.clickProjects())
        .then((projectsPage) => projectsPage.clickAddProject())
        .then((createNewProjectModal) => createNewProjectModal.typeName(projectName))
        .then((createNewProjectModal) => createNewProjectModal.clickSave())
        .then((projectTaskPage) => projectTaskPage.clickProfile())
        .then((projectTaskPage) => projectTaskPage.clickLogout());
})
