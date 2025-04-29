import { Page } from "@playwright/test";
import { LoginPage } from "../login_page.ts";

export async function loginAndOpenProjects(
  page: Page,
  username: string,
  password: string
) {
  const loginPage = new LoginPage(page);
  return await loginPage
    .openAndLogin(username, password)
    .then((dashboard) => dashboard.clickProjects());
}