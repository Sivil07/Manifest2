import Todo from "../models/todo.js";
import { starterActiveData, starterCompletedData } from "../starterData.js";

class TodoService {
    #activeTodos = [];
    #completedTodos = [];

    get allActiveTodos() {
        return [...this.#activeTodos];
    }

    get allCompletedTodos() {
        return [...this.#completedTodos];
    }

    createTodo(todoEntries) {
        const todo = new Todo(todoEntries);
        this.#activeTodos.push(todo); 
        this.#saveActiveTodos();
    }
    
    editTodo(id, todoChecked, todoEntries) {
        const todo = this.findTodoById(id, todoChecked);
        todo.updateTodo(todoEntries);
        this.#saveActiveTodos();
    }

    deleteTodo(id, todoChecked) {
        const todo = this.findTodoById(id, todoChecked);
        const todoIndex = this.#activeTodos.indexOf(todo);
        this.#activeTodos.splice(todoIndex, 1);
        this.#saveActiveTodos();
    }

    #getTargetList(todoChecked) {
        return todoChecked ? this.#completedTodos : this.#activeTodos;
    }

    findTodoById(id, todoChecked) {
        const targetArray = this.#getTargetList(todoChecked)
        for (const todo of targetArray) {
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
