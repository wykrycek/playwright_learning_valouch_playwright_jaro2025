
import { expect, test } from "@playwright/test";

test.describe("API Asserts", () => {
  test("Assert response status 200", async ({ request }) => {
    const response = await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4");
    expect(response.status()).toBe(200);
  });

  test("Assert Response Header", async ({ request }) => {
    const response = await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
    const headers = response.headers();
    expect(headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(headers["content-type"]).toContain("json");
  });

  test("Response Body Asserts", async ({ request }) => {
        const response = await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
        const body = await response.json();

        // * Kontroly
        // ? Kontroly obsahu
        expect(body.id).toBe(1);
        expect(body.message).toBe("TEG#B Training GET request successful");

        // ? Kontrola existence property
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("tiemstamp");
        expect(body).toHaveProperty("message");

        // ? Kontrola typu
        expect(typeof body.id).toBe("number");
        expect(typeof body.timestamp).toBe("string");
        expect(typeof body.message).toBe("string");

        // ? Kontrola hodnoty
        expect(body.id).toBeGreaterThanOrEqual(1);
        expect(body.id).toBeLessThanOrEqual(100);
    });
});
