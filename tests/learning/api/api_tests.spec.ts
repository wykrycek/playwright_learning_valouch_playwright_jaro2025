//api_tests.spec.ts
// složka: learning/api

import { test } from "@playwright/test";

test.describe("API Tests", () => {
    test('GET Request', async ({ request }) => {
        await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
    });

    test("GET Request with Parameter", async ({ request }) => {
        await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
            {
                params: {
                    userId: 3,
                },
            }
        );
    });

    test("GET Request with Header", async ({ request }) => {
        await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
            {
                headers: {
                    train: "hlavinka",
                },
            }
        );
    });

    test("POST Request with Body", async ({ request }) => {
        await request.post(
        "https://tegb-backend-877a0b063d29.herokuapp.com/train/body",
            {
                data: {
                    stringProperty: "test",
                    numberProperty: 123,
                    booleanProperty: true,
                },
            }
        );
    });
});
