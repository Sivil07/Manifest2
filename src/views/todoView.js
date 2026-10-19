class TodoView {
    constructor(parentContainer) {
        this.parentContainer = parentContainer;
    }

    displayTodos(todos) {
        this.parentContainer.innerHTML = "";

        for (const todo of todos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = todo;
            this.parentContainer.appendChild(todoItem);
        }
    } 
}

export default TodoView;
