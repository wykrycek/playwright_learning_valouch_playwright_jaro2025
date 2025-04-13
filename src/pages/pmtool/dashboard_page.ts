/*

Page Object bude obsahovat:
Klik na profilovou sekci (clickProfile), lokátor: #user_dropdown
Klik na odhlášení (clickLogout), lokátor: #logout

*/

import { type Page, type Locator } from '@playwright/test';
import { LoginPage } from './login_page.ts';

export class DashboardPage {
    private readonly page: Page;
    private readonly profileSection: Locator;
    private readonly logoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator("#user_dropdown");
        this.logoutButton = page.locator("#logout");
    }
    async clickProfile(): Promise<DashboardPage> {
        await this.page.waitForSelector("#user_dropdown");
        await this.profileSection.click();
        return this;
    }
    async clickLogout(): Promise<LoginPage> {
        await this.logoutButton.click();
        return new LoginPage(this.page);
    }
}