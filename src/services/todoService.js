import Todo from "../models/todo.js";
import { starterActiveData, starterCompletedData, starterData } from "../starterData.js";
import { getCurrentDate } from "../utils/date.js";

/* 
    The TodoService manages the app's todos: either creating, editing, moving, deleting or persisting them

    This is the only layer that knows where todos are stored. The controller and the TodoView always 
    ask the TodoService to perform operations internally without needing to interact with the storage
    or todo objects themselves.

    While the app runs, the todos are kept in memory as real Todo objects split between an active
    and completed list. The localStorage persists the todos as JSON objects which causes them to lose
    their "Todo" identify and behavior so the service rebuilds them into Todo instances on every load.

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
    #allTodos = [];
    #currentFilter;
    
    get allActiveTodos() {

        if (this.#currentFilter === "today") {
            const todayTodos = this.filterTodosByToday()
            return this.#sortIntoActiveList(todayTodos);
        }

        if (this.#currentFilter === "upcoming") {
            const upcomingTodos = this.filterTodosByUpcoming();
            return this.#sortIntoActiveList(upcomingTodos);
        }
    }

    get allCompletedTodos() {

        if (this.#currentFilter === "today") {
            const todayTodos = this.filterTodosByToday()
            return this.#sortIntoCompletedList(todayTodos);
        }

        if (this.#currentFilter === "upcoming") {
            const upcomingTodos = this.filterTodosByUpcoming();
            return this.#sortIntoCompletedList(upcomingTodos);
        }

    }

    // get numberOfCompletedTodos() {
    //     return this.#completedTodos.length;
    // }

    setFilter(filterOption = "today") {
        this.#currentFilter = filterOption
    }

    // clearCompletedTodos() {
    //     this.#completedTodos = [];
    //     this.#saveCompletedTodos();
    // }

    // moveTodo({ previousUserChecked, newUserChecked, todoId, todoChecked }) {
    //     const todo = this.findTodoById(todoId, todoChecked);
    //     todo.setCompletedStatus(newUserChecked);
    //     const previousArray = previousUserChecked ? this.#completedTodos : this.#activeTodos;
    //     const targetArray = newUserChecked ? this.#completedTodos : this.#activeTodos;

    //     const todoIndex = previousArray.indexOf(todo);
    //     previousArray.splice(todoIndex, 1);

    //     targetArray.push(todo);
    //     this.#saveActiveTodos()
    //     this.#saveCompletedTodos();
    // }

    filterTodosByToday() {
        const filteredArray = []
        const currentDate = getCurrentDate();
        this.#allTodos.forEach((todo) => {
            const todoDueDate = todo.dueDate;
            if (todoDueDate === currentDate) filteredArray.push(todo);
        })
        return filteredArray
    }

    filterTodosByUpcoming() {
        const filteredArray = []
        const currentDate = getCurrentDate();
        this.#allTodos.forEach((todo) => {
            const todoDueDate = todo.dueDate;
            if (todoDueDate !== currentDate) filteredArray.push(todo);
        })
        return filteredArray
    }


    // createTodo(todoEntries) {
    //     const todo = new Todo(todoEntries);
    //     this.#activeTodos.push(todo);
    //     this.#saveActiveTodos();
    // }

    // editTodo(id, isCompleted, todoEntries) {
    //     const todo = this.findTodoById(id, isCompleted);
    //     todo.applyUpdates(todoEntries);
    //     this.#saveActiveTodos();
    // }

    // deleteTodo(id, isCompleted) {
    //     const todo = this.findTodoById(id, isCompleted);
    //     const todoIndex = this.#activeTodos.indexOf(todo);
    //     this.#activeTodos.splice(todoIndex, 1);
    //     this.#saveActiveTodos();
    // }

    // #getTargetList(isCompleted) {
    //     return isCompleted ? this.#completedTodos : this.#activeTodos;
    // }

    // findTodoById(id, todoChecked) {
    //     const targetArray = this.#getTargetList(todoChecked)
    //     for (const todo of targetArray) {
    //         if (todo.id === id) {
    //             return todo;
    //         }
    //     }
    // }

    // #saveActiveTodos() {
    //     localStorage.setItem("active-todos", JSON.stringify(this.#activeTodos));
    // }

    // #saveCompletedTodos() {
    //     localStorage.setItem("completed-todos", JSON.stringify(this.#completedTodos));
    // }

    #saveAllTodos() {
        localStorage.setItem("all-todos", JSON.stringify(this.#allTodos));
    }

    // #sortIntoLists(savedTodos) {
    //     for (const savedTodo of savedTodos) {
    //         const todo = new Todo(savedTodo);
    //         if (todo.isChecked) {
    //             this.#completedTodos.push(todo)
    //         } else {
    //             this.#activeTodos.push(todo)
    //         }
    //     }
    // }

    #sortIntoActiveList(unsortedList) {
        const activeList = unsortedList.filter((savedTodo) => {
            const todo = new Todo(savedTodo);
            return !todo.isChecked;
        })
        return activeList
    }

    #sortIntoCompletedList(unsortedList) {
        const completedList = unsortedList.filter((savedTodo) => {
            const todo = new Todo(savedTodo);
            return todo.isChecked;
        })
        return completedList
    }

    load() {
        this.#allTodos = [];
        const savedAllTodoData = localStorage.getItem("all-todos")
        const todoData = savedAllTodoData === null ? starterData : JSON.parse(savedAllTodoData);
        this.setFilter();
        todoData.forEach((savedTodoData) => {
            const todo = new Todo(savedTodoData);
            this.#allTodos.push(todo);
        })

        if (savedAllTodoData === null) this.#saveAllTodos();

    }

    // loadTodos() {
    //     this.#activeTodos = [];
    //     this.#completedTodos = [];
    //     const savedActiveData = localStorage.getItem("active-todos");
    //     const savedCompleteData = localStorage.getItem("completed-todos");
    //     const activeData = savedActiveData === null ? starterActiveData : JSON.parse(savedActiveData);
    //     const completedData = savedCompleteData === null ? starterCompletedData : JSON.parse(savedCompleteData);
    //     this.#sortIntoLists(activeData)
    //     this.#sortIntoLists(completedData)
    //     if (savedActiveData === null) this.#saveActiveTodos();
    //     if (savedCompleteData === null) this.#saveCompletedTodos();
    // }
}

export default TodoService;
