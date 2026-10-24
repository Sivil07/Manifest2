import Todo from "../models/todo.js";
import { starterActiveData, starterCompletedData } from "../starterData.js";

/* 
    The TodoService manages the app's todos: either creating, editing, moving, deleting or persisting them

    This is the only layer that knows where todos are stored. The controller and the TodoView always 
    ask the TodoService to perform operations internally without needing to interact with the storage
    or todo objects themselves.

    While the app runs, the todos are kept in memory as real Todo objects split between an active
    and completed list. The localStorage persists the todos as JSON objects which causes them to lose
    their "Todo" identify and behavior so the service rebuilds them into Todo instances on the first load.

    If no saved data exists on the first load, the service uses the started data instead and persists it
    so the UI has initial todos to work with.

    Any change to the internal lists is saved to localStorage so the changes made can survive a reload
    and as well as the controller using the service's getters to provided the TodoView with the 
    updated data.

    All operations (create, edit, delete, clear) modify the internal lists and the TodoView always 
    reflects those changes when rendering the ui.

    Overall, The TodoService manages the data itself whereas the TodoView is responsible for
    how that data appears on screen.

*/

class TodoService {
    #activeTodos = [];
    #completedTodos = [];

    get allActiveTodos() {
        return [...this.#activeTodos];
    }

    get allCompletedTodos() {
        return [...this.#completedTodos];
    }

    get numberOfCompletedTodos() {
        return this.#completedTodos.length;
    }

    clearCompletedTodos() {
        this.#completedTodos = [];
        this.#saveCompletedTodos();
    }

    moveTodo({previousUserChecked, newUserChecked, todoId, todoChecked}) {
        const todo = this.findTodoById(todoId, todoChecked);
        todo.updateChecked(newUserChecked);
        const previousArray = previousUserChecked ? this.#completedTodos : this.#activeTodos;
        const targetArray = newUserChecked ? this.#completedTodos : this.#activeTodos ;

        const todoIndex = previousArray.indexOf(todo);
        previousArray.splice(todoIndex, 1);

        targetArray.push(todo);
        this.#saveActiveTodos()
        this.#saveCompletedTodos();
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
