import { test } from "@playwright/test";
import { TextBoxComponent } from "../pages/demoqa/text-box-component";
import { RadioBoxPage } from "../pages/demoqa/radio-box-component";

test("Textbox page fill name", async ({ page }) => {
    await page.goto('https://demoqa.com');
    await page.locator('text=Elements').click();

    const textboxPage = new TextBoxComponent(page);
    await textboxPage.leftPanelLocator.gotoTextBoxPage();
    await textboxPage.fillFullName('Jojoe');
    await textboxPage.submit();
});

test("Textbox page fill email", async ({ page }) => {
    await page.goto('https://demoqa.com');
    await page.locator('text=Elements').click();

    const textboxPage = new TextBoxComponent(page);
    await textboxPage.leftPanelLocator.gotoTextBoxPage();
    await textboxPage.fillEmail('jojoe@gmail.com');
    await textboxPage.submit();
});

test("Check yes", async ({ page }) => {
    await page.goto('https://demoqa.com');
    await page.locator('text=Elements').click();

    const radioButtonPage = new RadioBoxPage(page);
    await radioButtonPage.leftPanelLocator.gotoRadioButtonPage();
    await radioButtonPage.checkYes();
})