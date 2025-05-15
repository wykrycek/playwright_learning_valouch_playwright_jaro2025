/*
Vytvořte nový test, který otestuje request:
Složka: tests/exercise
Test: api_request_asserts_exercise.spec.ts
Url: https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4

Zkontrolujte:
Body obsahuje property:
    userId
Typ properties:
    active: number
Hodnoty:
    username == petrfifka

Body:
{
    "userId": 4,
    "username": "petrfifka",
    "email": "petr.fifka@tredgate.cz",
    "createdAt": "2023-10-24",
    "updatedAt": null,
    "active": 1
}
*/

import { expect, test } from '@playwright/test';

test('API Request Body call', async ({ request }) => {
    const response = await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4");
    const body = await response.json();
    
    expect(body).toHaveProperty("userId");
    expect(typeof body.active).toBe("number");
    expect(body.username).toBe("petrfifka");
});