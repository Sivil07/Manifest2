class TodoView {
    constructor(todoActiveList, todoDialog, todoAction) {
        this.todoActiveList = todoActiveList;
        this.todoDialog = todoDialog;
        this.todoAction = todoAction;
    }

    displayTodoForm( todoData = {} ) {
        const todoForm = document.createElement("todo-form");
        todoForm.formData = todoData;
        this.todoDialog.appendChild(todoForm);
        this.todoDialog.showModal();
    }

    closeTodoDialog(todoDialog) {
        todoDialog.close();
        this.todoDialog.innerHTML = "";
    }

    displayTodos(todos) {
        this.todoActiveList.innerHTML = "";

        for (const todo of todos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = todo;
            this.todoActiveList.appendChild(todoItem);
        }
    }
    
    displayOneTodo(todo) {
        const todoTemplate = document.createElement("todo-template");
        todoTemplate.id = "template";
        todoTemplate.templateData = todo;
        this.todoActiveList.appendChild(todoTemplate);
    }
}

export default TodoView;
