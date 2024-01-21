import { Page, test } from "@playwright/test";
import { TodoPage } from "../pages/workshop/todo-page";

let _page: Page;

test.beforeAll(async ({ browser }) => {
    _page = await (await browser.newContext()).newPage();
    await _page.goto("https://demo.playwright.dev/todomvc/#/");
});

test("Todo", async () => {
    const todoPage = new TodoPage(_page);
    await todoPage.addTodoItem("Do");
    await todoPage.addTodoItem("Some");
    await todoPage.addTodoItem("Things");

    await todoPage.todoList.checkTodoItem("Do");
    await todoPage.todoList.checkTodoItem("Dooooo");

    await todoPage.todoList.deleteTodoItem("Some");
    await todoPage.todoList.deleteTodoItem("Do");

    await _page.close();
});