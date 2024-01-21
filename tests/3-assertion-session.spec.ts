import test, { expect } from "@playwright/test";

test("Assert text", async () => {
    const text = 'Hello world!';
    expect(text).toMatch(/^Hello/)
});

test("Assert number", async () => {
    const num = 10.5
    expect(num).toEqual(10.5);

    const text = "15.05"
    expect(Number(text)).toBeLessThan(20);

    const text2 = "Hello"
    console.log(Number(text2))
});

test("Assert time", async ({ page }) => {
    await page.goto("https://demoqa.com");
    await page.locator('text=Widgets').click();
    await page.locator('div.left-pannel >> text="Date Picker"').click();

    const datePicker = page.locator("#datePickerMonthYearInput");
    const currentDate = await datePicker.inputValue();
    console.log("current date = ", currentDate);

    const date = new Date(currentDate);
    console.log("date = ", date);
    console.log("time = ", date.getTime());

    const gre = new Date('05/21/2024').getTime() - 5000
    const less = new Date('05/21/2024').getTime() + 5000
    console.log(gre, "<=", date.getTime(), "<=", less);

    expect(date.getTime()).toBeGreaterThanOrEqual(gre);
    expect(date.getTime()).toBeLessThanOrEqual(less);
});