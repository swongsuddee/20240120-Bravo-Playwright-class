import { BaseElement } from "../base-element";
import { TodoItemRowElement } from "./todo-item-row-element";

export class TodoListComponent extends BaseElement {

    private readonly _todoItemRowLocator = this.element.locator('//li[@data-testid="todo-item"]');

    public async isVisible() {
        const isVisible = await this.element.isVisible();
        return isVisible;
    }

    public async countTodoItemRows() {
        const isVisible = await this.isVisible();
        if (isVisible) {
            const count = await this._todoItemRowLocator.count();
            return count
        }
        return 0;
    }

    public async getTodoItemRows() {
        const count = await this.countTodoItemRows();
        const rows = new Array<TodoItemRowElement>();
        for (let i = 0; i < count; i++) {
            rows.push(new TodoItemRowElement(this.page, this._todoItemRowLocator.nth(i)));
        }
        return rows;
    }

    public async checkTodoItem(text: string) {
        const rows = await this.getTodoItemRows();
        for await (const row of rows) {
            const title = await row.getTitle();
            if (text == title) {
                await row.check();
                return;
            }
        }
    }

    public async deleteTodoItem(text: string) {
        const rows = await this.getTodoItemRows();
        for await (const row of rows) {
            const title = await row.getTitle();
            if (text == title) {
                await row.delete();
                return;
            }
        }
    }

}