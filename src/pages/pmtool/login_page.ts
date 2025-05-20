//login_page.ts
// src/pages/pmtool

import { test, type Locator, type Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
    // 1. Identifikace provkůa dalších properties
    private readonly page: Page;
    private readonly url = "https://tredgate.com/pmtool/";
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly lostPasswordAnchor: Locator;
    private readonly pageHeader: Locator;

    // 2. Constructor, ve kterém nastavíme jednotlivé lokátory
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator(".btn");
        this.lostPasswordAnchor = page.locator("#forget_password");
        this.pageHeader = page.locator("h3.form-title");
    }

    // 3. Ovládací metody
    // Při vytváření metod doporučím přístup začít s atomickými (malými) metodami s jedním krokem a pak vytvářet sdružující metody
    // Například: typeUsername - jeden krok, login - sdružení více kroků
    // Atomické metody používáme, když danou funkcionalitu testujeme a sdružující metody například pro preconditions jiných testů

    async typeUsername(username: string): Promise<LoginPage> {
        await this.usernameInput.fill(username);
        return this;
    }

    async typePassword(password: string): Promise<LoginPage> {
        await this.passwordInput.fill(password);
        return this;
    }
    async clickLogin(): Promise<DashboardPage> {
        await this.loginButton.click();
        return new DashboardPage(this.page);
    }

    // klik na Lost Password (lokátor #forget_password)
    async clickPasswordForgotten(): Promise<LostPasswordPage> {
        await this.lostPasswordAnchor.click();
        return new LostPasswordPage(this.page);
    }

    async openPmtool(): Promise<LoginPage> {
        await this.page.goto(this.url);
        return this;
    }

    async pageHeaderHasText(headerText: string): Promise<LoginPage> {
        await expect(this.pageHeader).toHaveText(headerText);
        return this;
    }

    async appHeaderHasText(headerText: string): Promise<LoginPage> {
        await expect.soft(this.pageHeader).toHaveText(headerText);
        return this;
    }


    // sdružující metoda
    async login(username: string, password: string): Promise<DashboardPage> {
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.clickLogin();
        return new DashboardPage(this.page);
    }

    async openAndLogin(username: string, password: string): Promise<DashboardPage> {
        test.step("Otevření Pmtool", async () => {
            await this.openPmtool();
        });

        test.step("Přihlášení do Pmtool", async () => {
            await this.login(username, password);
        });

        return new DashboardPage(this.page);
    }
}