// tests/learning/visual-testing

import { test, expect } from "@playwright/test";
import { path, __dirname } from "path";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Visual Tests", () => {
    test("Simple Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("simple_test.png");
    });

    test.skip("Failing Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        // ? Tento krok přidáme až po vygenerování snapshotu, abychom nasimulovali pád vizuálního testu
        await page.locator('[data-testid="double-click-box"]').dblclick();
        await expect(page).toHaveScreenshot("failing_test.png");
    });

    test("Full Page Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("full_page_test.png", { fullPage: true });
    });

    test("maxDiffPixelRation Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await page.locator('[data-testid="double-click-box"]').dblclick();
        await expect(page).toHaveScreenshot("low_sensitivity_test.png", {
            maxDiffPixelRatio: 0.2, // ? maximální rozdíl mezi screenshot = 20 % celkových pixelů
            // maxDiffPixels: 200 // ? Maximální počet rozdílných pixelů (tady 200)
        });
    });

    test("Masking Elements", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("masked_elements_test.png", {
            fullPage: true,
            mask: [
                page.locator('[data-testid="hover-box"]'),
                page.locator('[data-testid="drag-drop-box"] h2'),
            ]
        });
    });

    test("Masking not Working", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
        await expect(page).toHaveScreenshot("mask_not_working_test.png", {
            fullPage: true,
            mask: [page.locator('[data-testid="dynamic-size-box"]')],
        });
    });

    test("Hide Elements with CSS", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
        await expect(page).toHaveScreenshot("hide_elements_test.png", {
            fullPage: true,
            stylePath: path.resolve(
                __dirname,
                "../../../src/assets/visual_tests.css"
            ),
          });
    });

    test("Image Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/index.html");
        await expect(page.locator("#playwright-logo")).toHaveScreenshot(
            "image_test.png"
        );
    });

    test("Module Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/contact.html");
        await expect(page.locator("#practiceForm")).toHaveScreenshot(
            "module_test.png"
        );
    });

    test("Input Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/registration.html");
        const phoneInput = page.locator("#phone");
        await phoneInput.fill("123456789");
        await expect(phoneInput).toHaveScreenshot("input_test.png");
    });

    test("Lofin form Visual Test", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.openPmtool()
            .then((loginPage) => loginPage.visualTestLoginForm());
    });
})
