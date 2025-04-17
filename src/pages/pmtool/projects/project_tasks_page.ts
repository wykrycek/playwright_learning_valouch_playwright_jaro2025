import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "../login_page.ts";

export class ProjectTasksPage {
    readonly page: Page;
    readonly profileButton: Locator;
    readonly logoutButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.profileButton = page.locator("#user_dropdown");
        this.logoutButton = page.locator("#logout");
    }

    async clickProfile(): Promise<ProjectTasksPage> {
        await this.profileButton.click();
        return this;
    }

    async clickLogout(): Promise<LoginPage> {
        await this.logoutButton.click();
        return new LoginPage(this.page);
    }
}