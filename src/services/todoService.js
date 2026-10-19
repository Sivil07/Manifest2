import Todo from "../models/todo.js";
import { starterData } from "../starterData.js";

class TodoService {
    #todos = [];

    get allTodos() {
        return [...this.#todos];
    }

    #rebuildTodo(rawTodo) {
        return new Todo(rawTodo);
    }
      
    createTodo(todoData) {
        const todo = new Todo(todoData);
        this.#todos.push(todo); 
        this.#saveTodos();
        return todo;
    }

    #saveTodos() {
        localStorage.setItem("todos", JSON.stringify(this.#todos));
    }

    loadTodos() {
        this.#todos = [];
        const savedData = localStorage.getItem("todos");
        const arrayObject = savedData === null ? starterData : JSON.parse(savedData);
        for (const rawTodo of arrayObject) {
            const todo = this.#rebuildTodo(rawTodo);
            this.#todos.push(todo);
        }
    }
}

export default TodoService;
