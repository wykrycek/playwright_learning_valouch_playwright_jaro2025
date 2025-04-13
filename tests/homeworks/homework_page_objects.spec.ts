/*

#8 Homework: Page Objects

Vytvořte test s pomocí page objectů, který:
Otevře eshop.
Otevře registraci (klik na MyAccount ikonu (panáček) a potom na klik na Register).
Vyplní registrační formulář (JEN textová pole).
Klikne na tlačítko submit (vypíše se chyba, že nejsou vyplněná všechna pole, ale to nevadí.
Po dokončení úkolu, vytvořte Pull Request na lektora.

Selektory:
My Account: #top-links a i.fa-user
Register: .dropdown-menu a[href="https://tredgate.com/eshop/index.php?route=account/register&quot;]
First Name Input: #input-firstname
Last Name Input: #input-lastname
E-mail Input: #input-email
Telephone Input: #input-telephone
Password Input: #input-password
Password Confirm: #input-confirm
Continue Button: input[type="submit"]
*/

import { test/*, expect */ } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { EshopPage } from "../../src/pages/testgate-eshop/eshop_page.ts";

function getTestData() {
    const data = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        telephone: faker.phone.number(),
        password: faker.internet.password(),
        email: '',
        passwordConfirm: ''
    };
    data.email = faker.internet.exampleEmail({ firstName: data.firstName, lastName: data.lastName });
    data.passwordConfirm = data.password;
    return data;
}

test('Process registration: #1 - step by step', async ({ page }) => {
    const userData = getTestData();
    
    const eshopPage = new EshopPage(page);
    await eshopPage.openEshop();
    const registrationPage = await eshopPage.openRegistrationPage()
        .then(registrationPage => registrationPage.fillFirstName(userData.firstName))
        .then(registrationPage => registrationPage.fillLastName(userData.lastName))
        .then(registrationPage => registrationPage.fillEmail(userData.email))
        .then(registrationPage => registrationPage.fillTelephone(userData.telephone))
        .then(registrationPage => registrationPage.fillPassword(userData.password))
        .then(registrationPage => registrationPage.fillPasswordConfirm(userData.passwordConfirm))
        //.then(registrationPage => registrationPage.checkAgree())
        .then(registrationPage => registrationPage.clickContinueButton());

    // except https://tredgate.com/eshop/index.php?route=account/success
    // await expect(registrationPage.page).toHaveURL('https://tredgate.com/eshop/index.php?route=account/success');

    // empty acction for const registrationPage
    await registrationPage.clickContinueButton();

    // const alert = await pageEshop.page.locator('.alert').textContent();
    // console.log(alert);
});



test('Process registration: #2 - all fields', async ({ page }) => {
    const userData = getTestData();

    const eshopPage = new EshopPage(page);
    await eshopPage.openEshop();
    const registrationPage = await eshopPage.openRegistrationPage()
        .then(registrationPage => registrationPage.fillAllFields(userData.firstName, userData.lastName, userData.email, userData.telephone, userData.password, userData.passwordConfirm));

    // except https://tredgate.com/eshop/index.php?route=account/success
    // await expect(registrationPage.page).toHaveURL('https://tredgate.com/eshop/index.php?route=account/success');

    // empty acction for const registrationPage
    await registrationPage.clickContinueButton();
});