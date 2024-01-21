import { BaseElement } from "../base-element";

export class TodoItemRowElement extends BaseElement {

    private readonly _checkBoxLocator = this.element.locator('css=input.toggle');
    private readonly _titleLocator = this.element.locator('//label[@data-testid="todo-title"]');
    private readonly _deleteLocator = this.element.locator('button.destroy');

    public async check() {
        await this._checkBoxLocator.check();
    }

    public async getTitle(): Promise<String> {
        const text = await this._titleLocator.innerText();
        return text;
    }

    public async delete() {
        await this._titleLocator.hover();
        await this._deleteLocator.click();
    }

}