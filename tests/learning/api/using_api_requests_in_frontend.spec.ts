// using_api_requests_in_frontend.spec.ts;

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API to App", async ({ page, request }) => {

    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.email();

    await request.post("http://localhost:3000/user/register", {
        data: {
            username,
            password,
            email,
        },
    });

    const loginResponse = await request.post("http://localhost:3000/auth/login", {
        data: {
            username,
            password,
        },
    });

    const loginBody = await loginResponse.json();
    const accessToken = loginBody.access_token;
    const refreshToken = loginBody.refresh_token;

    // * Nastavení Cookie v prohlížeči přes page.context().addCookies
    await page.context().addCookies([
        {
            name: "access_token",
            value: accessToken,
            domain: "localhost",
            path: "/",
        },
        {
            name: "refresh_token",
            value: refreshToken,
            domain: "localhost",
            path: "/",
        },
    ]);

    // ? Jelikož jsme vložili token do cookies prohlížeče, nemusíme se v něm již přihlašovat
    await page.goto("http://localhost:3001/app");
    await expect(page.locator('[data-testid="logout_button"]')).toBeVisible();

});
