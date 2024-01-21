import { Locator, Page, expect, test } from '@playwright/test';

// .afterAll() : async function for test setup
// this function will be run before all test cases in this feature file
test.afterAll(async ({ page }) => {
    await page.close();
})

test("Open demo website", async ({ page }) => {
    // the first scenario just show you how .goto function work
    await page.goto("https://demoqa.com");
    // with the above line of code it means, wait until the page navigated to website

    await page.locator("//h5[text()='Elements']").dblclick();
    await page.close();
});

test("Practice 1 mouse click", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text=Buttons').click();

    page.locator('#item-4 > span >> text="Buttons"')
    page.locator('#item-4 > span >> nth=0')
    await page.locator('#item-4 > span').nth(0).click()

    await page.locator('#doubleClickBtn').dblclick();
    await page.locator('#rightClickBtn').click({ button: 'right' });
    await page.locator('button >> text="Click Me"').click();

    await expect(page.locator('#doubleClickMessage'))
        .toContainText('You have done a double click');
});


let x = 'A';

test("fill text", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Text Box"').click();

    await page.locator('#userName').fill('Jojoe');
    await page.locator('#userEmail').fill('jojoe@gmail.com');
    await page.locator('textarea#currentAddress').fill('home');
    await page.locator('#permanentAddress').fill('some where');

    await page.locator('#submit').click();

    await expect(page.locator('#name')).toContainText('Jojoe')
    expect(await page.locator('#name').innerText()).toEqual("Name:Jojoe")

    page.locator('p#currentAddress')
    page.locator('#currentAddress').nth(1)

    await expect(page.locator('#userName')).toHaveValue('Jojoe')

    x = 'B'
});

test("check box", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Check Box"').click();

    await page.locator("//label[@for='tree-node-home']/../button").click();

    const nodeDesktopLocator = page.locator(
        "//input[@id='tree-node-desktop']/../span[@class='rct-checkbox']"
    );
    await nodeDesktopLocator.setChecked(true)
    await nodeDesktopLocator.uncheck();
    await nodeDesktopLocator.check();

    expect(
        await nodeDesktopLocator.isChecked()
    ).toBeTruthy()

    const isDesktopChecked = await nodeDesktopLocator.isChecked()
    expect(isDesktopChecked).toBeTruthy();

    const isDocumentChecked = await page.locator(
        "//input[@id='tree-node-documents']/../span[@class='rct-checkbox']"
    ).isChecked();
    expect(isDocumentChecked).toBeFalsy();

    console.log(x)
});

test('Global variable', async () => {
    global['Hello'] = "Hello"
    console.log(global['Hello'])
})

test("Radio button", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Radio Button"').click();

    const yesButtonLocator = page.locator('#yesRadio >> //./..');
    await yesButtonLocator.click();

    const impressiveButtonLocator = page.locator('#impressiveRadio >> xpath=./..');
    await impressiveButtonLocator.click();

    const isYesChecked = await page.locator('#yesRadio').isChecked();
    expect(isYesChecked).toBeFalsy();

    // await page.locator('#yesRadio').check(); Unable to check

    const noButtonLocator = page.locator("#noRadio");
    const noClass = await noButtonLocator.getAttribute('class');
    expect(noClass).toContain('disabled')
    console.log(noClass);

    await page.locator('#noRadio >> //./..').click();
    expect(await page.locator("#noRadio").isChecked()).toBeFalsy();
});

test("Drop down", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Widgets').click();
    await page.locator('div.left-pannel >> text="Select Menu"').click();

    const oldStyleLocator = page.locator('#oldSelectMenu');
    await oldStyleLocator.selectOption('4') // select by value
    await oldStyleLocator.selectOption({ label: 'Green' }) // select by label
    await oldStyleLocator.selectOption({ index: 10 }) // select by index

    const selectOneLocator = page.locator('#selectOne');
    const listLocator = page.locator('#selectOne >> xpath=./div[2]')

    await selectOneLocator.click();
    await listLocator.locator('text="Ms."').click();
    // Locator: #selectOne >> xpath=./div[2] >> text="Ms."

    await selectOneLocator.click();
    const drLocator = page.locator(
        "//div[@id='selectOne']/div[2]//*[text()='Mr.']"
    );
    await drLocator.click();

    await selectOneFromDropdown(page, 'Mr.');

    const text = 'Mr.'
    const newLocator = `//div[@id='selectOne']/div[2]//*[text()='${text}']`
    console.log(newLocator);
});

async function selectOneFromDropdown(page: Page, text: string) {
    const selectOneLocator = page.locator('#selectOne');
    const listLocator = page.locator('#selectOne >> xpath=./div[2]')
    await selectOneLocator.click();
    await listLocator.locator(`text=${text}`).click();
}

function fn(): String {
    return String(10);
}

test("Multi dropdown", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Widgets').click();
    await page.locator('div.left-pannel >> text="Select Menu"').click();

    page.locator('//div[@class="left-pannel"]//span[text()="Select Menu"]')

    const selectMultiLocator = page.locator(
        '//b[text()="Multiselect drop down"]/../../div'
    );
    await selectMultiLocator.click();

    const greenLocator = selectMultiLocator.locator("//div[2]//*[text()='Green']");
    await greenLocator.click();
    const redLocator = selectMultiLocator.locator("//div[2]//*[text()='Red']");
    await redLocator.click();

    const listMenu = page.locator(
        `//b[text()='Multiselect drop down']/../../div >> 
        //div[contains(@class, 'menu')]`
    )
    await listMenu.locator("//*[text()='Blue']").click()

});

test("Key press", async ({ page }) => {
    await page.goto("https://google.com");

    const textareaLocator = page.locator("//textarea[@title]")
    await textareaLocator.press('H');
    await textareaLocator.press('e');
    await textareaLocator.press('l');
    await textareaLocator.press('l');
    await textareaLocator.press('o');

    await textareaLocator.press('Enter');

});

test("Upload", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Upload and Download"').click();

    const uploadLocator = page.locator("#uploadFile");
    await uploadLocator.setInputFiles("P1430523.jpg");
});

test('Download', async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Upload and Download"').click();

    const downloadButtonLocator = page.locator("#downloadButton");

    const downloadPromise = page.waitForEvent('download');
    await downloadButtonLocator.click();
    const downloaded = await downloadPromise;

    console.log(downloaded.suggestedFilename())
});

test("Drag and drop", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Interactions').click();
    await page.locator('div.left-pannel >> text="Droppable"').click();

    const dragItemLocator = page.locator("div.simple-drop-container >> #draggable");
    const dropzoneLocator = page.locator("div.simple-drop-container >> #droppable");

    await dragItemLocator.dragTo(dropzoneLocator);
});
