import "../public/css/base.css";
import "./views/todoItem/todoItem.css";
import "./views/todoTemplate/todoTemplate.css";
import "./views/todoForm/todoForm.css";
import "./views/todoCounter/todoCounter.css"
import "./views/todoItem/todoItem.js";
import "./views/todoForm/todoForm.js";
import "./views/todoTemplate/todoTemplate.js";
import "./views/todoCounter/todoCounter.js";
import TodoView from "./views/todoView.js";
import TodoService from "./services/todoService.js";
import TodoController from "./controllers/todoController.js";

const todoService = new TodoService();
const todoView = new TodoView(
    document.querySelector("#todo-lists"),
    document.querySelector("#active-todo-list"),
    document.querySelector("#completed-todo-list"),
    document.querySelector("#my-dialog"),
    document.querySelector("#todo-action")
);
const todoController = new TodoController(todoService, todoView);

todoController.initialize();
