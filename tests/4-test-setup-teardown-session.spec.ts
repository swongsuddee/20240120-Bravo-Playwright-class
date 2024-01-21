import { Page, expect, test } from '@playwright/test';

let _page: Page;
let _page2: Page;

// test.beforeAll(async ({ page }) => {
//     console.log("before all")
// })

// test.beforeEach(async ({ }) => {
//     console.log("before each")
// })

test.describe("Group 1", async () => {

    test.beforeAll(async ({ browser }) => {
        _page = await (await browser.newContext()).newPage();
        await _page.goto('https://google.com')


        _page2 = await (await browser.newContext()).newPage();
        await _page.goto('https://demoqa.com')

        console.log("before all 1 - group 1")
    })

    test.beforeEach(async ({ }) => {
        console.log("before each 1 - group 1")
    })

    test("test1", async () => {
        console.log("test 1");
        await _page.close()
    })

    test.describe("", async () => {

        test("test2", async () => {
            console.log("test 1");
        })

    })

});

test.describe("Group 2", async () => {

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        _page = await context.newPage();
        await _page.goto('https://google.com')

        _page2 = await context.newPage()
        await _page2.goto('https://demoqa.com')


        console.log("before all 1 - group 2")

        await browser.close()
    })

    test.beforeEach(async ({ }) => {
        console.log("before each 1 - group 2")
    })

    test("test1", async () => {
        console.log("test 1");
    })

});

test.describe("Template", async () => {
    const scenarios = [
        {
            name: "Google",
            url: "https://google.com"
        },
        {
            name: "Youtube",
            url: "https://youtube.com"
        }
    ]
    for (const scenario of scenarios) {
        test(`Go to web ${scenario.name}`, async ({ page }) => {
            await page.goto(scenario.url);

        })
    }
});
