import "../public/css/base.css";
import "./views/todoItem/todoItem.css";
import "./views/todoTemplate/todoTemplate.css";
import "./views/todoForm/todoForm.css";
import "./views/todoCounter/todoCounter.css"
import "./views/todoItem/todoItem.js";
import "./views/todoForm/todoForm.js";
import "./views/todoTemplate/todoTemplate.js";
import "./views/todoCounter/todoCounter.js";
import "./views/todoProgress/todoProgress.js";
import "./views/todoProgress/todoProgress.css";
import TodoView from "./views/todoView.js";
import TodoService from "./services/todoService.js";
import TodoController from "./controllers/todoController.js";

const todoService = new TodoService();
const todoView = new TodoView(
    document.querySelector("#todo-lists"),
    document.querySelector("#active-todo-list"),
    document.querySelector("#completed-todo-list"),
    document.querySelector("#my-dialog"),
    document.querySelector("#add-todo"),
    document.querySelector("#filter-today"),
    document.querySelector("#filter-upcoming")
);
const todoController = new TodoController(todoService, todoView);

todoController.initialize();
