/*

test formuláře pro vytváření nového projektu

Vytvořte složku: tests/atomic-tests a v ní: tests.spec.ts vytvořte nový test: Atomic Tests - Project Create Form


Desktruktivní testy:		
Test #	Prvek	Typ Testu
TC18	Input Name	Validace (prázdné pole)
TC31	Input Attachments	Nahrání souboru
TC36	Button Save	Interakce (click)
TC39	Button Close	Interakce (click)
TC41	Div Alert	Viditelnost (v případě prázdného name)
TC42	Div Alert	Text
		
Nedestruktivní testy:		
Test #	Prvek	Typ Testu
TC1	Modal Header	Viditelnost
TC2	Modal Header	Text
TC3	Záložka Info	Viditelnost
TC4	Záložka Info	Text
TC5	Select Priority	Viditelnost
TC6	Select Priority	Atributy - options
TC7	Select Priority	Výběr
TC8	Label Priority	Viditelnost
TC9	Label Priority	Text
TC10	Select Status	Viditelnost
TC11	Select Status	Atributy - options
TC12	Select Priority	Výběr
TC13	Label Status	Viditelnost
TC14	Label Status	Text
TC15	Input Name	Viditelnost
TC16	Input Name	Editovatelnost
TC17	Input Name	Zápis
TC19	Label Input	Viditelnost
TC20	Label Input	Zápis
TC21	Input Start Date	Viditelnost
TC22	Input Start Date	Editovatelnost
TC23	Input Start Date	Zápis
TC24	Label Start Date	Viditelnost
TC25	Label Start Date	Text
TC26	Description (iFrame)	Viditelnost iFrame
TC27	Description (iFrame)	Zápis
TC28	Label Description	Viditelnost
TC29	Button Attachments	Viditelnost
TC30	Button Attachments	Text
TC32	Label Attachments	Viditelnost
TC33	Label Attachments	Text
TC34	Button Save	Viditelnost
TC35	Button Save	Text
TC37	Button Close	Viditelnost
TC38	Button Close	Text
TC40	Div Alert	Neviditelnost



*/

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/pmtool/login_page.ts';
import { AddNewProjectModal } from '../../../src/pages/pmtool/projects/create_new_project_modal.ts';
import path from "path";

