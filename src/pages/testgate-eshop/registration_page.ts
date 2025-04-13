/*
My Account: #top-links a i.fa-user
Register: .dropdown-menu a[href="https://tredgate.com/eshop/index.php?route=account/register&quot;]

rozbalí dropdown menu, klikneme na Register a vrátí page registrace
*/

import { Locator, type Page } from "@playwright/test";


export class RegistrationPage {
    public readonly page: Page
    private readonly myAccountButton: Locator;
    private readonly registerButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountButton = page.locator("#top-links a i.fa-user");
        this.registerButton = page.locator(".dropdown-menu a[href=\"https://tredgate.com/eshop/index.php?route=account/register\"]");
        this.firstNameInput = page.locator("#input-firstname");
        this.lastNameInput = page.locator("#input-lastname");
        this.emailInput = page.locator("#input-email");
        this.telephoneInput = page.locator("#input-telephone");
        this.passwordInput = page.locator("#input-password");
        this.passwordConfirmInput = page.locator("#input-confirm");
        this.agreeCheckbox = page.locator("input[type=checkbox][name=agree]");
        this.continueButton = page.locator("input[type=\"submit\"]");
    }

    async goToRegistrationPage(): Promise<RegistrationPage> {
        await this.myAccountButton.click();
        await this.registerButton.click();
        return this;
    }

    // STEP-BY-STEP

    async fillFirstName(firstName: string): Promise<RegistrationPage> {
        await this.firstNameInput.fill(firstName);
        return this;
    }

    async fillLastName(lastName: string): Promise<RegistrationPage> {
        await this.lastNameInput.fill(lastName);
        return this;
    }

    async fillEmail(email: string): Promise<RegistrationPage> {
        await this.emailInput.fill(email);
        return this;
    }

    async fillTelephone(telephone: string): Promise<RegistrationPage> {
        await this.telephoneInput.fill(telephone);
        return this;
    }

    async fillPassword(password: string): Promise<RegistrationPage> {
        await this.passwordInput.fill(password);
        return this;
    }

    async fillPasswordConfirm(passwordConfirm: string): Promise<RegistrationPage> {
        await this.passwordConfirmInput.fill(passwordConfirm);
        return this;
    }

    async checkAgree(): Promise<RegistrationPage> {
        await this.agreeCheckbox.check();
        return this;
    }

    async clickContinueButton(): Promise<RegistrationPage> {
        await this.continueButton.click();
        return this;
    }


    // ALL AT ONCE

    async fillAllFields(firstName: string, lastName: string, email: string, telephone: string, password: string, passwordConfirm: string): Promise<RegistrationPage> {
        await this.fillFirstName(firstName)
            .then(() => this.fillLastName(lastName))
            .then(() => this.fillEmail(email))
            .then(() => this.fillTelephone(telephone))
            .then(() => this.fillPassword(password))
            .then(() => this.fillPasswordConfirm(passwordConfirm))
            //.then(() => this.checkAgree())
            .then(() => this.clickContinueButton());
        return this;
    }
}