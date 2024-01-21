import { Locator, Page, expect, test } from "@playwright/test";


test("Scrapping text", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Text Box"').click();

    await page.locator('#userName').fill('Jojoe');
    await page.locator('#submit').click();

    const name = await page.locator('#name').innerText()
    expect(name).toEqual("Name:Jojoe");
    console.log(name)
});

class BaseElement {
    protected page: Page;
    protected element: Locator;

    constructor(page: Page, element: Locator) {
        this.page = page;
        this.element = element;
    }
}

class RowElement extends BaseElement {
    private readonly _fnameLocator = this.element.locator('xpath=/div[1]'); //"(//div[@class='rt-tbody']//div[@role='row' and not(contains(@class, '-padRow'))])[1]/div[1]"
    private readonly _lnameLocator = this.element.locator('xpath=/div[2]');

    public async getFirstName() {
        const text = await this._fnameLocator.innerText();
        return text;
    }
}

test("Scrapping from table", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Web Tables"').click();

    const rowLocator = page.locator(
        "//div[@class='rt-tbody']//div[@role='row' and not(contains(@class, '-padRow'))]"
    );

    const rowCount = await rowLocator.count();
    const rowElements = new Array<RowElement>();
    for (let i = 0; i < rowCount; i++) {
        rowElements.push(new RowElement(page, rowLocator.nth(i)));

        // test get data from row
        const fname = await rowElements[i].getFirstName();
        console.log(fname);
    }

    const aldenName = await rowElements[1].getFirstName();
    console.log(aldenName);

});

test("Current url", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Elements').click();
    await page.locator('div.left-pannel >> text="Web Tables"').click();

    const currentUrl = page.url();
    console.log(currentUrl);
});
