import { Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { LeftPanel } from "./left-panel-component";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private readonly _pageHeaderLocator = this.page.locator('');
    public readonly leftPanelLocator = new LeftPanel(this.page, this.page.locator('div.left-pannel'));

    public async getPageTitle() {
        return await this._pageHeaderLocator.innerText();
    }

}