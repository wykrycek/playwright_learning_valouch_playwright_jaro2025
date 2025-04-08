// random_data_generation.spec.ts

import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';

test("Testing data generation by Faker", async ({ page }) => {
    await page.goto("/");
    // vygenerovat Jméno, Příjmení, uživatelské jméno, heslo, e-mailovou adresu z jména a přijmení
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName });
    const password = faker.internet.password();
    const email = faker.internet.exampleEmail({ firstName, lastName });
    const address = faker.location.streetAddress();

    console.log(`
        Jméno: ${firstName}
        Příjmení: ${lastName}
        Uživatelské jméno: ${username}
        Heslo: ${password}
        E-mailovou adresu: ${email}
        Adresa: ${address}
    `);
});