test.describe("Pmtool Atomic Tests - Create Project Modal", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Form Structure Tests", async ({ page }) => {
    // ? Vytváříme PO před stepem, abychom jej mohli využít v každém test.step a nemuseli jej vytvářet stále dokola.
    const addProjectModal = new AddNewProjectModal(page);
    
    await test.step("Title Header Tests", async () => {
      await expect.soft(addProjectModal.titleHeader).toBeVisible();
      await expect.soft(addProjectModal.titleHeader).toHaveText("Project Info");
    });

    await test.step("Info Text Tests", async () => {
      await expect.soft(addProjectModal.infoTab).toBeVisible();
      await expect.soft(addProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select Tests", async () => {
      await expect.soft(addProjectModal.prioritySelect).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toHaveText("*Priority");
      await expect.soft(addProjectModal.prioritySelect).toBeEnabled();
      // ? Ověření, že má select všechny options
      // ? Výběr options můžou potenciálně způsobit ukončení testů v případě, že option nebude existovat. Je dobré zvážit oddělení testů pro selecty do samostatných testů
      await addProjectModal.prioritySelect.selectOption({ label: "Urgent" }); // 34 = Urgent
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("34");
      await addProjectModal.prioritySelect.selectOption({ label: "High" }); // 35 = High
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("35");
    });

    await test.step("Status Select Tests", async () => {
      await expect.soft(addProjectModal.statusSelect).toBeVisible();
      await expect.soft(addProjectModal.statusLabel).toHaveText("*Status");
      await expect.soft(addProjectModal.statusSelect).toBeEnabled();
      // ? Ověření, že má select všechny options: New, Open, Waiting, Closed, Canceled (ano, je tu překlep v názvu)
      await addProjectModal.statusSelect.selectOption({ label: "New" }); // 37 = New
      await expect.soft(addProjectModal.statusSelect).toHaveValue("37");
      await addProjectModal.statusSelect.selectOption({ label: "Open" }); // 38 = Open
      await expect.soft(addProjectModal.statusSelect).toHaveValue("38");
      await addProjectModal.statusSelect.selectOption({ label: "Waiting" }); // 39 = Waiting
      await expect.soft(addProjectModal.statusSelect).toHaveValue("39");
      await addProjectModal.statusSelect.selectOption({ label: "Closed" }); // 40 = Closed
      await expect.soft(addProjectModal.statusSelect).toHaveValue("40");
      await addProjectModal.statusSelect.selectOption({ label: "Canceled" }); // 41 = Canceled
      await expect.soft(addProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input Tests", async () => {
      await expect.soft(addProjectModal.nameInput).toBeVisible();
      await expect.soft(addProjectModal.nameInput).toBeEnabled();
      await expect.soft(addProjectModal.nameLabel).toBeVisible();
      await expect.soft(addProjectModal.nameLabel).toHaveText("*Name");
      // ? Fill je potenciálně nebezpečná akce, protože může způsobit selhání testu v případě, že hodnota nebude existovat. Je dobré zvážit oddělení testů pro inputy do samostatných testů.
      await addProjectModal.nameInput.fill("Test Project");
      await expect.soft(addProjectModal.nameInput).toHaveValue("Test Project");
    });

    await test.step("Start Date Input Tests", async () => {
      await expect.soft(addProjectModal.startDateInput).toBeVisible();
      await expect.soft(addProjectModal.startDateInput).toBeEnabled();
      await expect.soft(addProjectModal.startDateLabel).toBeVisible();
      await expect
        .soft(addProjectModal.startDateLabel)
        .toHaveText("Start Date");
      // ? Fill je potenciálně nebezpečná akce, protože může způsobit selhání testu v případě, že hodnota nebude existovat. Je dobré zvážit oddělení testů pro inputy do samostatných testů.
      await addProjectModal.startDateInput.fill("2023-10-01");
      await expect
        .soft(addProjectModal.startDateInput)
        .toHaveValue("2023-10-01");
    });

    await test.step("Attachment Button Tests", async () => {
      await expect.soft(addProjectModal.attachmentsButton).toBeVisible();
      await expect
        .soft(addProjectModal.attachmentsButton)
        .toHaveText("Add Attachments");
      await expect.soft(addProjectModal.attachmentsLabel).toBeVisible();
      await expect
        .soft(addProjectModal.attachmentsLabel)
        .toHaveText("Attachments");
    });

    await test.step("Save Button Tests", async () => {
      await expect.soft(addProjectModal.saveButton).toBeVisible();
      await expect.soft(addProjectModal.saveButton).toHaveText("Save");
    });

    await test.step("Close Button Tests", async () => {
      await expect.soft(addProjectModal.closeButton).toBeVisible();
      await expect.soft(addProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Name Input Validation Message Test", async ({ page }) => {
    const addProjectModal = new AddNewProjectModal(page);
    await addProjectModal.triggerNameValidation();
    await expect.soft(addProjectModal.nameValidationDiv).toBeVisible();
    await expect
      .soft(addProjectModal.nameValidationDiv)
      .toHaveText("This field is required!");
  });

  test("Alert Message Test", async ({ page }) => {
    const addProjectModal = new AddNewProjectModal(page);
    await addProjectModal.triggerAlertMessage();
    await expect.soft(addProjectModal.alertMessageDiv).toBeVisible();
    await expect
      .soft(addProjectModal.alertMessageDiv)
      .toHaveText(
        "Some fields are required. They have been highlighted above."
      );
  });

  test("Upload Attachment Test", async ({ page }) => {
    const addProjectModal = new AddNewProjectModal(page);
    const filePath = path.resolve(
      __dirname,
      "../../../src/assets/test-file.txt"
    );
    // ? Helper k vytvoření dynamické cesty k souboru
    // require("../../../src/assets/upload_file.txt");
    await addProjectModal.uploadFile(filePath);
    await expect(addProjectModal.uploadFilesList).toBeVisible();
  });

  test("Click Save Button Test", async ({ page }) => {
    const addProjectModal = new AddNewProjectModal(page);
    const name = `LV - ${Math.random().toString(36).substring(7)}`;
    await addProjectModal
      .typeName(name)
      .then((createProject) => createProject.clickSave())
      .then((tasks) => tasks.headerHasText("Tasks"));
  });

  test("Click Close Button Test", async ({ page }) => {
    const addProjectModal = new AddNewProjectModal(page);
    await addProjectModal
      .clickClose()
      .then((projects) => projects.headerHasText("Projects"));
  });
});