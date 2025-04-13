/*
Eshop url: https://tredgate.com/eshop/

objekt bude vytvářet a spravovat Page eshopu
*/

import { type Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";

export class EshopPage {
    public readonly page: Page;
    private readonly url = "https://tredgate.com/eshop/";

    constructor(page: Page) {
        this.page = page;
    }

    async openEshop(): Promise<EshopPage> {
        await this.page.goto(this.url);
        return this;
    }

    async openRegistrationPage(): Promise<RegistrationPage> {
        await this.page.locator("#top-links a i.fa-user").click()
            .then(() => this.page.waitForSelector(".dropdown-menu a[href=\"https://tredgate.com/eshop/index.php?route=account/register\"]"))
            .then(() => this.page.locator(".dropdown-menu a[href=\"https://tredgate.com/eshop/index.php?route=account/register\"]").click());

        return new RegistrationPage(this.page);
    }
}