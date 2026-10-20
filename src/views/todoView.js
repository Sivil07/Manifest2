class TodoView {
    constructor(todoList, todoDialog, todoAction) {
        this.todoList = todoList;
        this.todoDialog = todoDialog;
        this.todoAction = todoAction;
    }

    displayTodos(todos) {
        this.todoList.innerHTML = "";

        for (const todo of todos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = todo;
            this.todoList.appendChild(todoItem);
        }
    } 
}

export default TodoView;
