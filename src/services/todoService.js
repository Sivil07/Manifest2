import Todo from "../models/todo.js";
import { starterActiveData, starterCompletedData } from "../starterData.js";

class TodoService {
    #activeTodos = [];
    #completedTodos = [];

    get allActiveTodos() {
        return [...this.#activeTodos];
    }
      
    createTodo(todoData) {
        const todo = new Todo(todoData);
        this.#activeTodos.push(todo); 
        this.#saveActiveTodos();
    }
    
    editTodo(id, todoData) {
        const todo = this.findTodoById(id);
        todo.updateTodo(todoData);
        this.#saveActiveTodos();
    }

    deleteTodo(id) {
        const todo = this.findTodoById(id);
        const todoIndex = this.#activeTodos.indexOf(todo);
        this.#activeTodos.splice(todoIndex, 1);
        this.#saveActiveTodos();
    }

    findTodoById(id) {
        for (const todo of this.#activeTodos) {
            if (todo.id === id) {
                return todo;
            }
        }
    }

    #saveActiveTodos() {
        localStorage.setItem("active-todos", JSON.stringify(this.#activeTodos));
    }

    #saveCompletedTodos() {
        localStorage.setItem("completed-todos", JSON.stringify(this.#completedTodos));
    }

    classifyTodos(rawTodoArray) {
        for (const rawTodo of rawTodoArray) {
            const todo = new Todo(rawTodo);
            if (todo.isChecked) {
                this.#completedTodos.push(todo)
            } else {
                this.#activeTodos.push(todo)
            }
        }
    }

    loadTodos() {
        this.#activeTodos = [];
        this.#completedTodos = [];
        const savedActiveData = localStorage.getItem("active-todos");
        const savedCompleteData = localStorage.getItem("completed-todos");
        const activeArray = savedActiveData === null ? starterActiveData : JSON.parse(savedActiveData);
        const completedArray = savedCompleteData === null ? starterCompletedData : JSON.parse(savedCompleteData);
        this.classifyTodos(activeArray)
        this.classifyTodos(completedArray)
        if (savedActiveData === null) this.#saveActiveTodos();
        if (savedCompleteData === null) this.#saveCompletedTodos();
    }
}

export default TodoService;
