import { test, expect } from "@playwright/test";

test.describe("Mouse Actions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
  });

  test("Hover Test", async ({ page }) => {
    await page.locator("#hover-box").hover();
    await expect(page.locator('[data-testid="hover-message"]')).toHaveText("This is a hover message that appears when you hover over the box.");
  });

  test("Drag and Drop Test", async ({ page }) => {
    // id="drag1" to id="drop1"

    const sourceElement = page.locator("#drag1");
    const targetElement = page.locator("#drop1");

    await targetElement.scrollIntoViewIfNeeded();
    await sourceElement.dragTo(targetElement);

    await expect(page.locator('[data-testid="dropped-message"]')).toBeVisible();
  });

  test("Drag and Drop - alternative if dragTo does not work", async ({
      page,
    }) => {
      const draggable = page.locator("#drag1");
      const dropzone = page.locator("#drop1");

      await dropzone.scrollIntoViewIfNeeded();

      // ? Vytažení souřadnic prvků draggable a dropzone
      const draggableBox = await draggable.boundingBox();
      const dropzoneBox = await dropzone.boundingBox();

      if (!draggableBox || !dropzoneBox) {
        throw new Error(
          "Unable to determine bounding boxes for drag and drop elements"
        );
      }

      // ? přetáhnutí prvku draggable do dropzone pomocí souřadnic. Vypočítává se střed prvků
      await page.mouse.move(
        draggableBox.x + draggableBox.width / 2, // ? draggableBox.x je x souřadnice draggableBox vlevo nahoře. Přičítáme šířku a dělíme dvěma, abychom dostali střed
        draggableBox.y + draggableBox.height / 2 // ? draggableBox.y je y souřadnice draggableBox vlevo nahoře. Přičítáme výšku a dělíme dvěma, abychom dostali střed
      );
      await page.mouse.down();
      await page.mouse.move(
        dropzoneBox.x + dropzoneBox.width / 2,
        dropzoneBox.y + dropzoneBox.height / 2
      );
      await page.mouse.up();
      await expect(page.locator("#dropped-message")).toBeVisible();
    }
  );

  test("Double Click Test", async ({ page }) => {
    const doubleClickBox = page.locator('[data-testid="double-click-box"]');
    await doubleClickBox.dblclick();
    await expect(doubleClickBox).toHaveClass(/action-active/);
  });

  test("Double Click Test - with containClass", async ({ page }) => {
    const doubleClickBox = page.locator('[data-testid="double-click-box"]');
    await doubleClickBox.dblclick();
    await expect(doubleClickBox).toContainClass("action-active");
  });

  test("Click and holt", async ({ page }) => {
    await page.locator(".hold-button").click({ delay: 2000 });
  });
});