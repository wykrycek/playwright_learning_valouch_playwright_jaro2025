import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test("Použití test.step", async ({ page }) => {
  await test.step("Přihlášení do Pmtool", async () => {
    const loginPage = new LoginPage(page);
    await loginPage
        .openPmtool()
        .then((login) => login.login("pw_skoleni", "TEG2023"));
  });

  await test.step("Odhlášení z Pmtool", async () => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage
        .clickProfile()
        .then((dashboard) => dashboard.clickLogout());
  });
});

test("Použití test.step in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"))
      .then((dashboard) => dashboard.clickProfile())
      .then((dashboard) => dashboard.logout());
});
