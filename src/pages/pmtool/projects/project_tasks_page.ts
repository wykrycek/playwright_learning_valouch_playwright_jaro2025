import { type Locator, type Page, expect } from "@playwright/test";
import { LoginPage } from "../login_page.ts";
import { ProjectInfoPage } from "./project_info_page.ts";

export class ProjectTasksPage {
    readonly page: Page;
    readonly profileButton: Locator;
    readonly logoutButton: Locator;
    private readonly pageHeader: Locator;
    private readonly projectInfoButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.profileButton = page.locator("#user_dropdown");
        this.logoutButton = page.locator("#logout");
        this.pageHeader = page.locator("h3.page-title");
        this.projectInfoButton = page.locator(".navbar-header a.navbar-brand");
    }

    async headerHasText(headerText: string): Promise<ProjectTasksPage> {
        await expect.soft(this.pageHeader).toHaveText(headerText);
        return this;
    }

    async clickProfile(): Promise<ProjectTasksPage> {
        await this.profileButton.click();
        return this;
    }

    async clickLogout(): Promise<LoginPage> {
        await this.logoutButton.click();
        return new LoginPage(this.page);
    }

    async clickProjectInfo(): Promise<ProjectInfoPage> {
        await this.projectInfoButton.click();
        return new ProjectInfoPage(this.page);
    }
}