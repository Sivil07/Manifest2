import Todo from "../models/todo.js";

class TodoService {
    #todos = [];

    get allTodos() {
        return [...this.#todos];
    }
      
    createTodo(todoData) {
        const todo = new Todo(todoData);
        this.#todos.push(todo); 
        this.saveTodos();
        return todo;
    }

    saveTodos() {
        localStorage.setItem("todo", JSON.stringify(this.#todos));
    }
}

export default TodoService;
