// env_secret_variables_tests.spec.ts
// tests/learning/env-variables

import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Login with environment variables (dotenv)", async ({ page }) => {
    const username = process.env.PMTOOL_USERNAME as string;
    const password = process.env.PMTOOL_PASSWORD as string;
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    const loginPage = new LoginPage(page);
    await loginPage.openAndLogin(username, password);
});