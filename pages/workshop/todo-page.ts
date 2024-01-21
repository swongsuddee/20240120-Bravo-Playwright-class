import { BasePage } from "../base-page";
import { TodoListComponent } from "./todo-list-component";

export class TodoPage extends BasePage {

    private readonly _todoTextboxLocator = this.page.locator('.new-todo');

    public readonly todoList = new TodoListComponent(this.page, this.page.locator('.todo-list'));

    public async addTodoItem(text: string) {
        await this._todoTextboxLocator.fill(text);
        await this._todoTextboxLocator.press('Enter');
    }

}