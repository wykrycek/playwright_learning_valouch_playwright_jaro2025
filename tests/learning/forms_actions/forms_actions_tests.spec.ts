import { test } from "@playwright/test";
import * as path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill a pressSequentially Test", async ({ page }) => {
    await page.locator("#name").fill("Start");
    await page.locator("#name").fill("End");
    await page.locator("#name").pressSequentially("Kde to bude?");
    await page.locator("#name").pressSequentially("ABCD", { delay: 150});
  });

  test('Select test', async ({ page }) => {
    await page.locator('#gender').selectOption('male');
    await page.locator('#gender').selectOption({ label: 'Female' });
  });

  test('Check box, Radio button test', async ({ page }) => {
    await page.locator('input[type="radio"]#contact-phone').check();
    await page.locator('input[type="checkbox"]#interests-sports').check();
    await page.locator('input[type="checkbox"]#interests-travel').check();
    await page.locator('input[type="checkbox"]#interests-travel').uncheck();
  });

  test('Input Date test', async ({ page }) => {
    await page.locator('input[type="date"]#date-of-birth').fill('2023-08-23');
  });

  test('File upload test', async ({ page }) => {
    await page.locator('input[type="file"]#file-upload').setInputFiles('/var/www/html/tests/tests/pw_academy/playwright_learning_valouch_playwright_jaro2025/src/assets/forms_actions/test-file.txt');
    // await page.locator('input[type="file"]#file-upload').setInputFiles('/var/www/html/tests/tests/pw_academy/playwright_learning_valouch_playwright_jaro2025/tests/learning/forms_actions/test-file.mp3');
    // await page.locator('input[type="file"]#file-upload').setInputFiles({ name: 'test-file.txt', mimeType: 'text/plain', buffer: Buffer.from('test') });

    const filePath = path.resolve(__dirname, '../../../src/assets/test-file.txt');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('input[type="file"]#file-upload').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    await page.waitForTimeout(2000);
  });
  
});