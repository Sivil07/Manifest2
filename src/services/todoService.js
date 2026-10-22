import Todo from "../models/todo.js";
import { starterData } from "../starterData.js";

class TodoService {
    #activeTodos = [];

    get allActiveTodos() {
        return [...this.#activeTodos];
    }
      
    createTodo(todoData) {
        const todo = new Todo(todoData);
        this.#activeTodos.push(todo); 
        this.#saveTodos();
    }
    
    editTodo(id, todoData) {
        const todo = this.findTodoById(id);
        todo.updateTodo(todoData);
        this.#saveTodos();
    }

    deleteTodo(id) {
        const todo = this.findTodoById(id);
        const todoIndex = this.#activeTodos.indexOf(todo);
        this.#activeTodos.splice(todoIndex, 1);
        this.#saveTodos();
    }

    findTodoById(id) {
        for (const todo of this.#activeTodos) {
            if (todo.id === id) {
                return todo;
            }
        }
    }

    #saveTodos() {
        localStorage.setItem("todos", JSON.stringify(this.#activeTodos));
    }

    loadTodos() {
        this.#activeTodos = [];
        const savedData = localStorage.getItem("todos");
        const arrayObject = savedData === null ? starterData : JSON.parse(savedData);
        for (const rawTodo of arrayObject) {
            const todo = new Todo(rawTodo);
            this.#activeTodos.push(todo);
        }

        if (savedData === null) this.#saveTodos();
    }
}

export default TodoService;
