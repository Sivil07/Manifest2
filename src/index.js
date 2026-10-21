import "../public/css/base.css";
import "./views/todoItem.js";
import "./views/todoForm.js";
import "./views/todoTemplate.js";
import TodoView from "./views/todoView.js";
import TodoService from "./services/todoService.js";
import TodoController from "./controllers/todoController.js";

const todoService = new TodoService();
const todoView = new TodoView(
    document.querySelector("#task-list"),
    document.querySelector("#my-dialog"),
    document.querySelector("#todo-action")
);
const todoController = new TodoController(todoService, todoView);

todoController.initialize();
