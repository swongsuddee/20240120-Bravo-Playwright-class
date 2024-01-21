import { Locator, Page } from "@playwright/test";
import { BaseElement } from "../base-element";

export class LeftPanel extends BaseElement {

    constructor(page: Page, locator: Locator) {
        super(page, locator);
    }

    private readonly _elementLocator = this.element.locator("//span[@class='group-header']//div[text()='Elements']");
    private readonly _elementList = this._elementLocator.locator("xpath=/../../..//div[contains(@class, 'element-list')]");

    private readonly _textboxLocator = this.element.locator('text="Text Box"');
    private readonly _radioboxLocator = this.element.locator('text="Radio Button"');

    public async isElementShow() {
        const isVisible = await this._elementList.isVisible();
        return isVisible;
    }

    public async gotoTextBoxPage(): Promise<void> {
        if (!await this.isElementShow()) {
            await this._elementLocator.click();
        }
        await this._textboxLocator.click();
    }

    public async gotoRadioButtonPage(): Promise<void> {
        if (!await this.isElementShow()) {
            await this._elementLocator.click();
        }
        await this._radioboxLocator.click();
    }
}