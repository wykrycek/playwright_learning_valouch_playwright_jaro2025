/*

Vytvořte nový test, který provolá POST request s body:
Složka: tests/exercises
Test: api_request_body_exercise.spec.ts
Url: https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register
Metoda: POST
Body:
{
    "username": "Kristopher.Howe",
    "password": "123456",
    "email": "Addison_Emard@example.net"
}

Data pro body vygeneruj pomocí faker.

*/

import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('API Request Body call', async ({ request }) => {
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.email();

    const response = await request.post("https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
        {
            data: {
                username,
                password,
                email,
            },
        }
    );

    expect(await response.json()).toHaveProperty('message', 'User registred');
});