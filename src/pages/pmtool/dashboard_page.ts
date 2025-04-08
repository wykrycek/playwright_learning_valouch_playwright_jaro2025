/*

Page Object bude obsahovat:
Klik na profilovou sekci (clickProfile), lokátor: #user_dropdown
Klik na odhlášení (clickLogout), lokátor: #logout

*/

import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;
    private readonly profileSection: Locator;
    private readonly logoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator("#user_dropdown");
        this.logoutButton = page.locator("#logout");
    }
    async clickProfile() {
        await this.profileSection.click();
    }
    async clickLogout() {
        await this.logoutButton.click();
    }
}